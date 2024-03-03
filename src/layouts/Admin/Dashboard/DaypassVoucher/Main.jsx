import React, { useState } from 'react'
import Layout from '../Layout'
import Voucher from './Voucher'

const Main = () => {

    const [showNav, setShowNav] = useState(false)

    return (
        <div>
            <Layout setShowNav={setShowNav} showNav={showNav} component={<Voucher setShowNav={setShowNav} showNav={showNav} />} />
        </div>
    )
}

export default Main
