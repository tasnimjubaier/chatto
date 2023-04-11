import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	chatHistory: {}
}

const slice = createSlice({
	name: 'chatHistory',
	initialState,
	reducers: {
		loadChats: (state, action) => {  // action : { user: "alex", messages: []}
			console.log({payload : action.payload})
			state.chatHistory[action.payload.user] = action.payload.messages
		},
    addMessage: (state, action) => { // action : { user: "alex", message: "hello"}
      if (!state.chatHistory[action.payload.user]) state.chatHistory[action.payload.user] = []
      state.chatHistory[action.payload.user].push(action.payload.message)
    }
	},
})

export const { loadChats, addMessage } = slice.actions
export default slice.reducer