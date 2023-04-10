import React from 'react'
import { useSelector } from 'react-redux'

import styles from './index.module.css'

const Settings = () => {
	const user = useSelector(state => state.user.user)

	return (
		<div className={styles['settings']}>
			{user ? user.username : "admin"}
		</div>
	)
}

export default Settings