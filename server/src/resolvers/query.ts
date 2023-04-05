

export const QueryResolver = {
	users: () => {
		return [{
			username: "John"
		},
		{
			username: "Jane"
		}]
	},
	messages: () => {
		return [{
			content: "Hi Jane",
			from: "John",
			to: "Jane",
		}]
	},
	reactions: () => {
		return [{
			content: "love"
		}]
	},
	login: (_, {username, password}) => {
			return {username}
	}
}


