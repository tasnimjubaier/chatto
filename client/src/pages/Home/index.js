import React, { useEffect, useState } from 'react'

import styles from './index.module.css'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import NavigationPanel from '../../components/NavigationPanel'
import { verifyToken } from '../../service/restService'


const Home = () => {
	const [user, setUser] = useState(null)
  // const user = useSelector(state => state.user?.user)
  const navigate = useNavigate()

  useEffect(()=>{
    let token = localStorage.getItem('token')

    if(token) {
      const res = verifyToken(token)
      setUser(res)
    }
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

export default Home