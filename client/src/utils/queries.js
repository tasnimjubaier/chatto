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