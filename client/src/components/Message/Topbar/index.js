import React from 'react'

import styles from './index.module.css'

const Topbar = ({selectedUser}) => {
	
	return (
		<div className={styles['topbar']}>
			{selectedUser ? selectedUser.username : "Select a user to start a chat"}
		</div>
	)
}

export default Topbar