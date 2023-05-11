import React, { useEffect } from 'react'

import styles from './index.module.css'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

const TitleSection = () => {
  const posts = useSelector(state => state.posts?.posts)

	const dispatch = useDispatch()

  return (
    <div className={styles['wrapper']}>
      title section
    </div>
  )
}

export default TitleSection