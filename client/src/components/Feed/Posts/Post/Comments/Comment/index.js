import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

import styles from './index.module.css'

const Comment = ({commentId}) => {

	const dispatch = useDispatch()

  return (
    <div className={styles['wrapper']}>
      this is a comment
    </div>
  )
}

export default Comment