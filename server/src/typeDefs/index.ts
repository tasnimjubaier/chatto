

export default `#graphql
  type Query {
    user(username: String!) : User
    users: [User!]
    messages(from: String! to: String!): [Message!]
    login(username: String! password: String!) : User
    posts(username: String! index: Int! limit: Int!): [Post!]
  }

  type Mutation {
    registerUser(username: String! password: String! confirmPassword: String!): User!
    sendMessage(content: String! from: String! to: String!): Message!
    addReaction(message: String! by: String!): Reaction!
    createPost(postedBy: String! title: String! description: String!): Post!
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

  type Post {
    _id: String!
    postedBy: String!
    postedAt: String!
    title: String!
    description: String!
  }
`