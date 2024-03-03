import React, { useState } from 'react'
import Layout from '../Layout'
import Staff from './Staff'

const Main = () => {

    const [showNav, setShowNav] = useState(false)

    return (
        <div>
            <Layout setShowNav={setShowNav} showNav={showNav} component={<Staff setShowNav={setShowNav} showNav={showNav} />} />
        </div>
    )
}

export default Main
