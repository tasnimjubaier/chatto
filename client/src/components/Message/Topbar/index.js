import React from 'react'

import styles from './index.module.css'

const Topbar = ({selectedUser}) => {
	
	return (
		<div className={styles['topbar']}>
			<div className={styles["image-div"]}>
				
			</div>
			<div className={styles['others-div']}>
				{selectedUser ? selectedUser.username : "Select a user to start a chat"}
			</div>
		</div>
	)
}

export default Topbar