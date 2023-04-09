

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
	login: (_, {username, password}, {db}) => {
			const User = db.collection('users')
			const cursor = User.findOne({username}) as any
			const user = cursor
			return user
	}
}


