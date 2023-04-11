import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import usersReducer from '../features/users/usersSlice'
import chatHistoryReducer from '../features/chatHistory/chatHistorySlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		users: usersReducer,
		chatHistory: chatHistoryReducer
	},
})