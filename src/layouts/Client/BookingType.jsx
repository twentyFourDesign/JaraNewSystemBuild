import React from 'react'
import JaraLogo from '../../assets/jaralogo.png'
import DayPassImage from '../../assets/daypass.png'
import OverNightImage from '../../assets/overnight.png'
import { useNavigate } from 'react-router-dom'
// import BookingPopup from '../../components/Popup/BookingPopup'

const BookingType = () => {

    const nav = useNavigate()

    return (

        <div className='w-screen h-screen relative bg-[#eff6ff] font-robotoFont'>

            {/* UPPER LOGO  */}
            <div className='flex justify-center items-center h-[12vh] '>
                <img src={JaraLogo} loading='true' alt="jaralogo" className='h-[100%] pt-5' />
            </div>

            {/* MAIN CARDS FOR BOOKING  */}
            <div className='h-[88vh] w-screen flex justify-center items-center lg:flex-row flex-col gap-x-4 overflow-x-auto md:pl-0 md:pr-0 pl-3 pr-3'>


                <div className='h-[24rem] lg:h-[25rem] min:w-[23rem] w-[23rem] relative lg:mb-0 mb-2'>
                    <img src={OverNightImage} alt="logo" className='h-[100%] min:w-[100%] w-[100%] rounded-2xl'/>
                    <div className='absolute bottom-4 pl-4 pr-4'>
                        <h1 className='text-3xl font-bold text-white'>Overnight Bookings</h1>
                        <p className='text-white text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, odio eligendi rerum beatae fuga tempore.</p>
                        <button onClick={()=>nav("/overnight/guest")} className='mt-2 w-[100%] h-[2.4rem] bg-black rounded-md font-cursive text-white'>Start Booking</button>
                    </div>
                </div>

                <div className='h-[24rem] lg:h-[25rem] min:w-[23rem] w-[23rem] relative  lg:mb-0 mb-2'>
                    <img src={DayPassImage} alt="logo" className='h-[100%] w-[100%] min:w-[100%] rounded-2xl'/>
                    <div className='absolute bottom-4 pl-4 pr-4'>
                        <h1 className='text-3xl font-bold text-white'>Daypass Bookings</h1>
                        <p className='text-white text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, odio eligendi rerum beatae fuga tempore.</p>
                        <button onClick={()=>nav("/daypass/guest")} className='mt-2 w-[100%] h-[2.4rem] bg-black rounded-md font-cursive text-white'>Start Booking</button>
                    </div>
                </div>

            </div>

            {/* FOOTER CONTACT  */}
            <div className='absolute bottom-0 left-0 flex justify-between items-center w-screen bg-white text-black font-cursive p-3 text-sm'>
                <p>© 2023 JARA BEACH RESORT</p>
                <p>owned and operated by Little Company Nigeria Limited</p>
            </div>

        </div>
    )
}

export default BookingType
