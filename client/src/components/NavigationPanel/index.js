import React from 'react'

import Logo from './Logo'
import Settings from './Settings'
import Options from './Options'
import styles from './index.module.css'


const NavigationPanel = ({onSelectOption}) => {
	
	return (
		<div className={styles['navigation-panel-wrapper']}>
			<Logo />
			<Options onSelectOption={onSelectOption}/>
			<Settings />
		</div>
	)
}

export default NavigationPanel