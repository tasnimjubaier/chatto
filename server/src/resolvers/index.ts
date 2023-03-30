import { ObjectId } from 'mongodb';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const USER_COLLECTION_NAME = 'users';
const CHAT_COLLECTION_NAME = 'chats';
const MESSAGE_COLLECTION_NAME = 'messages';

const resolvers = {
  Query: {
    me: async (parent, args, { db, currentUser }) => {
      if (!currentUser) {
        throw new Error('Unauthorized');
      }
      const user = await db.collection(USER_COLLECTION_NAME).findOne({ _id: currentUser });
      return user;
    },
    chat: async (parent, { id }, { db }) => {
      const chat = await db.collection(CHAT_COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
      return chat;
    },
    chats: async (parent, args, { db, currentUser }) => {
      if (!currentUser) {
        throw new Error('Unauthorized');
      }
      const chats = await db.collection(CHAT_COLLECTION_NAME).find({ users: currentUser }).toArray();
      return chats;
    },
  },
  Mutation: {
    sendMessage: async (parent, { chatId, content }, { db, currentUser }) => {
      if (!currentUser) {
        throw new Error('Unauthorized');
      }
      const chat = await db.collection(CHAT_COLLECTION_NAME).findOne({ _id: new ObjectId(chatId) });
      if (!chat || !chat.users.includes(currentUser)) {
        throw new Error('Chat not found or unauthorized');
      }
      const message = {
        sender: currentUser,
        chat: chat._id,
        content,
        createdAt: new Date().toISOString(),
      };
      const result = await db.collection(MESSAGE_COLLECTION_NAME).insertOne(message);
      const newMessage = { ...message, id: result.insertedId };
      pubsub.publish(`NEW_MESSAGE_${chatId}`, { newMessage });
      return newMessage;
    },
    createChat: async (parent, { name, users }, { db, currentUser }) => {
      if (!currentUser) {
        throw new Error('Unauthorized');
      }
      if (!users.includes(currentUser)) {
        users.push(currentUser);
      }
      const chat = {
        name,
        users,
      };
      const result = await db.collection(CHAT_COLLECTION_NAME).insertOne(chat);
      const newChat = { ...chat, id: result.insertedId };
      return newChat;
    },
  },
  Subscription: {
    newMessage: {
      subscribe: async (parent, { chatId }, { db, currentUser }) => {
        if (!currentUser) {
          throw new Error('Unauthorized');
        }
        const chat = await db.collection(CHAT_COLLECTION_NAME).findOne({ _id: new ObjectId(chatId) });
        if (!chat || !chat.users.includes(currentUser)) {
          throw new Error('Chat not found or unauthorized');
        }
        return pubsub.asyncIterator(`NEW_MESSAGE_${chatId}`);
      },
    },
  },
  Chat: {
    users: async (parent, args, { db }) => {
      const userIds = parent.users.map((userId) => new ObjectId(userId));
      const users = await db.collection(USER_COLLECTION_NAME).find({ _id: { $in: userIds } }).toArray();
      return users;
    },
    messages: async (parent, args, { db }) => {
      const messages = await db.collection(MESSAGE_COLLECTION_NAME).find({ chat: parent._id }).toArray();
      return messages;
    },
  },
  Message: {
    sender: async (parent, args, { db }) => {
      const user = await db.collection(USER_COLLECTION_NAME).findOne({ _id: parent.sender });
      return user;
    },
    chat: async (parent, args, { db }) => {
      const chat = await db.collection(CHAT_COLLECTION_NAME).findOne({ _id: parent.chat });
      return chat;
    },
  },
  User: {
    chats: async (parent, args, { db }) => {
      const chats = await db.collection(CHAT_COLLECTION_NAME).find({ users: parent._id }).toArray();
      return chats;
    },
  },
};

export default resolvers;