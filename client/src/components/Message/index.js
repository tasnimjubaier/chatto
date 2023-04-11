import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { SEND_MESSAGE } from '../../utils/queries'
import Topbar from './Topbar'
import Chats from './Chats'
import styles from './index.module.css'


const Message = ({user, selectedUser}) => {
	const [content, setContent] = useState("")
	
	const [sendMessage, {data, error, loading}] = useMutation(SEND_MESSAGE)

	const handleSendMessage = (message) => {
		sendMessage({variables: {
			content: message,
			from: user,
			to: selectedUser
		}})
	}

	const handleOnKeyDown = (e) => {
		e.preventDefault()
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