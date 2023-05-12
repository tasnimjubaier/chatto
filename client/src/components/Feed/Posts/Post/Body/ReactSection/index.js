import React, { useEffect, useState } from 'react'

import styles from './index.module.css'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_REACTION, REMOVE_REACTION } from '../../../../../../utils/queries'
import { addReaction as addReactionSlice, removeReaction as removeReactionSlice } from '../../../../../../features/posts/postsSlice'

const ReactSection = ({post, toggleShowAddCommentSection}) => {
  const [reacted, setReacted] = useState(false)
  const reactions = post.reactions
  const user = useSelector(state => state.user.user)

  const [addReaction, {data: addReactionData, error: addReactionError}] = useMutation(ADD_REACTION)
  const [removeReaction, {data: removeReactionData, error: removeReactionError}] = useMutation(REMOVE_REACTION)
	const dispatch = useDispatch()


  useEffect(() => {
    if(addReactionError) {
      return
    }
    if(addReactionData) {
      dispatch(addReactionSlice({
        ...addReactionData.addReaction
      }))
    }
  }, [addReactionData, addReactionError])

  useEffect(() => {
    if(removeReactionError) {
      return 
    }
    if(removeReactionData) {
      dispatch(removeReactionSlice({
        ...removeReactionData.removeReaction
      }))
    }
  }, [removeReactionData, removeReactionError])

  const handleReactClick = (e) => {
    
    if(reacted) {
      removeReaction({variables: {
        createdBy: user.username,
        parentId: post._id
      }})
    }
    else {
      addReaction({variables: {
        createdBy: user.username,
        content: "love",
        parentId: post._id
      }})
    }
    setReacted(!reacted)
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['reactions']}>
        {reactions.length ? reactions.length : "no"} reactions
      </div>
      <div className={styles['button-control']}>
        <button className={`${styles['react-button']} ${reacted ? styles['reacted']: ''}`}
          onClick={handleReactClick} >{reacted ? "Reacted" : "React"}</button>
        <button className={styles['comment-button']} onClick={toggleShowAddCommentSection}>Comment</button>
        <button className={styles['share-button']}>Share</button>
      </div>
    </div>
  )
}

export default ReactSection