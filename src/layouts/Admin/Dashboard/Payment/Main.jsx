import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import Payment from './Payment'
import { baseUrl } from '../../../../constants/baseurl'
import axios from 'axios'

const Main = () => {

    const [showNav, setShowNav] = useState(false)
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get(`${baseUrl}/payment/get`)
        .then((res)=>{
            setData(res?.data)
        })
    },[])

    return (
        <div>
            <Layout setShowNav={setShowNav} showNav={showNav} component={<Payment setData={setData} data={data} setShowNav={setShowNav} showNav={showNav} />} />
        </div>
    )
}

export default Main
