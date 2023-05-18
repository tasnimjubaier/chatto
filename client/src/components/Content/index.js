import React from 'react'

import styles from './index.module.css'
import Feed from '../Feed';
import Box from '../Box';
import { useSelector } from 'react-redux';

const Content = ({selectedOption}) => {
  const user = useSelector(state => state.user.user)


  if(selectedOption === 'home') return <Feed />;
  if(selectedOption === 'chats') return <Box user={user} />
  return (
    <div>   Content: {selectedOption} </div>
  )
}

export default Content