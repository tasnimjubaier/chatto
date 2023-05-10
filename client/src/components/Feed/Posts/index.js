import React from 'react'

import styles from './index.module.css'
import Post from './Post'

const Posts = () => {
  return (
    <div className={styles['wrapper']}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )
}

export default Posts