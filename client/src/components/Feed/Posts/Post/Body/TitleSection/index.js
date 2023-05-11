import React, { useEffect } from 'react'

import styles from './index.module.css'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

const TitleSection = ({postedBy}) => {
  const posts = useSelector(state => state.posts?.posts)

	const dispatch = useDispatch()

  return (
    <div className={styles['wrapper']}>
      <div className={styles['image']}>

      </div>
      <p className={styles['name']}>
        {postedBy}  
      </p>
    </div>
  )
}

export default TitleSection