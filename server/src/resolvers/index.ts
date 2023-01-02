// import messageResolver from './message'
// import userResolver from './user'

const resolvers = {
  Query: {
    // messages: () => db.fetchMessages(),
    // users: () => db.fetchUsers(),
    // channels: () => db.fetchChannels(),
    // channel: (obj, args, context, info) => db.fetchChannelById(args.id),
  },
  Mutation: {
    sendMessage: (obj, args, context, info) => {
      // const message = db.addMessage(args.channelId, args.text, context.user);
      // pubsub.publish('MESSAGE_ADDED', { messageAdded: message });
      // return message;
      return ""
    },
    // createChannel: (obj, args, context, info) => db.createChannel(args.name),
  },
  Subscription: {
    messageAdded: {
      // subscribe: () => pubsub.asyncIterator('MESSAGE_ADDED'),
    },
  },
  Message: {
    // sender: (obj, args, context, info) => db.fetchUserById(obj.senderId),
    // channel: (obj, args, context, info) => db.fetchChannelById(obj.channelId),
  },
  Thread: {
    // messages: (obj, args, context, info) => db.fetchMessagesForChannel(obj.id),
  },
};


export default resolvers 