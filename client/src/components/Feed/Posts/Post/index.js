import React from 'react'

import styles from './index.module.css'

const Post = ({post}) => {
  console.log({post})
  return (
    <div className={styles['wrapper']}>
      <h1>{post.title}</h1>
      <h5>{post.postedBy}</h5>
      <h5>{post.postedAt}</h5>
      <p>{post.description}</p>
    </div>
  )
}

export default Post