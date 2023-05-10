import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	posts: [], 
	state: 'idle',
	error: null 
}

const slice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
    setPosts: (state, action) => { // {posts}
			console.log('inside posts slice')
      console.log(action.payload.posts)
      state.posts = action.payload.posts 
    },
    addPost: (state, action) => { // {post}
			console.log({post : action.payload.post})
			state.posts.push(action.payload.post)
		}
	},
})

export const { setPosts, addPost } = slice.actions
export default slice.reducer