import { createSlice } from "@reduxjs/toolkit";


const initialState = {}

const slice = createSlice({
	name: 'chatHistory',
	initialState,
	reducers: {
		loadChats: (state, action) => {  // action : { user: "alex", messages: []}
			console.log({payload : action.payload})
			state[action.payload.user] = action.payload.messages
		},
    addMessage: (state, action) => { // action : { user: "alex", message: "hello"}
      if (!state[action.payload.user]) state[action.payload.user] = []
      console.log({payload : action.payload})
			// state[action.payload.user] = [ ...state[action.payload.user], action.payload.message ]
			state[action.payload.user].push(action.payload.message)
    }
	},
})

export const { loadChats, addMessage } = slice.actions
export default slice.reducer