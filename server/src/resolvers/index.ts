import { QueryResolver } from "./query.js"
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
  }
}