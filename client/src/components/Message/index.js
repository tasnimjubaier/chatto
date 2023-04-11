import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { SEND_MESSAGE } from '../../utils/queries'
import Topbar from './Topbar'
import Chats from './Chats'
import styles from './index.module.css'
import { useDispatch } from 'react-redux'
import { addMessage } from '../../features/chatHistory/chatHistorySlice'


const Message = ({user, selectedUser}) => {
	const [content, setContent] = useState("")
	
	const [sendMessage, {data, error, loading}] = useMutation(SEND_MESSAGE)

	const dispatch = useDispatch()


	useEffect(() => {
		if (error) {

		}
		if (data) {
			dispatch(addMessage({ user: selectedUser.username, message: data.content }))
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