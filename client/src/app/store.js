import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import usersReducer from '../features/users/usersSlice'
import chatHistoryReducer from '../features/chatHistory/chatHistorySlice'
import postsReducer from '../features/posts/postsSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		users: usersReducer,
		chatHistory: chatHistoryReducer,
		posts: postsReducer
	},
})