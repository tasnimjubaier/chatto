import React from 'react'

import styles from './index.module.css'
import CreatePost from './CreatePost'
import Posts from './Posts'



const Feed = () => {
  return (
    <div className={styles['wrapper']}>
      <CreatePost />
      {/* <Posts /> */}
    </div>
  )
}

export default Feed