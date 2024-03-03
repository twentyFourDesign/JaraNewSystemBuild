import React from 'react'
import { ImCross } from 'react-icons/im'
import OverNightImage from '../../assets/overnight.png'
import DayPassImage from '../../assets/daypass.png'
const BookingPopup = ({ setshowPopup, showPopup }) => {
  return (

    <div className='w-[50%] p-3 bg-white rounded-md'>
      <div className='w-[100%] flex justify-end items-end'>
        <ImCross onClick={() => setshowPopup({ show: false, type: "" })} className='cursor-pointer text-[#1C274C]' />
      </div>

      <div className='flex items-center w-[100%]'>

        <div className='flex-1 p-4 mr-2 relative'>
          <img src={OverNightImage} alt="overnight" className='rounded-md' />
          <div className=' absolute bottom-6 left-6'>
            <h1 className=' font-robotoFont text-white text-xl'>Start New Booking</h1>
          </div>
        </div>

        <div className='flex-1 p-4 relative'>
          <img src={DayPassImage} alt="overnight" className='rounded-md' />
          <div className=' absolute bottom-2 left-2'>
            <h1>Start New Booking</h1>
          </div>
        </div>


      </div>
    </div>
  )
}

export default BookingPopup
