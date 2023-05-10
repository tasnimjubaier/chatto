import React, { useDeferredValue, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { login as saveUser } from '../../features/user/userSlice';

import './index.css'
import { LOG_IN } from '../../utils/queries';

const Login = () => {
  const [name, setName] = useState("")
	const [password, setPassword] = useState("")

  const [nameMessage, setNameMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [message, setMessage] = useState("")

  const [login, { loading, error, data, networkStatus, called }] = useLazyQuery(LOG_IN, {
    fetchPolicy: "cache-and-network", // Used for first execution
    nextFetchPolicy: 'cache-first',
  }) 
  const dispatch = useDispatch()

  useEffect(() => {
    console.log({networkStatus})
    console.log({called})
  }, [called, networkStatus])

  useEffect(() => {
    if(error) {
      setMessage(error.message)
    }
    else if(data) {
      if(data.login)
        dispatch(saveUser({
          username: data.login.username, 
          imageUrl: data.login.imageUrl,
          token : data.login.token
        }))
      else
        setMessage('user not found')
    }
  }, [error, data])


  const handleOnKeyDown = (e) => {
		if (e.key === 'Enter') {
      handleLogin()
    }
	}

  const handleLogin = () => {
    if (name === "") {
      setNameMessage("enter name")
      return 
    }
    if (password === "") {
      setPasswordMessage("enter password")
      return 
    }

    login({ variables : {
      username: name,
      password
    }})
  }

  return (
    <div className='login-wrapper'>
      <div className='left-panel'>
        <p className='title'> Login </p>
        <button className='google'> Signin with Google </button>
        <button className='linkedin'> Signin with Linkedin </button>

        <div className='input-div name-div'>
          <label for="name">Name</label>
          <input className='name' type='text' id='name' placeholder='name' 
            onChange={ e => { setName(e.target.value); setMessage(""); setNameMessage(""); setPasswordMessage("") } } />
          <small style={{color: 'red'}}>{nameMessage}</small>
        </div>
        <div className='input-div password-div'>
          <label for="password">Password</label>
          <input className='password' type='password' id='password' placeholder='password' onKeyDown={handleOnKeyDown}
            onChange={ e => { setPassword(e.target.value); setMessage(""); setNameMessage(""); setPasswordMessage("") } } />
          <small style={{color: 'red'}}>{passwordMessage}</small>
        </div>

        <button className='login-button' disabled={loading} onClick={handleLogin}>Login</button>
        <small style={{color: 'red'}}>{message}</small>
        <p>Don't have an account? Signup </p>
      </div>
      <div className='right-panel'>
          {loading && "loading"}
          {error && "error"}
          {data && "data"}
      </div>
    </div>
  )
}

export default Login