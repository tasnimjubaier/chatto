import { PubSub } from "graphql-subscriptions"
import { GraphQLError } from "graphql"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const pubsub = new PubSub()


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

		let user = {
			username,
			imageUrl: "newUrl",
			profileDescription: "profile description",
			password: encrypted
		}

		const result = await userCollection.insertOne(user)

		const token = jwt.sign({username}, process.env.JWT_SECRET)

		user = { ...user, token } as any

		return user
	},
	sendMessage: async (_, {content, from, to}, {db}) => {
		const messageCollection = db.collection("messages")

		const message = {
			content,
			from,
			to,
			createdAt: new Date().toISOString()
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