import React, { useEffect, useState } from 'react'

import styles from './index.module.css'
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '../../../utils/queries'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../../features/posts/postsSlice'

const CreatePost = () => {
  const [text, setText] = useState("")

  const user = useSelector(state => state.user.user)
  const [createPost, {data, error}] = useMutation(CREATE_POST)

  const dispatch = useDispatch()

  useEffect(() => {
    if(error) {
      return 
    }
    if(data) {
      dispatch(addPost({post : data.createPost}))
    }
  }, [data, error])


  const handlePost = () => {
    createPost({ variables: {
      postedBy: user.username,
      title: "A new Title",
      description: text
    }})
    
    setText("")
  }

  return (
    <div className={styles['wrapper']}>
      <textarea className={styles['input']} value={text} onChange={e => setText(e.target.value)}/>
      <button className={styles['post-button']} onClick={handlePost}>Post</button>
    </div>
  )
}

export default CreatePost