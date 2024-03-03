import React from 'react'
import OvernightFooter from '../../../components/OvernightFooter'
import Thumbs from '../../../assets/confirm.png'
import Insta from '../../../assets/Instagram.svg'
import Fb from '../../../assets/fb.svg'
import { useNavigate } from 'react-router-dom'

const Confirmation = () => {
    const nav = useNavigate()
    return (


        <div className=' bg-[#eff6ff] font-robotoFont'>


            <div className='flex justify-center items-center'>
                <div className=' w-[97%] sm:w-[70%] h-fit bg-white mt-4 mb-4 rounded-lg pb-4'>

                    <div className='flex justify-center items-center'>
                        <img src={Thumbs} alt="" className='h-[12rem]' />
                    </div>

                    <h1 className='text-2xl font-bold text-center mt-2'>Thanks John!</h1>
                    <p className='text-[#606970] text-center mt-2'>Your booking is done successfully. We’ve sent an email with all booking details and invoice.</p>

                    <div className='flex justify-center items-center gap-x-4 mt-4'>
                        <p className='text-[#0F93F8] border-b-2 border-[#0F9EF8] sm:text-base text-sm'>GENERAL FAQS</p>
                        <p className='text-[#0F93F8] border-b-2 border-[#0F9EF8] sm:text-base text-sm'>MENUS</p>
                        <p className='text-[#0F93F8] border-b-2 border-[#0F9EF8] sm:text-base text-sm'>VISITING WITH CHILDREN</p>
                    </div>
                    <h1 className='text-xl font-bold text-center mt-5'>Connect Socially</h1>

                    <div className='flex justify-center items-center gap-x-4 mt-4'>
                        <img src={Insta} alt="" className='h-[2rem]' />
                        <img src={Fb} alt="" className='h-[2rem]' />
                    </div>
                </div>
            </div>


            <div className='sm:flex justify-center items-center gap-x-4 mb-4 ml-2 mr-2'>
                <button onClick={()=>nav("/")} className='w-[100%] sm:w-[13rem] h-[2.4rem] bg-black text-white rounded-md cursor-pointer font-robotoFont'>Make an other booking</button>
                <button onClick={()=>nav("/")} className='w-[100%] sm:mt-0 mt-3 sm:w-[13rem] h-[2.4rem] bg-black text-white rounded-md cursor-pointer font-robotoFont'>Go to Website</button>
            </div>



            <OvernightFooter backLink="/overnight/summary" forwardLink={"/"} />
        </div>
    )
}

export default Confirmation
