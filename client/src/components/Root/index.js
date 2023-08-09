import React, { useState } from 'react'

import styles from './index.module.css'
import NavigationPanel from '../NavigationPanel'
import Content from '../Content'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'



const Root = () => {
  const [selectedOption, setSelectedOption] = useState('home')
	const user = useSelector(state => state.user?.user)

  console.log({user})
  
  if(user == null) {
    
    return <Navigate to="/login" replace={false} />
  }
  
  return (
    <div className='box-wrapper'>
			<NavigationPanel onSelectOption={option => setSelectedOption(option)}/>
			<Content selectedOption={selectedOption}/>
    </div>
  )
}

export default Root