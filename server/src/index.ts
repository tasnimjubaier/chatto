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
import _ from 'lodash'
import { Configuration, OpenAIApi } from "openai"
import jwt from 'jsonwebtoken'

import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/index.js';
import axios from 'axios';
import { GraphQLError } from 'graphql';
import { getCommentsLoader, getContactsLoader, getLastMessageLoader, getMessagesLoader, getPostsLoader, getReactionsLoader } from './utils/dataloaders.js';


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

const contactsLoader = getContactsLoader(db)
const messagesLoader = getMessagesLoader(db)
const lastMessageLoader = getLastMessageLoader(db)
const postsLoader = getPostsLoader(db)
const reactionsLoader = getReactionsLoader(db)
const commentsLoader = getCommentsLoader(db)


app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const loaders = { contactsLoader, messagesLoader, lastMessageLoader, postsLoader, reactionsLoader, commentsLoader }
      // let tk = req.headers.authorization
      // let tkn = tk.split(' ')
      // let token = tkn[1]
      // console.log(token)
      // // others: req.method, req.baseUrl req.params, req.query 
      // const operationName = req.body.operationName
      // const variables = req.body.variables

      // if(operationName !== "login" && operationName !== "signup") {
      //   let decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      //   console.log(decodedToken)
      //   let currentTime = Math.floor(Date.now() / 1000)
      //   let aDay = 24*60*60
      //   if(decodedToken.iat + aDay < currentTime) {
      //     console.log("token expired")
      //     throw new GraphQLError("token has expired", {
      //       extensions: {
      //         code: "Token Expired",
      //       }
      //     })
      //   }
      // }

      return { token: req.headers.authorization, db, loaders, openai, placesApiKey: process.env.GOOGLE_API_KEY }
    },
  }),
);

app.use("/verifyToken",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  async (req, res) => {
    const token = req.body.token
    console.log({token}) 
    
    try {
      let decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decodedToken)
      let currentTime = Math.floor(Date.now() / 1000)
      let aDay = 24*60*60
      if(decodedToken.iat + aDay < currentTime) {
        console.log("token expired")
        res.status(400)
        res.send("token expired")
      }
      else {
        res.send("token is valid")
      }
    } catch (error) {
      console.log(error)
      res.status(500)
      res.end("server error")
    }
})

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
