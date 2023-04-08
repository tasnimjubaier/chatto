import React, { useEffect, useState } from 'react'
import './index.css'



const Chat = () => {
  const [users, setUsers] = useState(null) // { name, lastmsg }
  const [currentUser, setCurrentUser] = useState(null)
  const [chatHistory, setChatHistory] = useState(null)

  useEffect(() => {
    
    return () => {
      
    };
  }, []);


  return (
    <div className='chat-wrapper'>
      <div className='box'>
        <div className='left-panel'>
          <div className='topbar'>
              Chatto
          </div>
          <div className='users'>
            {users && users.map((user, key) => {
              return (
                <div key={key} className="user">
                    <div className='username'>
                      {user.name}
                    </div>
                    <div className='last-msg'>
                      {user.lastMsg}
                    </div>
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