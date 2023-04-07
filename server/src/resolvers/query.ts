import models from "../models"
const {User, Message, Reaction} = models


export const QueryResolver = {
	users: async () => {
		
		const cursor = await User.find({}) as any 

		const users = await cursor.toArray()

		return users;

		// return [{
		// 	username: "John"
		// },
		// {
		// 	username: "Jane"
		// }]
	},
	messages: async () => {
		const cursor = await Message.find({}) as any

		const messages = cursor.toArray()

		return messages
		// return [{
		// 	content: "Hi Jane",
		// 	from: "John",
		// 	to: "Jane",
		// }]
	},
	reactions: async () => {
		const cursor = await Reaction.find({}) as any

		const reactions = cursor.toArray()

		return reactions
		// return [{
		// 	content: "love"
		// }]
	},
	login: (_, {username, password}) => {
			return {username}
	}
}


