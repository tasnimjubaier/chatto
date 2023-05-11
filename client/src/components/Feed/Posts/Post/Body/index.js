import React, { useEffect } from 'react'

import styles from './index.module.css'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import ContentSection from './ContentSection'
import TitleSection from './TitleSection'
import ReactSection from './ReactSection'

const Body = () => {

	const dispatch = useDispatch()

  return (
    <div className={styles['wrapper']}>
      <TitleSection />
      <ContentSection />
      <ReactSection />
    </div>
  )
}

export default Body