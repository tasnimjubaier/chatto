import React, { useEffect, useState } from 'react'

import styles from './index.module.css'


const UsersSection = () => {
  const [users, setUsers] = useState([]) 
  useEffect(() => {
    const usrs = Array.from({length : 19})
    setUsers(usrs)
    console.log(usrs)
  }, [])

  return (
    <div className={styles["wrapper"]}>
      {users.map((user, index) => 
        <div key={index} className={styles["user-wrapper"]}>
          <div className={styles["photo"]}>
            
          </div>
          <div className={styles["name"]}>
            {`user ${index}`}
          </div>
          <div className={styles["message"]}>
            send message
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersSection