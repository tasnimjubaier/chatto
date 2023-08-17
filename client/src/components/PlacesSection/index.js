import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { useLazyQuery } from '@apollo/client'
import { GET_PLACES_QUERY } from '../../utils/queries'

const PlacesSection = () => {
    const [places, setPlaces] = useState([])
    const [getNearbyPlaces, {data, error}] = useLazyQuery(GET_PLACES_QUERY)
  
    useEffect(()=> {
        getNearbyPlaces({ variables : {
        location: `23.8670522%2C90.1957362`,
        radius: "1500",
        keyword: "school",
        type: "school"
        }})
        console.log('feching places')
    }, [])

    useEffect(() => {
        if(error) console.log(error)
        if(data) {
            const obj = JSON.parse(data.getNearbyPlaces)
            console.log(obj)
            setPlaces(obj.results)
        }
    }, [data, error])


  return (
    <div className={styles['wrapper']}>
        <div className={styles['places']}>
            {places &&
                places.map((place, index) => {
                    return (
                        <div key={index} className={styles['place']}>
                            <div>
                                {place.place_id}
                            </div>
                            {/* <img src={place.icon}  /> */}
                            {place.photos && place.photos[0] && place.photos[0].html_attributions &&
                            <div dangerouslySetInnerHTML={{ __html: place.photos[0].html_attributions[0] }} /> }
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default PlacesSection