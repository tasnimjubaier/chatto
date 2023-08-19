import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { useLazyQuery } from '@apollo/client' 
import { GET_PLACES_QUERY, GET_PLACE_DETAILS_QUERY } from '../../utils/queries'

const PlacesSection = () => {
    const [places, setPlaces] = useState([])
    
    const [getNearbyPlaces, {data, error}] = useLazyQuery(GET_PLACES_QUERY)
    const [getPlaceDetail, {data: placeDetailData, error: placeDetailError}] = useLazyQuery(GET_PLACE_DETAILS_QUERY)
  
    useEffect(()=> {
        getNearbyPlaces({ variables : {
            location: `23.8670522%2C90.1957362`,  
            radius: "5500",
            keyword: "restaurant",
            type: "restaurant"
        }})
        console.log('feching places')  
    }, [])

    useEffect(() => {
        if(error) console.log(error)
        if(data) {
            const obj = JSON.parse(data.getNearbyPlaces)
            let placeIds = obj.results.map(r => r.place_id)
            let fields = ["name", "photos"]

            getPlaceDetail({ variables: {
                placeIds,
                fields
            }})
        }
    }, [data, error])

    useEffect(() => {
        if(placeDetailError) console.log(placeDetailError)
        if(placeDetailData) {
            console.log(placeDetailData) 
            const obj = JSON.parse(placeDetailData.getPlaceDetail)
            setPlaces(obj)
            console.log(obj)
        }
    }, [placeDetailData, placeDetailError])


  return (
    <div className={styles['wrapper']}>
        <div className={styles['places']}>
            {places &&
                places.map((place, index) => {
                    return (
                        <div key={index} className={styles['place']}>
                            <div>
                                {place.name}
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