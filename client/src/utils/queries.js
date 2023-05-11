import { gql } from "@apollo/client"


export const GET_USER = gql`
	query getUser($username: String!) {
		user(username: $username) {
			username token
		}
	}
`
export const SIGN_UP  = gql`
	mutation signUp($username: String!, $password: String!, $confirmPassword: String!) {
		registerUser(username: $username, password: $password, confirmPassword: $confirmPassword) {
			username token imageUrl
		}
	}
`
export const LOG_IN = gql`
	query login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			username token imageUrl
		}
	}
`
export const GET_USERS = gql`
	query getUsers {
		users {
			username token imageUrl
		}
	}
`

export const GET_MESSAGES = gql`
	query getMessages($from: String!, $to: String!) {
		messages(from: $from, to: $to) {
			content createdAt from  to
		}
	}
`
export const SEND_MESSAGE = gql`
	mutation sendMessage($content: String!, $from: String!, $to: String!){
		sendMessage(content: $content, from: $from, to: $to) {
			content from to createdAt
		}
	}
`

export const GET_POSTS = gql`
	query Query($username: String!, $index: Int!, $limit: Int!) {
		posts(username: $username, index: $index, limit: $limit) {
			_id
			postedBy
			postedAt
			title
			description
			reactions {
				username
			}
			comments {
				content
				_id
				postedAt
				postedBy
				reactions {
					username
				}
				replies {
					content
					postedBy
					postedAt
				}
			}
		}
	}
`
export const CREATE_POST = gql`
	mutation Mutation($postedBy: String!, $title: String!, $description: String!) {
		createPost(postedBy: $postedBy, title: $title, description: $description) {
			_id
			postedBy
			postedAt
			title
			description
		}
	}
`

export const CREATE_COMMENT_OR_REPLY = gql`
	mutation Mutation($postedBy: String!, $content: String!, $parentId: String!) {
		createCommentOrReply(postedBy: $postedBy, content: $content, parentId: $parentId) {
			_id
			postedBy
			postedAt
			content
			parentId
		}
	}
`

export const ADD_REACTION = gql`
	mutation Mutation($createdBy: String!, $content: String!, $parentId: String!) {
		addReaction(createdBy: $createdBy, content: $content, parentId: $parentId) {
			_id
			createdBy
			createdAt
			content
			parentId
		}
	}
`

export const SEND_MESSAGE_SUBSCRIPTION = gql`
	subscription subscribeToNewMessage($username: String!){
		sendMessage(username: $username) {
			content  createdAt from to
		}
	}
`
