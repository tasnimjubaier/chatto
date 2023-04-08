import { PubSub } from "graphql-subscriptions"
import { GraphQLError } from "graphql"

const pubsub = new PubSub()

interface User {
	username: String,
	imageUrl: String,
	token: String
}
interface Message {
	content: String,
	from: String, 
	to: String, 
}
interface Reaction {
	content: String, 
	from: String
}

export const MutationResolver = {
	registerUser: async (_, {username, password, confirmPassword}, {db}) => {
		const userCollection = db.collection('users')
		
		if (password !== confirmPassword) {
			throw new GraphQLError("Passwords don't match", {
				extensions: {
					code: "BAD_USER_INPUT",
					username
				}
			})
		}

		const user = {
			// id: null,
			username,
			imageUrl: "url",
			token: password
		}

		const result = await userCollection.insertOne(user)
		// user.id = result.insertedId
		console.log(user)

		return user
	},
	sendMessage: async (_, {content, from, to}, {db}) => {
		const messageCollection = db.collection("messages")

		const message = {
			// id: null,
			content,
			from,
			to
		}

		const result = await messageCollection.insertOne(message)
		// message.id = result.insertedId

		pubsub.publish("SEND_MESSAGE", { sendMessage : message })

		return message
	},
	addReaction: async (_, {message, by}, {db}) => {
		const reactionCollection = db.collection("reactions")

		const reaction = {
			// id: null, 
			content: message,
			from : by 
		}
		
		const result = await reactionCollection.insertOne(reaction)
		// reaction.id = result.insertedId

		return reaction 
	}
}

export const SubscriptionResolver = {
	sendMessage: {
		subscribe: () => pubsub.asyncIterator(['SEND_MESSAGE'])
	}
}