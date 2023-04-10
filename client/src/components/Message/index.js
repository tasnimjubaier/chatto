import React from 'react'

import styles from './index.module.css'
import Topbar from './Topbar'
import Chats from './Chats'

const Message = ({user, selectedUser}) => {
	
	return (
		<div className={styles['interactions']}>
			<Topbar selectedUser={selectedUser} />
			<Chats selectedUser={selectedUser} />
			<div className={styles['msg-box']}>
					<input className={styles['input-box']} />
					<button className={styles['send-msg-button']}> Send </button>
			</div>
		</div>
	)
}

export default Message