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

		return cursor 
	},
	messages: async (_, {from, to}, {db}) => {
		const Message = db.collection("messages")

		const cursor = await Message.find({
			$or: [{from, to}, {from : to, to : from}]
		}).sort({createdAt: 1}) as any

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

			if(!cursor) {
				throw new GraphQLError("User Not Found", {
					extensions: {
						code: "BAD_USER_INPUT",
						username
					}
				})
			}

			const match = await bcrypt.compare(password, cursor.password)
			if (!match) {
				throw new GraphQLError("Incorrect Password", {
					extensions: {
						code: "BAD_USER_INPUT",
						username
					}
				})
			}

			const token =  jwt.sign({username}, process.env.JWT_SECRET)

			const user = {
				...cursor,
				token 
			}
			return user
	}
}


export const UserResolver = {
	token: (parent, payload, context) => {
		const token =  jwt.sign({username: parent.username}, process.env.JWT_SECRET)

		return token 
	}
}

export const MessageResolver = {
	
}

