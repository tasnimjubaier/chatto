import React, { useDeferredValue, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { login as saveUser } from '../../features/user/userSlice';

import styles from './index.module.css'
import { Navigate, useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate()

  useEffect(() => {
  }, [called, networkStatus])

  useEffect(() => {
    if(error) {
      setMessage(error.message)
    }
    else if(data) {
      if(data.login){
        dispatch(saveUser({
          username: data.login.username, 
          imageUrl: data.login.imageUrl,
          token : data.login.token
        }))
        navigate("/")
      }
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

  const handleSignup = () => {
    navigate("/signup")
  }

  return (
    <div className={styles['login-wrapper']}>
      <div className={styles['left-panel']}>
        <p className={styles['title']}> Login </p>
        <button className={styles['google']}> Signin with Google </button>
        <button className={styles['linkedin']}> Signin with Linkedin </button>

        <div className={`${styles['input-div']} ${styles['name-div']}`}>
          <label for="name">Name</label>
          <input className={styles['name']} type='text' id='name' placeholder='name' 
            onChange={ e => { setName(e.target.value); setMessage(""); setNameMessage(""); setPasswordMessage("") } } />
          <small style={{color: 'red'}}>{nameMessage}</small>
        </div>
        <div className={`${styles['input-div']} ${styles['password-div']}`}>
          <label for="password">Password</label>
          <input className={styles['password']} type='password' id='password' placeholder='password' onKeyDown={handleOnKeyDown}
            onChange={ e => { setPassword(e.target.value); setMessage(""); setNameMessage(""); setPasswordMessage("") } } />
          <small style={{color: 'red'}}>{passwordMessage}</small>
        </div>

        <button className={styles['login-button']} disabled={loading} onClick={handleLogin}>Login</button>
        <small style={{color: 'red'}}>{message}</small>
        <p>Don't have an account?  
          <span onClick={handleSignup}>
            signup
          </span>
        </p>
      </div>
      <div className={styles['right-panel']}>
          {loading && "loading"}
          {error && "error"}
          {data && "data"}
      </div>
    </div>
  )
}

export default Login