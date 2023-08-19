import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http, { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from 'dotenv';
import DataLoader from "dataloader"
import _ from 'lodash'
import { Configuration, OpenAIApi } from "openai"

import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/index.js';
import axios from 'axios';


dotenv.config();



const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const uri = process.env.MONGODB_CONNECTION_URI;
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = http.createServer(app);

const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
  }
);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer(
  {
    schema,
  },
  wsServer,
);

const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();


async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    return client.db(process.env.DB_NAME)
  } catch(err) {
    console.log("Error while connecting to db", err)
  }
}

const db = await connectToDatabase()


export const contactsLoader = new DataLoader(async ( users ) => {
  const Message = db.collection('messages')

  console.log('contacts is calling messages collection from User Resolver')

  const messages = await Message.find({ $or: [{ from : { $in : users }}, { to : { $in : users }}]})
                          .sort({ createdAt : 1 }).toArray()

  const filtered = messages.map( message => ({
    from: message.from,
    to: message.to
  }))

  let mapping = {}
  filtered.forEach( message => {
    const { from, to } = message 
    if ( mapping[from] == null ) mapping[from] = []
    mapping[from].push(to)
    if ( mapping[to] == null ) mapping[to] = []
    mapping[to].push(from)
  })

  const keys = Object.keys(mapping)

  keys.forEach( key => {
    let arr = mapping[key]
    arr = _.uniq(arr)
    arr = arr.map( (itm: any) => ({ username: itm }))
    mapping[key] = arr 
  })

  const result = users.map( (user : string) => mapping[user] )
  return result
})

export const messagesLoader = new DataLoader(async ( keys : [key : {user : any , otherUser : any}] ) => { // [ { user, otherUser} ] 
  const Message = db.collection('messages')
	const lista = keys.map(({ user: from, otherUser: to }) => {
		return { from, to }
	})
	const listb = keys.map(({ user: from, otherUser: to }) => {
		return { from : to, to : from }
	})
	const merged = [ ...lista, ...listb ]

  console.log('messages is calling messages collection from User Resolver')

  const messages = await Message.find( {
    $or: merged
  }).sort({ createdAt: 1}).toArray()

  const grouped = _.groupBy(messages, (message) => {
    let str : string
    if (message.from < message.to)
      str = `${message.to}:${message.from}`
    else 
      str = `${message.from}:${message.to}`
    return str
  })

  const result = keys.map(({ user: from, otherUser: to }) => {
    let str : string
    if (from < to)
      str = `${to}:${from}`
    else 
      str = `${from}:${to}`
    
    return grouped[str]
  })
	return result
})

export const lastMessageLoader = new DataLoader(async (keys) => { // [ { user, otherUser} ] 
  const Message = db.collection('messages')
  const lista = keys.map(({ user: from, otherUser: to }) => {
		return { from, to }
	})
	const listb = keys.map(({ user: from, otherUser: to }) => {
		return { from : to, to : from }
	})
	const merged = [ ...lista, ...listb ]

  console.log('lastMessage is calling messages collection from User Resolver')
  
  const messages = await Message.find( {
    $or: merged
  }).sort({ createdAt: -1}).toArray()

  const grouped = _.groupBy(messages, (message) => {
    let str : string
    if (message.from > message.to)
      str = `${message.to}:${message.from}`
    else 
      str = `${message.from}:${message.to}`
    return str
  })

  const result = keys.map(({ user: from, otherUser: to }) => {
    let str : string
    if (from > to)
      str = `${to}:${from}`
    else 
      str = `${from}:${to}`
    
    return grouped[str] ? ( grouped[str].length !== 0 ? grouped[str][0] : null ) : null
  })
	return result 
})

app.use("/holdit", (req, res) => {
  console.log({req})
  console.log({res})
  res.end("hold it.")
})

app.use("/openai/models/:model", async (req, res) => {
  try {
    const response = await openai.retrieveModel(req.params.model);
    console.log(response.data)
    res.send(response.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.use("/openai/models", async (req, res) => {
  try {
    const response = await openai.listModels();
    const models = response.data.data.map(d =>  d.id)
    console.log(models)
    res.send(models)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.use("/openai/completion/:text", async (req, res) => {
  try {
    console.log(req.params.text)
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.params.text,
      max_tokens: 1000,
      temperature: 0,
    })
    console.log(response.data)
    res.send(response.data.choices[0].text)
  } catch (err) {
    console.log(err.response.data)
    res.status(500).send(err.response.data)
  }
})

app.use("/openai/completion/test", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      max_tokens: 7,
      temperature: 0,
    })
    console.log(response.data)
    res.send(response.data.choices[0].text)
  } catch (err) {
    console.log(err.response.data)
    res.status(500).send(err.response.data)
  }
})

app.use("/openai/chat/", async (req, res) => {
  try {
    console.log(req.query.message)
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: req.query.message as string}],
    });
    console.log(response.data.choices[0].message.content)
    res.send(response.data.choices[0].message.content)
  } catch (err) {
    console.log(err.response.data)
    res.status(500).send(err.response.data)
  }
})

app.use("/openai/chat/test", async (req, res) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: "Hello world"}],
    });
    console.log(response.data.choices[0].message.content)
    res.send(response.data.choices[0].message.content)
  } catch (err) {
    console.log(err.response.data)
    res.status(500).send(err.response.data)
  }
})


app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const loaders = { contactsLoader, messagesLoader, lastMessageLoader }
      return { token: req.headers.authorization, db, loaders, openai, placesApiKey: process.env.GOOGLE_API_KEY }
    },
  }),
);

app.use('/places', async (req, res) => {
  let url = `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_phone_number&place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&key=${process.env.GOOGLE_API_KEY}`
		
		try {
      console.log(url)
			let result = await axios.get(url)
			console.log(result.data)
			res.send(result.data)
		} catch(err) {
			console.log(err)
      console.log("error")
			res.send("")
		}
})


const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
