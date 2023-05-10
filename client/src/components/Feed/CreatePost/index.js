import React, { useState } from 'react'

import styles from './index.module.css'

const CreatePost = () => {
  const [text, setText] = useState("")

  const handlePost = () => {
    console.log(text)

    


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