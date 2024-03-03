import React, { useState } from 'react'
import Layout from '../Layout'
import Booking from './Booking'

const Main = () => {

    const [showNav, setShowNav] = useState(false)

    return (
        <div>
            <Layout setShowNav={setShowNav} showNav={showNav} component={<Booking setShowNav={setShowNav} showNav={showNav} />} />
        </div>
    )
}

export default Main
