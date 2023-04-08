import React, { useState } from 'react'

import './index.css'

const Signup = ({signup}) => {
  const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

  
  const handleSignup = (e) => {
    signup(name)
  }
  
  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      // signup(user)
    }
  }

  return (
    <div className='signup-wrapper'>
      <div className='left-panel'>
        <p className='title'> Signup </p>
        <button className='google'> Signup with Google </button>
        <button className='linkedin'> Signup with Linkedin </button>
        
        <div className='input-div name-div'>
          <label for="name">Name</label>
          <input className='name' type='text' id='name' placeholder='name' onChange={ e => setName(e.target.value) } />
        </div>
        <div className='input-div password-div'>
          <label for="password">Password</label>
          <input className='password' type='password' id='password' placeholder='password' onChange={ e => setPassword(e.target.value) } />
        </div>
        <div className='input-div confirm-password-div'>
          <label for="confirmPassword">Confirm Password</label>
          <input className='confirmPassword' type='password' id='confirmPassword' placeholder='confirm password' onChange={ e => setConfirmPassword(e.target.value) } />
        </div>

        <button className='signup-button'>Signup</button>
        <p>Already have an account? Signin </p>
      </div>
      <div className='right-panel'>

      </div>
    </div>
  )
}

export default Signup