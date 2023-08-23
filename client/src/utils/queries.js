import { gql } from "@apollo/client"


export const GET_USER = gql`
	query getUser($username: String!) {
		user(username: $username) {
			username token
		}
	}
`
export const SIGN_UP  = gql`
	mutation signup($username: String!, $password: String!, $confirmPassword: String!) {
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
	query getPosts($username: String!, $index: Int!, $limit: Int!) {
		posts(username: $username, index: $index, limit: $limit) {
			_id
			postedBy
			postedAt
			title
			description
			reactions {
				content
				createdBy
			}
			comments {
				content
				_id
				postedAt
				postedBy
				reactions {
					content
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

export const OPENAI_CHAT = gql`
	query openaiChat($message: String!) {
		openaiChat(message: $message)
	}
`

export const CREATE_POST = gql`
	mutation createPost($postedBy: String!, $title: String!, $description: String!) {
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
	mutation createCommentOrReply($postedBy: String!, $content: String!, $parentId: String!) {
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
	mutation addReaction($createdBy: String!, $content: String!, $parentId: String!) {
		addReaction(createdBy: $createdBy, content: $content, parentId: $parentId) {
			_id
			createdBy
			createdAt
			content
			parentId
		}
	}
`

export const REMOVE_REACTION = gql`
	mutation removeReaction($createdBy: String!, $parentId: String!) {
		removeReaction(createdBy: $createdBy, parentId: $parentId) {
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

export const GET_PLACES_QUERY = gql`
	query getPlacesQuery($location: String!, $radius: String!, $keyword: String, $type: String!) {
		getNearbyPlaces(location: $location, radius: $radius, keyword: $keyword, type: $type)
	}
`

export const GET_PLACE_DETAILS_QUERY = gql`
	query getPlaceDetailsQuery($placeIds: [String!]!, $fields: [String!]!) {
		getPlaceDetail(placeIds: $placeIds, fields: $fields)
	}
`

export const VERIFY_USER = gql`
	query verifyUser($token: String!) {
		verifyUser(token: $token) {
			username
			imageUrl
			token
		}
	}
`
