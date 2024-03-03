import React, { useState } from 'react'
import Layout from '../Layout'
import Task from './Task'

const Main = () => {

    const [showNav, setShowNav] = useState(false)

    return (
        <div>
            <Layout setShowNav={setShowNav} showNav={showNav} component={<Task setShowNav={setShowNav} showNav={showNav} />} />
        </div>
    )
}

export default Main
