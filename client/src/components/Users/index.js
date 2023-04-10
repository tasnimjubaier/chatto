import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

import { saveUsers } from '../../features/users/usersSlice'
import './index.css'
import { GET_USERS } from '../../utils/queries'
import User from './User'


const Users = ({user, onSelectUser}) => {
	const {data, loading, error} = useQuery(GET_USERS)

  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)

  useEffect(() => {
    if(data) {
      dispatch(saveUsers(data.users))
    }
  }, [data]);

	const handleUserSelect = (user) => {
		onSelectUser(user)
	}

	return (
		<div className='users-wrapper'>
			<div className='topbar'>
					Contacts
			</div>
			<div className='users'>
				{loading && (<div>loading</div>)}
				{error && <div>error loading users</div>}
				{users && users.map((user, key) => (
					<User key={key} user={user} userSelected={handleUserSelect} />
				))}
			</div>
		</div>
	)
}

export default Users