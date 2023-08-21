import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import styles from './index.module.css'
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '../../../utils/queries'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../../features/posts/postsSlice'

const CreatePost = () => {
  const [text, setText] = useState("")
  const [showingImagesPopup, setShowingImagesPopup] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [initialSlide, setInitialSlide] = useState(0)
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
  }, [data, dispatch, error])


  const handlePost = () => {
    createPost({ variables: {
      postedBy: user.username,
      title: "A new Title",
      description: text
    }})
    
    setText("")
  }

  const handleUpload = () => {
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

  const handleClickOnImage = (e, index) => {
    setShowingImagesPopup(true)
    setInitialSlide(index)
  }

  return (
    <div className={styles['wrapper']}>
      <textarea className={styles['input']} value={text} onChange={e => setText(e.target.value)} />
      
      <div>
        <label htmlFor="custom-file-input" className={styles["custom-file-button"]}>
          Choose Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className={styles["custom-file-input"]}
          id="custom-file-input"
        />
      </div>
      <div className={styles["images"]}>
          {selectedImages.map((image, index) => {
            return (
              <div className={styles['image']} onClick={e => handleClickOnImage(e, index)}>
                <img className={styles['image']} key={index} src={image.preview} alt='bal' />
              </div>
            )
          })}
        </div>
      
      <button className={styles['post-button']} onClick={handlePost}>Huh</button>
      { showingImagesPopup && <div className={styles["popup"]} >
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            className={styles["swiper-images"]}
            initialSlide={initialSlide}
          >
            {selectedImages.map((image, index) => {
              return (
                <SwiperSlide className={styles["swiper-slide"]} key={index}>
                  <img className={styles["swiper-image"]} src={image.preview} alt={image.preview} />
                </SwiperSlide>
              )
            })}
            <span className={styles["close-popup-button"]} onClick={() => setShowingImagesPopup(false)}>X</span>
          </Swiper>
      </div>}
    </div>
  )
}

export default CreatePost