import { Schema, model } from "mongoose";

import User from './user'
import Message from './message'


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

const Reaction = model("Reaction", reaction)

export default { User, Message, Reaction }