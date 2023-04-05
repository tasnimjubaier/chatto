
import { MongoClient, Db } from 'mongodb';
import { Request } from 'express';

const uri = 'mongodb://localhost:27017/chat-app';
const client = new MongoClient(uri, { useNewUrlParser: true as const });

async function connectDb(): Promise<Db> {
  try {
    await client.connect();
    const db = client.db();
    return db;
  } catch (err) {
    console.log(err);
    throw new Error('Unable to connect to database');
  }
}

async function authenticateUser(req: Request): Promise<string> {
  const token = req.headers.authorization?.split(' ')[1] || '';
  if (!token) {
    throw new AuthenticationError('Invalid authorization token');
  }
  // TODO: implement your own authentication logic here
  return 'user123';
}


const contextMiddleware: ContextFunction<{ req: Request }, Context> = async ({ req }) => {
  const db = await connectDb();
  const currentUser = await authenticateUser(req);
  return {
    db,
    currentUser,
  };
};

export default contextMiddleware;