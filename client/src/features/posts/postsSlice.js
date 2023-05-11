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
			state.posts.unshift(action.payload.post)
		},
		addComment: (state, action) => { // {content, parentId, postedBy, postedAt}
			state.posts = state.posts.map(post => {
				console.log({haga: post})
				if(post._id != action.payload.parentId) return post

				post.comments.push({
					content: action.payload.parentId,
					postedBy: action.payload.postedBy,
					postedAt: action.payload.postedAt
				})
				return post 
			})
		}
	},
})

export const { setPosts, addPost, addComment } = slice.actions
export default slice.reducer