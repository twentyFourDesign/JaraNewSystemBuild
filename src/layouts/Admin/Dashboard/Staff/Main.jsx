import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import Staff from './Staff'
import axios from 'axios'
import { baseUrl } from '../../../../constants/baseurl'

const Main = () => {

    const [showNav, setShowNav] = useState(false)

    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get(`${baseUrl}/staff/get`)
        .then((res)=>{
            setData(res?.data)
        })
    },[])

    return (
        <div>
            <Layout setShowNav={setShowNav} showNav={showNav} component={<Staff setData={setData} data={data} setShowNav={setShowNav} showNav={showNav} />} />
        </div>
    )
}

export default Main
