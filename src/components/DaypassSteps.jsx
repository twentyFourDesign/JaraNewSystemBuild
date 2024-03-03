import React from 'react'

const DaypassSteps = ({ step }) => {
    let activeStyle = "w-[100%] lg:w-[13rem] h-[4px] rounded-md bg-[#75A9BF] mt-2"
    let nonActiveStyle = "w-[100%] lg:w-[13rem] h-[4px] rounded-md bg-[#C8D5E0]  mt-2"
    return (

        <div className='lg:flex items-center gap-x-4 font-robotoFont w-[100%]'>

            <div className='flex items-center'>

                <div className='w-[100%]'>
                    <h1 className='text-lg'>1: Guest(s) Number</h1>
                    <div className={step === 1 ? activeStyle : nonActiveStyle}></div>
                </div>
                <div className='hidden lg:block w-[6rem] h-[2px] bg-[#C8D5E0]'></div>
            </div>

            <div className='flex items-center mt-2 lg:ml-3 lg:mt-0'>

                <div className='w-[100%]'>
                    <h1 className='text-lg'>2: Select Availability</h1>
                    <div className={step === 2 ? activeStyle : nonActiveStyle}></div>
                </div>
                <div className='hidden lg:block w-[6rem] h-[2px] bg-[#C8D5E0]'></div>
            </div>

            <div className='flex items-center mt-2 lg:ml-3 lg:mt-0'>

                <div className='w-[100%]'>
                    <h1 className='text-lg'>3: Your Info</h1>
                    <div className={step === 3 ? activeStyle : nonActiveStyle}></div>
                </div>
            </div>

        </div>
    )
}

export default DaypassSteps
