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

export default model("User", user)
