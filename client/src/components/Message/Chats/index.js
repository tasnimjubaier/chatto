import React from 'react'

import styles from './index.module.css'

const Chats = ({selectedUser}) => {
	
	return (
		<div className={styles['chats']}>
					<div className={`${styles['chat']} ${styles['sender']}`}> hi</div>
					<div className={`${styles['chat']} ${styles['current']}`}> ing SystemeBox.</div>
					<div className={`${styles['chat']} ${styles['sender']}`}> ing System.ThreadinageBox.</div>
					{/* {currentUser &&
						chatHistory[currentUser].map((history, key) => {
							return (
								<div key={key} className={`chat ${history.sender === currentUser ? "current" : "sender"}`}>
									{history.msg}
								</div>
							)
						})
					} */}
			</div>
	)
}

export default Chats