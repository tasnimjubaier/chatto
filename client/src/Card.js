import React, { useEffect, useState } from 'react'
import './Card.css'
// import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';



const InfoCard = () => {
  const [users, setUsers] = useState(null) // { name, lastmsg }
  const [currentUser, setCurrentUser] = useState(null)
  const [chatHistory, setChatHistory] = useState(null)

  useEffect(() => {
    
    return () => {
      
    };
  }, []);


  return (
    <div className='wrapper'>
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
              {/* <div className='chat current'> hi</div>
              <div className='chat current'> ing System.Threading.Tasks;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Platform;
using Comm.Net.Views;
using MessageBox.Avalonia;
using MessageBox.Avalonia.DTO;
using MessageBox.</div> */}
              {currentUser &&
                chatHistory[currentUser].map((history, key) => {
                  return (
                    <div key={key} className={`chat ${history.sender === currentUser ? "current" : ""}`}>
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

export default InfoCard