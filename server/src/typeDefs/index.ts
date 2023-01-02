import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    users: [User!]!
    messages: [Message!]!
    threads: [Thread!]!
    thread(id: ID!): Thread
  }

  type User {
    id: ID!
    username: String!
    threads: [Thread!]
  }

  type Thread {
    id: ID!
    users: [User!]!
    messages: [Message!]!
  }

  type Message {
    id: ID!
    text: String!
    createdAt: String!
    sender: User!
    thread: Thread!
  }

  type Mutation {
    createUser(userId: ID!, username: String!) : User
    sendMessage(threadId: ID!, text: String!): Message
    createThread(name: String!): Thread
  }

  type Subscription {
    messageAdded: Message
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`

export default typeDefs;