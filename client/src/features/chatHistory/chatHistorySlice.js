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
		}
	},
})

export const { loadChats } = slice.actions
export default slice.reducer