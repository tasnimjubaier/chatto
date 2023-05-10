import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	posts: null, 
	state: 'idle',
	error: null 
}

const slice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
    setPosts: (state, action) => { // {posts}

      console.log(action.payload)
      state.posts = action.payload.posts 
    },
    addPost: (state, action) => { // {post}
			console.log({post : action.payload})
			state.posts.push(action.payload.post)
		}
	},
})

export const { setPosts, addPost } = slice.actions
export default slice.reducer