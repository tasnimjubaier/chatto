import { Schema, model } from "mongoose";


const user = new Schema({
	username: {
		type: String,
		required: true 
	},
	imageUrl: {
		type: String
	},
	token: {
		type: String
	}
})

const message = new Schema({
	content: {
		type: String,
		required: true
	},
	from: {
		type: String, 
		required: true 
	},
	to: {
		type: String, 
		required: true 
	}
})

const reaction = new Schema({
	content: {
		type: String,
		required: true
	},
	from: {
		type: String, 
		required: true 
	}
})

export const User = model("User", user)
export const Message = model("Message", message)
export const Reaction = model("Reaction", reaction)

// export default { User, Message, Reaction }