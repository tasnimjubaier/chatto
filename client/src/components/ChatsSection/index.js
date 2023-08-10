import React, { useState } from 'react'

import NavigationPanel from '../NavigationPanel'
import Users from '../Users'
import Message from '../Message'
import  styles from './index.module.css'
import { useSelector } from 'react-redux'


const ChatsSection = () => {
	const [selectedUser, setSelectedUser] = useState(null)
	const user = useSelector(state => state.user.user)
	const handleSelectUser = (user) => {
		setSelectedUser(user)
	}
	
	return (
		<div className={styles["box-wrapper"]}>
			<div className={styles["left-panel"]}>
				<Users user={user} onSelectUser={handleSelectUser}/>
			</div>
			<Message user={user} selectedUser={selectedUser}/>
    	</div>
	)
}

export default ChatsSection