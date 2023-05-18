import React, { useState } from 'react'

import NavigationPanel from '../NavigationPanel'
import Users from '../Users'
import Message from '../Message'
import  './index.css'


const Box = ({user}) => {
	const [selectedUser, setSelectedUser] = useState(null)

	const handleSelectUser = (user) => {
		setSelectedUser(user)
	}
	
	return (
		<div className='box-wrapper'>
			{/* <NavigationPanel user={user}/> */}
			<div className='left-panel'>
				<Users user={user} onSelectUser={handleSelectUser}/>
			</div>
			<Message user={user} selectedUser={selectedUser}/>
    </div>
	)
}

export default Box