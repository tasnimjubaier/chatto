import React, { useEffect, useState } from 'react'

import './index.css'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_USER, SIGN_UP } from '../../utils/queries'
import { login } from '../../features/user/userSlice'
import { useDispatch } from 'react-redux'

const Signup = ({signup}) => {
  const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

  const [nameMessage, setNameMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState('')
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("")

  const [getUser, { loading, error, data }] = useLazyQuery(GET_USER)
  const [registerUser, { loading: registerUserLoading, error: registerUserError, data: registerUserData }] = useMutation(SIGN_UP)
   
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (data && data.user && data.user.username)
    {
      setNameMessage("user already exists")
      console.log(data.user.username)
    }
    else 
      setNameMessage("")
  }, [data])

  useEffect(() => {
    console.log('here in login')
    console.log(registerUserData)
    if(registerUserData) {
      console.log('here in loging')
      dispatch(login({
        username: registerUserData.username,
        imageUrl: registerUserData.imageUrl,
        token: registerUserData.token, 
      }))
    }
  }, [registerUserError, registerUserData])

  const searchUser = () => {
    getUser({ variables: { username: name }})
  }

  useEffect(() => {
    setTimeout(searchUser, 500)

    return () => {
      clearTimeout(searchUser)
    }
  }, [name])

  const handleSignup = (e) => {
    if(name === ""){
      if(nameMessage !== "") return 
      setNameMessage("Please choose a username")
      return 
    }
    if(password === ""){
      setPasswordMessage("password can't be empty")
      return 
    }
    
    if(confirmPassword !== password){
      setConfirmPasswordMessage("Passwords don't match")
      return 
    }
    console.log('here')

    registerUser({ variables: {
      username: name,
      password: password,
      confirmPassword: password
    }})
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    console.log(e.target.value + ' ' + password)
    if(password && password !== e.target.value) 
      setConfirmPasswordMessage("Passwords don't match")
    else 
      setConfirmPasswordMessage("")
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
          <small style={{color: 'red'}}>{nameMessage}</small>
        </div>
        <div className='input-div password-div'>
          <label for="password">Password</label>
          <input className='password' type='password' id='password' placeholder='password' onChange={ e => setPassword(e.target.value) } />
          <small style={{color: 'red'}}>{passwordMessage}</small>
        </div>
        <div className='input-div confirm-password-div'>
          <label for="confirmPassword">Confirm Password</label>
          <input className='confirmPassword' type='password' id='confirmPassword' placeholder='confirm password' onChange={ handleConfirmPasswordChange } />
          <small style={{color: 'red'}}>{confirmPasswordMessage}</small>
        </div>

        <button className='signup-button' onClick={handleSignup} disabled={registerUserLoading}>
          Signup
        </button>
        <small style={{color: 'red', visibility: `${registerUserError ? "visible": "hidden"}`}} > couldn't sign up</small>
        <p>Already have an account? Signin </p>
      </div>
      <div className='right-panel'>
        {registerUserLoading && "loading"}
        {registerUserData && "data"}
        {registerUserError && "error"}
      </div>
    </div>
  )
}

export default Signup