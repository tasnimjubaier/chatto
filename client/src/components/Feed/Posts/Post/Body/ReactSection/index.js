import React, { useEffect } from 'react'

import styles from './index.module.css'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

const ReactSection = ({reactions}) => {
  const posts = useSelector(state => state.posts?.posts)

	const dispatch = useDispatch()

  return (
    <div className={styles['wrapper']}>
      <div className={styles['reactions']}>
        no reactions
      </div>
      <div className={styles['button-control']}>
        <button className={styles['react-button']}>React</button>
        <button className={styles['comment-button']}>Comment</button>
        <button className={styles['share-button']}>Share</button>
      </div>
    </div>
  )
}

export default ReactSection