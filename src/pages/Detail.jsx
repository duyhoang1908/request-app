import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRequestById } from '../firebase/services'

const Detail = () => {
    const {id} = useParams()
    useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await getRequestById(id)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[id])
  return (
    <div></div>
  )
}

export default Detail