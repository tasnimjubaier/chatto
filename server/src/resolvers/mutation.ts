import { PubSub } from "graphql-subscriptions"
import { GraphQLError } from "graphql"
import bcrypt from 'bcrypt'

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

		// encrypt password
		const encrypted = await bcrypt.hash(password, 10)

		const user = {
			username,
			imageUrl: "url",
			password: encrypted
		}

		const result = await userCollection.insertOne(user)

		return user
	},
	sendMessage: async (_, {content, from, to}, {db}) => {
		const messageCollection = db.collection("messages")

		const message = {
			content,
			from,
			to
		}

		const result = await messageCollection.insertOne(message)

		pubsub.publish("SEND_MESSAGE", { sendMessage : message })

		return message
	},
	addReaction: async (_, {message, by}, {db}) => {
		const reactionCollection = db.collection("reactions")

		const reaction = {
			content: message,
			from : by 
		}
		
		const result = await reactionCollection.insertOne(reaction)

		return reaction 
	}
}

export const SubscriptionResolver = {
	sendMessage: {
		subscribe: () => pubsub.asyncIterator(['SEND_MESSAGE'])
	}
}