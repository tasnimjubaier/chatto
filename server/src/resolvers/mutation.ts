import { PubSub } from "graphql-subscriptions"

const pubsub = new PubSub()

export const MutationResolver = {
	registerUser: (_, {username, password, confirmPassword}) => {
		return {
			username
		}
	},
	sendMessage: (_, {content, from, to}) => {
		pubsub.publish("SEND_MESSAGE", { sendMessage : {content, from, to, createdAt: "10"} })

		return {
			content, from, to
		}
	},
	addReaction: (_, {message, by}) => {
		return {
			content: "love"
		}
	}
}

export const SubscriptionResolver = {
	sendMessage: {
		subscribe: () => pubsub.asyncIterator(['SEND_MESSAGE'])
	}
}