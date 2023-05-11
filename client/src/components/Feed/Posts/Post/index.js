import React from 'react'
import Body from './Body'
import Comments from './Comments'

import styles from './index.module.css'

const Post = ({post}) => {
  console.log({post})

  return (
    <div className={styles['wrapper']}>
      <Body />
      <Comments />
    </div>
  )
}

export default Post