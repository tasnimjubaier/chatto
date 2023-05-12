import React, { useEffect, useState } from 'react'
import { gql, useApolloClient, useMutation } from '@apollo/client'

import { SEND_MESSAGE } from '../../utils/queries'
import Topbar from './Topbar'
import Chats from './Chats'
import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, addNewMessage } from '../../features/chatHistory/chatHistorySlice'


const Message = ({user, selectedUser}) => {
	const [content, setContent] = useState("")
	
	const [sendMessage, { data, error }] = useMutation(SEND_MESSAGE)
	const newMessageHistory = useSelector(state => state.chatHistory.newMessages[selectedUser?.username])
	const messageHistory = useSelector(state => state.chatHistory.messages[selectedUser?.username])

	const dispatch = useDispatch()
	const client = useApolloClient()

	useEffect(() => {

	}, [messageHistory, newMessageHistory])
	useEffect(() => {
		if (error) {

		}
		if (data) {
			dispatch(addMessage({ user: selectedUser.username, message: data.sendMessage }))
			dispatch(addNewMessage({ user: selectedUser.username, message: data.sendMessage }))

			// todo: data isn't being cached. do something with the data to store it in cache 
			client.writeFragment({
				id: "newMessages",
				fragment: gql`
					fragment NewMessage on Message {
						content 
						from 
						to 
						createdAt
						__typename
					}
				`,
				data: {
					...data.sendMessage
				}
			})
		}
	}, [data, error])

	const handleSendMessage = (message) => {
		sendMessage({variables: {
			content: message,
			from: user.username,
			to: selectedUser.username
		}})

		setContent("")
	}

	const handleOnKeyDown = (e) => {
		if (e.key === 'Enter') {
      handleSendMessage(content)
    }
	}
	const handleOnClick = (e) => {
		e.preventDefault()
		handleSendMessage(content)
	}

	return (
		<div className={styles['interactions']}>
			<Topbar selectedUser={selectedUser} />
			<Chats selectedUser={selectedUser} />
			<div className={styles['msg-box']}>
					<input className={styles['input-box']} 
						onChange={e => setContent(e.target.value)} value={content} onKeyDown={handleOnKeyDown}/>
					<button className={styles['send-msg-button']} onClick={handleOnClick}> Send </button>
			</div>
		</div>
	)
}

export default Message