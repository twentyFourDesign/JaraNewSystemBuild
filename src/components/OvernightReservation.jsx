import React from 'react'

const OvernightReservation = () => {
    return (
        <div className='font-robotoFont p-4'>
            <h1 className='text-xl font-bold'>Your Reservation</h1>
            <div className='w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2'></div>

            <div className='mt-3'>
                <h1 className='text-lg font-bold'>Guests</h1>
                <p className='mt-1'>No guest are selected yet.</p>
                <div className='w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2'></div>
            </div>

            <div className='mt-3'>
                <h1 className='text-lg font-bold'>Stay Duration</h1>
                <p className='mt-1'>No days selected yet.</p>
                <div className='w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2'></div>
            </div>


            <div className='mt-3'>
                <h1 className='text-lg font-bold'>Rooms</h1>
                <p className='mt-1'>No rooms are selected yet.</p>
                <div className='w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2'></div>
            </div>

            <div className='mt-3'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-base font-bold'>Sub-total</h1>
                    <h1 className='text-base font-bold'>$0</h1>
                </div>
                <div className='flex justify-between items-center'>
                    <h1 className='text-base font-bold'>Room Discount (%)</h1>
                    <h1 className='text-base font-bold'>0%</h1>
                </div>
            </div>


            <div className='bg-[#F1F5F8] mt-3 h-[6rem] rounded-md shadow-shadow1 p-2 flex justify-center items-start flex-col'>
                <div className='flex justify-between items-center w-[100%]'>
                    <p className='text-sm '>Consumption Tax and VAT (12.5%)</p>
                    <p className='text-sm font-bold'>$0</p>
                </div>
                <div className='flex justify-between items-center mt-3 w-[100%]'>
                    <p className='font-bold text-lg'>Total</p>
                    <p className='font-bold text-lg'>$0</p>
                </div>
            </div>
        </div>
    )
}

export default OvernightReservation
