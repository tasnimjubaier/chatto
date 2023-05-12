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
      state.posts = action.payload.posts 
    },
    addPost: (state, action) => { // {post}
			state.posts.unshift(action.payload.post)
		},
		addComment: (state, action) => { // {content, parentId, postedBy, postedAt}
			state.posts = state.posts.map(post => {
				if(post._id != action.payload.parentId) return post

				post.comments.push({
					content: action.payload.content,
					postedBy: action.payload.postedBy,
					postedAt: action.payload.postedAt
				})
				return post 
			})
		},
		addReaction: (state, action) => { // {content, parentId, createdBy, createdAt}
			state.posts = state.posts.map(post => {
				console.log({haga: post})
				if(post._id != action.payload.parentId) return post

				post.reactions.push({
					content: action.payload.content,
					createdBy: action.payload.createdBy,
					createdAt: action.payload.createdAt
				})
				return post 
			})
		},
		removeReaction: (state, action) => { // {parentId, createdBy}
			state.posts = state.posts.map(post => {
				if(post._id != action.payload.parentId) return post

				post.reactions = post.reactions.filter(reaction => reaction.createdBy !== action.payload.createdBy)
				return post 
			})
		}
	},
})

export const { setPosts, addPost, addComment, addReaction, removeReaction } = slice.actions
export default slice.reducer