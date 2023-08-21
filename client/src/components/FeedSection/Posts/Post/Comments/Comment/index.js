import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

import styles from './index.module.css'

const Comment = ({comment}) => {

	const dispatch = useDispatch()

  return (
    <div className={styles['wrapper']}>
      <div className={styles['top']}>
        <div className={styles['posted-by']}>
          {comment.postedBy}
        </div>
        <div className={styles['posted-at']}>
          {comment.postedAt}
        </div>
      </div>
      <div className={styles['comment']}>
        {comment.content}
      </div>
    </div>
  )
}

export default Comment