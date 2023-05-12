import React from 'react'

import styles from './index.module.css'

const Reactions = ({reactions, show}) => { // content, createdBy, createdAt
  
  return (
    <div className={`${styles['wrapper']} ${(show && reactions.length) ? styles['show'] : ""}`}>
      <ul className={styles['list']}>
        {reactions.map(r => {
          return (
            <li className={styles['item']}>
              {r.createdBy}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Reactions