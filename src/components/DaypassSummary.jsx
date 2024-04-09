import React from 'react'
import {useNavigate } from 'react-router-dom'

const DaypassSummary = () => {
    const nav = useNavigate()


    
    return (
        <div className='font-robotoFont py-4 px-2 h-[100%] relative'>
            <h1 className='text-xl font-bold'>Booking Summary</h1>
            <div className='w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2'></div>


            <div className='flex items-start gap-x-5 mt-10'>
                <input type="checkbox" />
                <p className='text-xs'>Agree with the Booking Terms and Conditions and Proceed to payment.</p>
            </div>

            {/* <div className='mt-3'>
                <h1 className='text-lg font-bold'>Staying Dates</h1>

                <div className='flex justify-between items-center mt-2'>
                    <p className='text-[#606970]'>Check-in</p>
                    <p>18 Feb 2024</p>

                </div>

                <div className='flex justify-between items-center mt-1'>
                    <p className='text-[#606970]'>Check-in</p>
                    <p>18 Feb 2024</p>
                </div>

            </div> */}

            <div className='flex justify-between items-center gap-x-3 mt-4'>
                <input type="text" placeholder='Enter Discount Code / Voucher' name="" className='flex-1 h-[2.3rem] border-2 border-[black] pl-3 pr-3 rounded-md outline-none' />
                <button className='w-[6rem] h-[2.3rem] bg-black text-white rounded-md'>Apply</button>
            </div>

            <div className='absolute bottom-2 w-[96%] '>
                {/* <button className='mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive'>Hold | Bank Trasnfer</button> */}
                <button className='mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive' onClick={()=>nav(`/overnight/confirmation`)}>Confrim</button>
            </div>

        </div>
    )
}

export default DaypassSummary
