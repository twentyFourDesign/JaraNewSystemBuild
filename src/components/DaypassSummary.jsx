import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import {baseUrl} from '../constants/baseurl'
import toast from 'react-hot-toast'
const DaypassSummary = () => {
    const nav = useNavigate()
    const bookingInfo = useSelector(state => state.daypassBookingInfo)
    const availablity = useSelector(state => state.daypassAvailablity)
    const guestInfo = useSelector(state => state.daypassUserInfo)

    const confirmBooking = async()=>{
        let result = await axios.post(`${baseUrl}/daypass/booking/create`,{guestCount:bookingInfo,roomDetails:availablity,guestDetails:guestInfo})
        if(result){
            toast.success("Booking Created")
            nav(`/overnight/confirmation`)
        }
    }


    
    return (
        <div className='font-robotoFont py-4 px-2 h-[100%] relative'>
            <h1 className='text-xl font-bold'>Booking Summary</h1>
            <div className='w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2'></div>


            <div className='flex items-start gap-x-5 mt-10'>
                <input type="checkbox" />
                <p className='text-xs'>Agree with the Booking Terms and Conditions and Proceed to payment.</p>
            </div>


            <div className='flex justify-between items-center gap-x-3 mt-4'>
                <input type="text" placeholder='Enter Discount Code / Voucher' name="" className='flex-1 h-[2.3rem] border-2 border-[black] pl-3 pr-3 rounded-md outline-none' />
                <button className='w-[6rem] h-[2.3rem] bg-black text-white rounded-md'>Apply</button>
            </div>

            <div className='absolute bottom-2 w-[96%] '>
                {/* <button className='mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive'>Hold | Bank Trasnfer</button> */}
                <button className='mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive' onClick={confirmBooking()}>Confrim</button>
            </div>

        </div>
    )
}

export default DaypassSummary
