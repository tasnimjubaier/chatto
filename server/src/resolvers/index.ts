import { CommentResolver, MessageResolver, PostResolver, QueryResolver, UserResolver } from "./query.js"
import { MutationResolver, SubscriptionResolver } from "./mutation.js"


export default {
  Query: {
    ...QueryResolver
  },
  Mutation: {
    ...MutationResolver
  },
  Subscription: {
    ...SubscriptionResolver
  },
  User: {
    ...UserResolver
  },
  Message: {
    ...MessageResolver
  },
  Post: {
    ...PostResolver
  },
  Comment: {
    ...CommentResolver
  }
}

