import React, {useState } from 'react'
import Layout from '../Layout'
import Setting from './Setting'

const Main = () => {
    const [showNav, setShowNav] = useState(false)
  return (
    <div>
    <Layout setShowNav={setShowNav} showNav={showNav} component={<Setting setShowNav={setShowNav} showNav={showNav} />} />
</div>
  )
}

export default Main
