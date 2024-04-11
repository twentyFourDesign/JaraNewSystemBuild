import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import axios from 'axios'
import { baseUrl } from '../../../../constants/baseurl'
import Room from './Room'

const Main = () => {

    const [showNav, setShowNav] = useState(false)
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get(`${baseUrl}/main/rooms/get`)
        .then((res)=>{
            if(res.status){
                setData(res.data)
            }
        })
    },[])

  return (
    <div>
        <Layout setShowNav={setShowNav} showNav={showNav} component={<Room setData={setData} data={data} setShowNav={setShowNav} showNav={showNav} />} />
    </div>
  )
}

export default Main
