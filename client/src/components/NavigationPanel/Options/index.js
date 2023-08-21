import React from 'react'

import styles from './index.module.css'
import { SelectOptions } from '../../../utils/constants'

const Options = ({onSelectOption}) => {
	return (
		<div className={styles['options']}>
			<ul className={styles['list']}>
				<li className={styles['item']} onClick={() => onSelectOption(SelectOptions.HOME)}>Home</li>
				<li className={styles['item']} onClick={() => onSelectOption(SelectOptions.REELS)}>Reels</li>
				<li className={styles['item']} onClick={() => onSelectOption(SelectOptions.USERS)}>Users</li> 
				<li className={styles['item']} onClick={() => onSelectOption(SelectOptions.CHATS)}>Chats</li>
				<li className={styles['item']} onClick={() => onSelectOption(SelectOptions.EXPLORE)}>Explore</li>
				<li className={styles['item']} onClick={() => onSelectOption(SelectOptions.EVENTS)}>Events</li>
			</ul>
		</div>
	)
}

export default Options