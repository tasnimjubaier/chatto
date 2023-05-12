import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	users: null, 
	state: 'idle',
	error: null 
}

const slice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		saveUsers: (state, action) => {
			state.users = action.payload 
		}
	},
})

export const { saveUsers } = slice.actions
export default slice.reducer