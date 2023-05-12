import { PubSub, withFilter } from "graphql-subscriptions"
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
	createPost: async (_, {postedBy, title, description}, {db}) => {
		const Post = db.collection("posts")

		const post = {
			postedBy,
			postedAt: new Date().toISOString(),
			title, 
			description
		}

		const result = await Post.insertOne(post)
		return post
	},
	createCommentOrReply: async (_, {postedBy, content, parentId}, {db}) => {
		const Comment = db.collection("comments")

		const comment = {
			postedBy,
			postedAt: new Date().toISOString(),
			content, 
			parentId
		}

		const result = await Comment.insertOne(comment)
		return comment
	},
	addReaction: async (_, {createdBy, content, parentId}, {db}) => {
		const Reaction = db.collection("reactions")

		const reaction = {
			createdBy,
			createdAt: new Date().toISOString(),
			content,
			parentId
		}
		
		const result = await Reaction.insertOne(reaction)
		return reaction 
	},
	removeReaction: async (_, {createdBy, parentId}, {db}) => {
		const Reaction = db.collection("reactions")
		
		const reaction = await Reaction.findOne({$and: [{createdBy}, {parentId}]}) as any
		await Reaction.deleteOne({$and: [{createdBy}, {parentId}]})
		return reaction 
	}
}

export const SubscriptionResolver = {
	sendMessage: {
		subscribe: withFilter(
			() => pubsub.asyncIterator(['SEND_MESSAGE']),
			(payload, { username }) => {
				return payload.sendMessage.to === username
			}
		)
	}
}