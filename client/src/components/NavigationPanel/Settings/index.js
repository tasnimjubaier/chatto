import React from 'react'
import { useSelector } from 'react-redux'

import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
	const user = useSelector(state => state.user?.user)

	const navigate = useNavigate()

	const handleLogout = (e) => {
		e.preventDefault()
		localStorage.removeItem("token")

		navigate('/login')
	}

	return (
		<div className={styles['settings']}>
			{user ? user.username : "admin"}
			<button onClick={handleLogout}>logout</button>
		</div>
	)
}

export default Settings