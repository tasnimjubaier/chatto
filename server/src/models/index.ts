import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";


const user = new Schema({
	_id: {
		type: Schema.Types.ObjectId 
	},
	username: {
		type: String,
		required: true 
	},
	profileDescription: {
		type: String
	},
	imageUrl: {
		type: String
	},
	password: {
		type: String,
		required: true
	}
})

const post = new Schema({
	_id: {
		type: Schema.Types.ObjectId 
	},
	postedBy: {
		type: String,
		required: true 
	},
	postedAt: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true 
	},
	description: {
		type: String,
		required: true 
	}
})

const comment = new Schema({
	_id: {
		type: Schema.Types.ObjectId
	},
	postedBy: {
		type: String,
		required: true 
	},
	postedAt: {
		type: String, 
		required: true
	},
	parentId: {
		type: Schema.Types.ObjectId,
		required: true
	}
})

const reaction = new Schema({
	_id: {
		type: Schema.Types.ObjectId 
	},
	content: {
		type: String,
		required: true
	},
	from: {
		type: String, 
		required: true 
	},
	parentId: {
		type: Schema.Types.ObjectId,
		required: true
	}
})

const message = new Schema({
	_id: {
		type: Schema.Types.ObjectId 
	},
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
	},
	createdAt: {
		type: String, 
		required: true 
	}
})

const group = new Schema({
	_id: {
		type: Schema.Types.ObjectId 
	},
	description: {
		type: String 
	},
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: 'user'
		}
	]
})

export const User = model("User", user)
export const Message = model("Message", message)
export const Post = model("Post", post)
export const Reaction = model("Reaction", reaction)
export const Group = model("Group", group)
export const Comment = model("Comment", comment)
