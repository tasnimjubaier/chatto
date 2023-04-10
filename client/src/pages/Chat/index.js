import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../utils/queries'

import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { saveUsers } from '../../features/users/usersSlice'


const Chat = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [chatHistory, setChatHistory] = useState(null)
  
  const {data, loading, error} = useQuery(GET_USERS)

  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)

  useEffect(() => {
    
    if(data) {
      dispatch(saveUsers(data.users))
    }

    return () => {
      
    };
  }, [data]);


  return (
    <div className='chat-wrapper'>
      <div className='box'>
        <div className='left-panel'>
          <div className='topbar'>
              Chatto
          </div>
          <div className='users'>
            {loading && (<div>loading</div>)}
            {error && <div>error loading users</div>}
            {users && users.map((user, key) => {
              return (
                <div key={key} className="user">
                    <div className='username'>
                      {user.username}
                    </div>
                    {/* <div className='last-msg'>
                      {user.imageUrl}
                    </div> */}
                </div>
              )
            })}
          </div>
        </div>
        <div className='interactions'>
          <div className='chats'>
              <div className='chat current'> hi</div>
              <div className='chat sender'> ing SystemeBox.</div>
              <div className='chat current'> ing System.ThreadinageBox.</div>
              {currentUser &&
                chatHistory[currentUser].map((history, key) => {
                  return (
                    <div key={key} className={`chat ${history.sender === currentUser ? "current" : "sender"}`}>
                      {history.msg}
                    </div>
                  )
                })
              }
          </div>
          <div className='msg-box'>
              <input className='input-box'>

              </input>
              <button className='send-msg-button'> Send </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat