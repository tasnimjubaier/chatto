import React from 'react'

import styles from './index.module.css'
import Feed from '../Feed';

const Content = ({selectedOption, user}) => {


  if(selectedOption === 'home') return <Feed user={user} />;
  return (
    <div>   Content: {selectedOption} </div>
  )
}

export default Content