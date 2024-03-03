import React from 'react'
import Left from './Left'

const Layout = ({ component,setShowNav,showNav }) => {
    return (
        <div className='flex items-start w-screen h-screen overflow-y-auto'>

            <div className='h-screen overflow-y-auto'>
                <Left setShowNav={setShowNav} showNav={showNav} />
            </div>

            <div className='flex-1 bg-[#eff6ff] h-screen overflow-x-auto'>
                {component}
            </div>

        </div>
    )
}

export default Layout
