import React, { useEffect, useState } from 'react'

import styles from './index.module.css'
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '../../../utils/queries'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../../features/posts/postsSlice'

const CreatePost = () => {
  const [text, setText] = useState("")
  const [selectedImages, setSelectedImages] = useState([])

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

  const handleUpload = () => {
    // Here, you can implement the upload logic to send the images to a server
    // For demonstration purposes, we'll simply log the selected image data URLs
    selectedImages.forEach((image) => {
      console.log(image.preview);
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const newSelectedImages = files.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });
    console.log(newSelectedImages)

    setSelectedImages((prevSelectedImages) => [...prevSelectedImages, ...newSelectedImages]);
  }

  return (
    <div className={styles['wrapper']}>
      
      <textarea className={styles['input']} value={text} onChange={e => setText(e.target.value)} />
      <div className={styles['images']}>
        {selectedImages.map((image, index) => {
          return (
            <div className={styles['image']}>
              <img key={index} src={image.preview} alt='bal' />
            </div>
          )
        })}
      </div>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      
      <button className={styles['post-button']} onClick={handlePost}>Post</button>
    </div>
  )
}

export default CreatePost