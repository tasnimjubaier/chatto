import React, { useEffect, useState } from 'react'

import styles from './index.module.css'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import NavigationPanel from '../../components/NavigationPanel'



const Root = () => {
  const [selectedOption, setSelectedOption] = useState('home')
	const user = useSelector(state => state.user?.user)

  const navigate = useNavigate()

  useEffect(()=>{
    //localStorage.setItem("place", "dhaka")
  }, [])

  if(user == null) {
    
    return <Navigate to="/login" replace={false} />
  }

  

  const handleSelect = (option) => {
    // console.log({e})
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