import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import Discount from './Discount'
import axios from 'axios'
import { baseUrl } from '../../../../constants/baseurl'

const Main = () => {

    const [showNav, setShowNav] = useState(false)
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get(`${baseUrl}/daypass/discount/get`)
        .then((res)=>{
            setData(res?.data)
        })
    },[])

    return (
        <div>
            <Layout setShowNav={setShowNav} showNav={showNav} component={<Discount setData={setData} data={data} setShowNav={setShowNav} showNav={showNav} />} />
        </div>
    )
}

export default Main
