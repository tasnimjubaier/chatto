import { GraphQLError } from "graphql"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const QueryResolver = {
	users: async (_, __, {db}) => {
		const User = db.collection("users")
		
		const cursor = await User.find({}) as any 

		const users = await cursor.toArray()

		return users;
	},
	user: async (_, {username}, {db}) => {
		const User = db.collection("users")

		const cursor = await User.findOne({username}) as any

		const user = cursor
		return user 
	},
	messages: async (_, __, {db}) => {
		const Message = db.collection("messages")

		const cursor = await Message.find({}) as any

		const messages = cursor.toArray()

		return messages
	},
	reactions: async (_, __, {db}) => {
		const Reaction = db.collection('reactions')

		const cursor = await Reaction.find({}) as any

		const reactions = cursor.toArray()

		return reactions
	},
	login: async (_, {username, password}, {db}) => {
			const User = db.collection('users')
			const cursor = await User.findOne({username}) as any

			// compare passwords
			const match = await bcrypt.compare(password, cursor.password)

			if (!match) {
				throw new GraphQLError("Incorrect Password", {
					extensions: {
						code: "BAD_USER_INPUT",
						username
					}
				})
			}

			// generate token
			const token =  jwt.sign({username}, process.env.JWT_SECRET)

			const user = {
				username: cursor.username,
				imageUri: "uri",
				token 
			}
			return user
	}
}


