import React, { useState } from 'react'

import styles from './index.module.css'
import NavigationPanel from '../NavigationPanel'
import Content from '../Content'



const Root = () => {
  const [selectedOption, setSelectedOption] = useState('home')
  
  return (
    <div className='box-wrapper'>
			<NavigationPanel onSelectOption={option => setSelectedOption(option)}/>
			<Content selectedOption={selectedOption}/>
    </div>
  )
}

export default Root