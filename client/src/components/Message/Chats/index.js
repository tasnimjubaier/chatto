import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyQuery } from '@apollo/client'

import { GET_MESSAGES, SEND_MESSAGE_SUBSCRIPTION } from '../../../utils/queries'
import { loadChats } from '../../../features/chatHistory/chatHistorySlice'
import styles from './index.module.css'

const Chats = ({selectedUser}) => {
	// const [chatHistory, setChatHistory] = useState([])
	
	const user = useSelector(state => state.user.user)

	const chatHistory = useSelector(state => state.chatHistory[selectedUser?.username])

	const [getMessages, {data, error, loading, subscribeToMore, }] = useLazyQuery(GET_MESSAGES)

	const dispatch = useDispatch()
	
	useEffect(() => {
		if (error) {
			return 
		}
		if (data) {
			dispatch(loadChats({ user : selectedUser.username, messages : data.messages}))
		}
	}, [data, error])

	useEffect(() => {
		if(selectedUser) {
			getMessages({variables : {
				from : selectedUser.username,
				to : user.username
			}})

			subscribeToMore({
				document: SEND_MESSAGE_SUBSCRIPTION,
				variables: { username: user.username },
				updateQuery: (prev, { subscriptionData }) => {
					if (!subscriptionData.data) 
						return prev 

					const newMessage = subscriptionData.data.sendMessage
					const updated = {
						...prev,
						messages: [ ...prev.messages, newMessage ]
					}

					return updated
				}
			})
		}
	}, [selectedUser])


	return (
		<div className={styles['chats']}>
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