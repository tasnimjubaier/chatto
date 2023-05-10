import React from 'react'

import styles from './index.module.css'

const Options = ({onSelectOption}) => {
	return (
		<div className={styles['options']}>
			<ul className={styles['list']}>
				<li className={styles['item']} onClick={() => onSelectOption('home')}>Home</li>
				<li className={styles['item']} onClick={() => onSelectOption('reels')}>Reels</li>
				<li className={styles['item']} onClick={() => onSelectOption('users')}>Users</li> 
				<li className={styles['item']} onClick={() => onSelectOption('chats')}>Chats</li>
				<li className={styles['item']} onClick={() => onSelectOption('groups')}>Groups</li>
				<li className={styles['item']} onClick={() => onSelectOption('events')}>Events</li>
			</ul>
		</div>
	)
}

export default Options