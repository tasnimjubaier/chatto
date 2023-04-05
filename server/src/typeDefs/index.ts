

export default `#graphql

  type Query {
    users: [User!]
    messages: [Message!]
    reactions: [Reaction!]
    login(username: String! password: String!) : User!
  }

  type Mutation {
    registerUser(username: String! password: String! confirmPassword: String!): User!
    sendMessage(content: String! from: String to: String): Message!
    addReaction(message: String! by: String!): Reaction!
  }

  type Subscription {
    sendMessage: Message!
  }

  type User {
    username: String!
    imageUrl: String 
    token: String
  }

  type Message {
    id: ID!
    text: String!
    createdAt: String!
    sender: User!
    thread: Thread!
  }

  type Reaction {
    content: String!
    from: User 
    createdAt: String
  }
`