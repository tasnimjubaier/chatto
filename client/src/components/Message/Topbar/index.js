import React from 'react'

import styles from './index.module.css'

const Topbar = ({selectedUser}) => {

	const handleCallAudio = (e) => {

	}

	const handleCallVideo = (e) => {
		
	}
	
	return (
		<div className={styles['topbar']}>
			<div className={styles['left']}>
				<div className={styles["image"]}>
					
				</div>
				<div className={styles["title"]}>
					{selectedUser ? selectedUser.username : "Select a user to start a chat"}
				</div>
			</div>
			<div className={styles['right']}>
				<div className={styles["buttons"]}>
					<button className={styles['audio-call']} onClick={handleCallAudio}>A Call</button>
					<button className={styles['video-call']} onClick={handleCallVideo}>V Call</button>
				</div>
				<div className={styles["select"]}>
					S
				</div>
			</div>
		</div>
	)
}

export default Topbar