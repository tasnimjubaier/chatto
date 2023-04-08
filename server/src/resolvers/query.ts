

export const QueryResolver = {
	users: async (_, __, {db}) => {
		const User = db.collection("users")
		
		const cursor = await User.find({}) as any 

		const users = await cursor.toArray()

		return users;
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
	login: (_, {username, password}) => {
			return {username}
	}
}


