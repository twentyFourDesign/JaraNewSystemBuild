import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import Daypass from './Daypass'
import axios from 'axios'
import { baseUrl } from '../../../../constants/baseurl'

const Main = () => {

    const [showNav, setShowNav] = useState(false)

    return (
        <div>
            <Layout setShowNav={setShowNav} showNav={showNav} component={<Daypass setShowNav={setShowNav} showNav={showNav} />} />
        </div>
    )
}

export default Main
