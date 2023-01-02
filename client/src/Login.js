import React from 'react'
import { useState } from "react";
import './Login.css'

const Login = ({loggedIn}) => {
  const [user, setUser] = useState(null)

  
  const handleLogin = (e) => {
    loggedIn(user)
  }
  
  const handleKeyDown = (e) => {
    if(e.key == 'Enter') {
      loggedIn(user)
    }
  }

  return (
    <div className='wrapper'>
      <div className='title'> Login to Chatto</div>
      <input className='handle' placeholder='handle' onKeyDown={handleKeyDown} onChange={e => setUser(e.target.value)}></input>
      <button className='login' onClick={handleLogin} >Proceed</button>
    </div>
  )
}

export default Login