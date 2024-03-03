import React, { useState } from 'react'
import Layout from '../Layout'
import Guest from './Guest'

const Main = () => {

    const [showNav, setShowNav] = useState(false)

    return (
        <div>
            <Layout setShowNav={setShowNav} showNav={showNav} component={<Guest setShowNav={setShowNav} showNav={showNav} />} />
        </div>
    )
}

export default Main
