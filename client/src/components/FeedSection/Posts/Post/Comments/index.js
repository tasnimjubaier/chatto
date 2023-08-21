import React, { useEffect } from 'react'

import styles from './index.module.css'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'

const Comments = ({postId}) => {
  const comments = useSelector(state => state.posts.posts[postId].comments)

	const dispatch = useDispatch()

  return (
    <div className={styles['wrapper']}>
      {comments && comments.map((comment, key) => (
        <Comment key={key} comment={comment} />
      ))}
    </div>
  )
}

export default Comments