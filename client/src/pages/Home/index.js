import React, { useEffect, useState } from 'react'

import styles from './index.module.css'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import NavigationPanel from '../../components/NavigationPanel'



const Root = () => {
	const user = useSelector(state => state.user?.user)

  const navigate = useNavigate()

  useEffect(()=>{
  }, [])

  if(user == null) {
    
    return <Navigate to="/login" replace={false} />
  }

  

  const handleSelect = (option) => {
    navigate("/" + option)  
  }
  
  return (
    <div className={styles["box-wrapper"]}>
	    <NavigationPanel onSelectOption={handleSelect}/>
		  <Outlet />
    </div>
  )
}

export default Root