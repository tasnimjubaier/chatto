

export default `#graphql
  type Query {
    user(username: String!) : User
    users: [User!]
    messages(from: String! to: String!): [Message!]
    login(username: String! password: String!) : User
  }

  type Mutation {
    registerUser(username: String! password: String! confirmPassword: String!): User!
    sendMessage(content: String! from: String! to: String!): Message!
    addReaction(message: String! by: String!): Reaction!
  }

  type Subscription {
    sendMessage(username: String!): Message!
  }

  type User {
    username: String!
    imageUrl: String 
    profileDescription: String
    token: String
    contacts: [User!]
    messages(otherUser: String!): [Message!]
    lastMessage(otherUser: String!): Message
  }

  type Message {
    content: String!
    from: String!
    to: String!
    createdAt: String
    seen: Boolean
    reactions: [Reaction!]
  }

  type Reaction {
    messageId: String!
    content: String!
    from: String!
  }
`