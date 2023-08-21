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
import jwt from 'jsonwebtoken'

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


export const postsLoader = new DataLoader(async ( keys : [key : { index: any, limit: any}] ) => {
  const Post = db.collection("posts")

  console.log('Posts Resolver')

  const messages = await Post.find().sort({postedAt: -1}).toArray()

  let result = []

  result = keys.map((key, _) => {
    let {index, limit} = key 
    let slice = messages.slice( index - 1, index + limit - 1)
    return slice
  })

  return result
})

export const reactionsLoader = new DataLoader(async ( keys : [ id : any] ) => {
  const Reaction = db.collection("reactions")

  console.log('Reactions Resolver')

  const reactions  = await Reaction.find({parentId : { $in : keys }}).toArray()
  // console.log({reactions})

  let result = []

  result = keys.map((key, _) => {
    
    let slice = reactions.filter(reaction => reaction.parentId == key)
    return slice
  })

  return result
})

export const commentsLoader = new DataLoader(async ( keys : [ id : any] ) => {
  const Comment = db.collection("comments")

  console.log('Comments Resolver')
  const comments  = await Comment.find({parentId : { $in : keys }}).toArray()

  let result = []

  result = keys.map((key, _) => {
    
    let slice = comments.filter(comment => comment.parentId == key)
    return slice
  })

  return result
})



app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const loaders = { contactsLoader, messagesLoader, lastMessageLoader, postsLoader, reactionsLoader }
      // let tk = req.headers.authorization.split(" ")
      // let token = tk[1]
      // console.log(token)
      // others: req.method, req.baseUrl req.params, req.query 
      const operationName = req.body.operationName
      const variables = req.body.variables
      //TODO: do something with the token

      // if(operationName !== "login" && operationName !== 'signup') {

      //   console.log(operationName)
      //   console.log(token)
      //   let decoded = jwt.verify(token, process.env.JWT_SECRET)
      //   console.log(decoded)
      // }

      return { token: req.headers.authorization, db, loaders, openai, placesApiKey: process.env.GOOGLE_API_KEY }
    },
  }),
);



const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
