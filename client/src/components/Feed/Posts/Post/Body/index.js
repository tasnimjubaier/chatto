import React, { useEffect, useState } from 'react'

import styles from './index.module.css'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import ContentSection from './ContentSection'
import TitleSection from './TitleSection'
import ReactSection from './ReactSection'
import AddCommentSection from './AddCommentSection'

const Body = ({post}) => {
  const [showAddCommentSection, setShowAddCommentSection] = useState(false)
	const dispatch = useDispatch()

  return (
    <div className={styles['wrapper']}>
      <TitleSection postedBy={post.postedBy}/>
      <ContentSection content={post.description}/>
      <ReactSection reactions={post.reactions} 
        toggleShowAddCommentSection={() => setShowAddCommentSection(!showAddCommentSection)}/>
      <AddCommentSection post={post} show={showAddCommentSection} />
    </div>
  )
}

export default Body