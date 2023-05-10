import React, { useEffect } from 'react'

import styles from './index.module.css'
import Post from './Post'
import { GET_POSTS } from '../../../utils/queries'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../../features/posts/postsSlice'

const Posts = () => {
  const posts = useSelector(state => state.posts.posts)
	const [getPosts, {data, error, loading }] = useLazyQuery(GET_POSTS)

	const dispatch = useDispatch()


  useEffect(() => {
    getPosts({variables: {
      username: "Anik",
      index: 1,
      limit: 10
    }})
  }, [getPosts])

  useEffect(() => {
    if (error) {
			return 
		}
		if (data) {
			dispatch(setPosts({posts: data}))
		}
  }, [data, error])

  return (
    <div className={styles['wrapper']}>
      {error && error}
      {posts.map(post => (
        <Post post={post} />
      ))}
    </div>
  )
}

export default Posts