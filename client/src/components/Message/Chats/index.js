import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyQuery } from '@apollo/client'

import { GET_MESSAGES } from '../../../utils/queries'
import styles from './index.module.css'
import { loadChats } from '../../../features/chatHistory/chatHistorySlice'

const Chats = ({selectedUser}) => {
	
	const chatHistory = useSelector(state => state.chatHistory.chatHistory)
	const user = useSelector(state => state.user.user)

	const [getMessages, {data, error, loading}] = useLazyQuery(GET_MESSAGES)

	const dispatch = useDispatch()
	
	useEffect(() => {
		if (error) {
			return 
		}
		if (data) {
			dispatch(loadChats({ user : selectedUser, messages : data.messages}))
		}
	}, [data, error])

	useEffect(() => {
		if(selectedUser) {
			getMessages({variables : {
				from : selectedUser.username,
				to : user.username
			}})
		}
	}, [selectedUser])


	return (
		<div className={styles['chats']}>
					{/* <div className={`${styles['chat']} ${styles['sender']}`}> hi</div>
					<div className={`${styles['chat']} ${styles['current']}`}> ing SystemeBox.</div>
					<div className={`${styles['chat']} ${styles['sender']}`}> ing System.ThreadinageBox.</div> */}
					{selectedUser && chatHistory[selectedUser] &&
						chatHistory[selectedUser].map((message, key) => {
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