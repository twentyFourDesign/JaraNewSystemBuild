import React from 'react'
import HeaderImage from '../assets/header.png'
import logo from '../assets/jaralogo.png'

const Header = () => {
  return (
    <div>
      <div className='w-screen h-[3rem] bg-[#9DD4D3] flex justify-center items-center'>
        <img src={logo} alt="" className='h-[2rem]' />
      </div>
      <img src={HeaderImage} alt="" className='h-[fit]' />
    </div>
  )
}

export default Header
