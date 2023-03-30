import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    avatarUrl: String
  }

  type Chat {
    id: ID!
    name: String!
    users: [User!]!
    messages: [Message!]!
  }

  type Message {
    id: ID!
    sender: User!
    chat: Chat!
    content: String!
    createdAt: String!
  }

  type Query {
    me: User!
    chat(id: ID!): Chat!
    chats: [Chat!]!
  }

  type Mutation {
    sendMessage(chatId: ID!, content: String!): Message!
    createChat(name: String!, users: [ID!]!): Chat!
  }

  type Subscription {
    newMessage(chatId: ID!): Message!
  }

`

export default typeDefs;