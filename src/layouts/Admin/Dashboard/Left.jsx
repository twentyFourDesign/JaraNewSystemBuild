import React from 'react'
import { navLinks } from '../../../constants/navData'
import JaraLogo from '../../../assets/jaralogo.png'
import { Link } from 'react-router-dom'

const Left = ({ setShowNav, showNav }) => {

  return (

    <div className='font-cursive h-screen overflow-y-auto'>

      {/* WITHOUT RESPONSIVE  */}

      <div className='p-5 w-[17rem] md:block hidden border-r-2 border-solid border-[#e6e7e9]'>

        {/* IMAGE  */}
        <div className='flex justify-center items-center ml-[-10px]'>
          <img src={JaraLogo} alt="" className='h-[4rem]' />
        </div>

        <div className='mt-10'>
          {
            navLinks?.map((item, index) => {
              return (
                <Link to={item.link} key={index + 1} className='flex gap-x-4 items-center cursor-pointer mb-5 text-[#828893] hover:text-[#68b2d7] hover:bg-[#eff6ff]  p-2 rounded-md'>
                  <span className='text-lg'>{item.icons}</span>
                  <p className='text-lg'>{item.title}</p>
                </Link>
              )
            })
          }
        </div>

      </div>

      {/* RESPONSVE SIDE BAR  */}
      {
        showNav && (
          <div className='fixed top-0 left-0 h-screen overflow-y-auto p-5 w-[17rem] md:hidden block border-r-2 border-solid border-[#e6e7e9] z-50 bg-white'>

            {/* IMAGE  */}
            <div className='flex justify-center items-center ml-[-10px]'>
              <img src={JaraLogo} alt="" className='h-[4rem]' />
            </div>

            <div className='mt-10'>
              {
                navLinks?.map((item, index) => {
                  return (
                    <Link to={item.link} key={index + 1} className={`flex gap-x-4 items-center cursor-pointer ${index!==9 &&"mb-3"} text-[#828893] hover:text-[#68b2d7] hover:bg-[#eff6ff]  p-2 rounded-md`}>
                      <span className='text-lg'>{item.icons}</span>
                      <p className='text-lg'>{item.title}</p>
                    </Link>
                  )
                })
              }
            </div>

          </div>
        )
      }

    </div>
  )
}

export default Left
