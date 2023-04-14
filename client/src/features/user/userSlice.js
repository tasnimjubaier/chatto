import { createSlice } from "@reduxjs/toolkit";


// const userModel = {
// 	username,
// 	imageUrl, 
// 	description, 
// 	contacts: [
// 		{
// 			username,
// 			imageUrl,
// 			description,
// 			lastMessage: {
// 				...all 
// 			},
// 			messages: [
// 				...all 
// 			]
// 		}
// 	]
// }

const initialState = {
	user: null, 
	state: 'idle',
	error: null 
}

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => { //{ username, imageUrl, token, description }
			const { username, imageUrl, token, description } = action.payload
			localStorage.setItem('token', token)

			state.user = {
				...state.user,
				username: username,
				imageUrl: imageUrl,
				description: description,
				contacts: []
			}
		},
		setContacts: (state, action) => { // { contacts }
			let { contacts } = action.payload

			state.user.contacts = contacts.map( contact => ({
				...contact,
				messages: []
			}))
		},
		addContact: (state, action) => { // { username, imageUrl, description }
			const { username, imageUrl, description, messages } = action.payload

			state.user.contacts.push({
				username,
				imageUrl,
				description,
				messages: messages ? messages : []
			})
		},
		setMessages: (state, action) => { // { username, messages }
			const { username, messages } = action.payload

			state.user.contacts = state.user.contacts.map( user => {
				if (user.username !== username)
					return user 
				user.messages = messages
				return user 
			})
		},
		addMessage: (state, action) => { // { username, message }
			const { username, message } = action.payload

			state.user.contacts = state.user.contacts.map( user => {
				if (user.username !== username)
					return user
				if(!user.messages) user.messages = []
				user.messages.push(message)
				return user 
			})
		},
		setLastMessage: (state, action) => { // { username, lastMessage }
			const { username, lastMessage } = action.payload

			state.user.contacts = state.user.contacts.map( user => {
				if (user.username !== username)
					return user 
				user.lastMessage = lastMessage
				return user 
			})
		}
	}
})

export const { login } = slice.actions
export default slice.reducer