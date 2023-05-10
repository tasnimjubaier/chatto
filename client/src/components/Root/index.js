import React, { useState } from 'react'

import styles from './index.module.css'
import NavigationPanel from '../NavigationPanel'
import Content from '../Content'



const Root = ({user}) => {
  const [selectedOption, setSelectedOption] = useState('home')
  
  return (
    <div className='box-wrapper'>
			<NavigationPanel user={user} onSelectOption={option => setSelectedOption(option)}/>
			<Content selectedOption={selectedOption} user={user}/>
    </div>
  )
}

export default Root