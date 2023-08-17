import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyQuery } from '@apollo/client'

import { GET_MESSAGES, SEND_MESSAGE_SUBSCRIPTION } from '../../../../utils/queries'
import { clearNewMessageHistory, loadChats } from '../../../../features/chatHistory/chatHistorySlice'
import styles from './index.module.css'

const Chats = ({selectedUser}) => {
	const messageDivRef = useRef(null)
	
	const user = useSelector(state => state.user.user)
	const chatHistory = useSelector(state => state.chatHistory.messages[selectedUser?.username])
	const newMessageHistory = useSelector(state => state.chatHistory.newMessages[selectedUser?.username])

	const [getMessages, {data, error, loading, subscribeToMore, }] = useLazyQuery(GET_MESSAGES)

	const dispatch = useDispatch()
	
	useEffect(() => {
		const chats = messageDivRef.current
		chats.scrollTop = chats.scrollHeight
		
	}, [chatHistory])

	useEffect(() => {
		if (error) {
			return 
		}
		if (data) {
			dispatch(loadChats({ user : selectedUser.username, messages : data.messages}))
		}
	}, [data, dispatch, error, selectedUser])

	useEffect(() => {
		subscribeToMore({
			document: SEND_MESSAGE_SUBSCRIPTION,
			variables: { username: user.username },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) 
					return prev 

				const newMessage = subscriptionData.data.sendMessage
				// const updated = {
				// 	...prev,
				// 	messages: newMessageHistory ? [ ...prev.messages, ...newMessageHistory, newMessage ] : [ ...prev.messages, newMessage ]
				// }
				const updated = {
					...prev,
					messages: [ ...prev.messages, newMessage ]
				}
				// clearNewMessageHistory({ user: selectedUser.username })
				return updated
			}
		})
	}, [])

	useEffect(() => {
		if(selectedUser) {
			getMessages({variables : {
				from : selectedUser.username,
				to : user.username
			}})
		}
	}, [getMessages, selectedUser, user])


	return (
		<div className={styles['chats']} ref={messageDivRef}>
			{selectedUser && chatHistory &&
				chatHistory.map((message, key) => {
					return (
						<div key={key} className={`${styles[`chat`]} ${message.from === user.username ? styles['current'] : styles['sender']}`}>
							{message.content}
							{/* <small>{message.createdAt}</small> */}
						</div>
					)
				})
			}
			<div className={styles['error']}>{error?.message}</div>
			<div className={styles['loading']}>{loading && "Loading Conversation..."}</div>
		</div>
	)
}

export default Chats