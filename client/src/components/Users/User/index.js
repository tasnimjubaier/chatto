import React from 'react'

import styles from './index.module.css'

const User = ({key, user, userSelected}) => {

	return (
		<div key={key} className={styles['user']} onClick={() => userSelected(user)}>
			<div className={styles["image-div"]}>

			</div>
			<div className={styles['others-div']}>
				<div className={styles['username']}>
					{user.username}
				</div>
				<div className={styles['last-msg']}>
					this is the last message
				</div>
			</div>
		</div>
	)
}

export default User