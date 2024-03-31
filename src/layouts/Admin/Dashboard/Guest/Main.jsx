import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import Guest from './Guest'
import axios from 'axios'
import { baseUrl } from '../../../../constants/baseurl'

const Main = () => {

    const [showNav, setShowNav] = useState(false)
    const [guest, setGuest] = useState([])

    useEffect(()=>{
        axios.get(`${baseUrl}/guest/get/all`)
        .then((res)=>{
            if(res.status){
                setGuest(res.data)
            }
        })
    },[])

    return (
        <div>
            <Layout setShowNav={setShowNav} showNav={showNav} component={<Guest guest={guest} setShowNav={setShowNav} showNav={showNav} />} />
        </div>
    )
}

export default Main
