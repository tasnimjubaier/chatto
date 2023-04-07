import { Schema, model } from "mongoose";


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

export default model("Message", message)