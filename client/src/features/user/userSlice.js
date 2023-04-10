import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
	user: null, 
	state: 'idle',
	error: null 
}

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			localStorage.setItem('token', action.payload.token)

			state.user = {
				username: action.payload.username,
				imageUrl: action.payload.imageUrl
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(addUser.fulfilled, (state, action) => {
				state.user = action.payload 
			})
			.addCase(addUser.rejected, (state, action) => {
				state.error = "error occured"
			})
			.addCase(findUser.fulfilled, (state, action) => {
				state.user = action.user 
			})
			.addCase(findUser.rejected, (state, action) => {
				state.error = "error occured"
			})
	}
})

export const addUser = createAsyncThunk('user/addUser', async (user) => {
	// todo: add graphql request

	// console.log(user)
	return user 
})

export const findUser = createAsyncThunk('user/findUser', async (username) => {
	// todo: add gql request
	return { username, token: '123' }
})

export const { login } = slice.actions
export default slice.reducer