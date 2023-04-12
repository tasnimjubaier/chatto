import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	messages: {},
	newMessages: {}
}

const slice = createSlice({
	name: 'chatHistory',
	initialState,
	reducers: {
		loadChats: (state, action) => {  // action : { user: "alex", messages: []}
			console.log({payload : action.payload})
			state.messages[action.payload.user] = action.payload.messages
		},
    addMessage: (state, action) => { // action : { user: "alex", message: "hello"}
      if (!state.messages[action.payload.user]) state.messages[action.payload.user] = []

			// state.messages = { ...state.messages, [state.messages[action.payload.user]]: [ ...state.messages[action.payload.user], action.payload.message ] }
			state.messages[action.payload.user].push(action.payload.message)
    },
		addNewMessage: (state, action) => { // action : { user: "alex", message: "hello"}
			if (!state.newMessages[action.payload.user]) state.newMessages[action.payload.user] = []
      console.log({newMessagepayload : action.payload})
			state.newMessages[action.payload.user].push(action.payload.message)
		},
		clearNewMessageHistory: (state, action) => { // action: { user: 'alex' }
			state.newMessages[action.payload.user] = []
		}
	},
})

export const { loadChats, addMessage, addNewMessage, clearNewMessageHistory } = slice.actions
export default slice.reducer