import React, { useEffect } from 'react'

import styles from './index.module.css'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

const ReactSection = () => {
  const posts = useSelector(state => state.posts?.posts)

	const dispatch = useDispatch()

  return (
    <div className={styles['wrapper']}>
      react section
    </div>
  )
}

export default ReactSection