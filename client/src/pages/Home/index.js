import React, { useEffect, useState } from 'react'

import styles from './index.module.css'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import NavigationPanel from '../../components/NavigationPanel'
import { verifyToken } from '../../service/restService'



const Home = () => {
	// const [user, setUser] = useState(null)
  const user = useSelector(state => state.user?.user)
  const navigate = useNavigate()

  useEffect(()=>{
    let token = localStorage.getItem('token')
    // setUser(token)
  }, [])

  const handle = (e) => {
    verifyToken("1234")
  }

  if(user == null) {
    
    return <Navigate to="/login" replace={false} />
  }

  const handleSelect = (option) => {
    navigate("/" + option)  
  }
  
  return (
    <div className={styles["box-wrapper"]}>
	    <NavigationPanel onSelectOption={handleSelect}/>
      <button onClick={handle}> verify token</button>
		  <Outlet />
    </div>
  )
}

export default Home