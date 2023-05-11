import React from 'react'
import Body from './Body'
import Comments from './Comments'

import styles from './index.module.css'

const Post = ({post, id}) => {

  return (
    <div className={styles['wrapper']}>
      <Body post={post}/>
      <Comments postId={id}/>
    </div>
  )
}

export default Post