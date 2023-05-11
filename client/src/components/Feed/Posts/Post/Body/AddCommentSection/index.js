import React, { useEffect, useState } from 'react'

import styles from './index.module.css'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_COMMENT_OR_REPLY } from '../../../../../../utils/queries'
import { addComment } from '../../../../../../features/posts/postsSlice'

const AddCommentSection = ({post, show}) => {
	const [text, setText] = useState("")
	const user = useSelector(state => state.user.user)
	
	const [createCommentOrReply, {data, error}] = useMutation(CREATE_COMMENT_OR_REPLY)
	const dispatch = useDispatch()
	
	useEffect(() => {
		if(error) {
			return 
		}
		if(data) {
			// data.createCommentOrReply
			dispatch(addComment({
				...data.createCommentOrReply
			}))
		}
	}, [data, error])

	const handlePost = () => {
		// console.log(user)
		createCommentOrReply({ variables: {
			postedBy: user.username,
			content: text,
			parentId: post._id.toString()
		}})
		
		setText('')
	}
	
  return (
    <div className={`${styles['wrapper']} ${show ? styles['show'] : styles['hide']}`}>
			<textarea className={styles['input']} value={text} onChange={e => setText(e.target.value)}/>
      <button className={styles['post-button']} onClick={handlePost}>Post</button>
    </div>
  )
}

export default AddCommentSection