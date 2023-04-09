import React, { useEffect, useState } from 'react'
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { login as saveUser } from '../../features/user/userSlice';
import './index.css'
import { addUser } from '../../features/user/userSlice';
import { LOG_IN } from '../../utils/queries';

const Login = () => {
  const [name, setName] = useState("")
	const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")

  const [login, { loading, error, data }] = useLazyQuery(LOG_IN) 
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(data)
    if(error) {
      setMessage(error)
    }
    else if(data && data.login) {
      if(data.login)
        dispatch(saveUser({
          username: data.username, 
          imageUrl: data.imageUrl,
          token : data.token
        }))
      else
        setMessage('user not found')
    }
  }, [error, data])

  const handleLogin = () => {
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
          <input className='name' type='text' id='name' placeholder='name' onChange={ e => setName(e.target.value) } />
        </div>
        <div className='input-div password-div'>
          <label for="password">Password</label>
          <input className='password' type='password' id='password' placeholder='password' onChange={ e => setPassword(e.target.value) } />
        </div>

        <button className='login-button' disabled={loading} onClick={handleLogin}>Login</button>
        <small style={{color: 'red'}}>{message}</small>
        <p>Don't have an account? Signup </p>
      </div>
      <div className='right-panel'>

      </div>
    </div>
  )
}

export default Login