import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import './index.css'

const Login = ({login}) => {
  const [name, setName] = useState("")
	const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    console.log(e)
    login(name, password)
  }
  
  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      // loggedIn(user)
    }
  }

  return (
    <div className='login-wrapper'>
      <div className='left-panel'>
        <p className='title'> Login </p>
        <button className='google'> Signin with Google </button>
        <button className='linkedin'> Signin with Linkedin </button>

        <div className='input-div name-div'>
          <label for="name">Name</label>
          <input className='name' type='text' id='name' placeholder='name' onChange={ e => setName(e.target.value) } />
        </div>
        <div className='input-div password-div'>
          <label for="password">Password</label>
          <input className='password' type='password' id='password' placeholder='password' onChange={ e => setPassword(e.target.value) } />
        </div>

        <button className='login-button' onClick={handleLogin}>Login</button>
        <p>Don't have an account? Signup </p>
      </div>
      <div className='right-panel'>

      </div>
    </div>
  )
}

export default Login