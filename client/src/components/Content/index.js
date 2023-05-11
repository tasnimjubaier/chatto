import React from 'react'

import styles from './index.module.css'
import Feed from '../Feed';

const Content = ({selectedOption}) => {

  if(selectedOption === 'home') return <Feed />;
  return (
    <div>   Content: {selectedOption} </div>
  )
}

export default Content