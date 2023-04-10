import React from 'react'

import styles from './index.module.css'

const Options = () => {
	return (
		<div className={styles['options']}>
			<ul className={styles['list']}>
				<li className={styles['item']}>Home</li>
				<li className={styles['item']}>Users</li> 
				<li className={styles['item']}>Groups</li>
				<li className={styles['item']}>Reels</li>
				<li className={styles['item']}>Events</li>
				<li className={styles['item']}>Topics</li>
			</ul>
		</div>
	)
}

export default Options