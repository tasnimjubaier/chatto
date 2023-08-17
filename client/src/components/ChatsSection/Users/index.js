import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

import { saveUsers } from '../../../features/users/usersSlice'
import { GET_USERS } from '../../../utils/queries'
import User from './User'

import styles from './index.module.css'


const Users = ({user, onSelectUser}) => {
	const {data, loading, error} = useQuery(GET_USERS)

  const dispatch = useDispatch()
  let users = useSelector(state => state.users.users)

  useEffect(() => {
    if(data) {
      dispatch(saveUsers(data.users))
    }
  }, [data]);

	const handleUserSelect = (user) => {
		onSelectUser(user)
	}

	return (
		<div className={styles["users-wrapper"]}>
			<div className={styles["topbar"]}>
					Contacts
			</div>
			<div className={styles["users"]}>
				{loading && (<div>loading</div>)}
				{error && <div>error loading users</div>}
				{users && users.map((user, key) => (
					<User key={key} user={user} userSelected={handleUserSelect} />
				))}
				<User user={{username: 'openai'}} userSelected={handleUserSelect} />
			</div>
		</div>
	)
}

export default Users