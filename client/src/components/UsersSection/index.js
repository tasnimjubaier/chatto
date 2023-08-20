import React, { useEffect, useState } from 'react'

import styles from './index.module.css'
import { useLazyQuery } from '@apollo/client'
import { GET_USERS } from '../../utils/queries'


const UsersSection = () => {
  const [users, setUsers] = useState([]) 
  const [getUsers, {data, error}] = useLazyQuery(GET_USERS)


  useEffect(() => {
    const usrs = Array.from({length : 19})

    getUsers()

    setUsers(usrs)
    console.log(usrs)
  }, [])


  useEffect(() => {
    if(error) console.log(error)
    if(data) {
      setUsers(data.users)
      console.log(data)
    }
  }, [data, error])

  return (
    <div className={styles["wrapper"]}>
      {users.map((user, index) => 
        <div key={index} className={styles["user-wrapper"]}>
          <div className={styles["photo"]}>
            
          </div>
          <div className={styles["name"]}>
            {`${user?.username}`}
          </div>
          <div className={styles["message"]}>
            message
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersSection