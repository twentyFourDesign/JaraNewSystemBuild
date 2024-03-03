import React from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import OvernightFooter from '../../../components/OvernightFooter'
import DaypassSteps from '../../../components/DaypassSteps'
import DaypassReservation from '../../../components/DaypassReservation'

const Guest = () => {
    return (

        <div>

            <div className='xl:flex w-screen justify-between items-start bg-[#eff6ff] p-[1rem] font-robotoFont flex-wrap'>

                <div className='flex-1 gap-x-3'>

                    {/* SETPS  */}
                    <div className='w-[100%] flex justify-center items-center'>
                        <div className='w-[100%] lg:w-[90%]'>
                            <DaypassSteps step={1} />
                        </div>
                    </div>

                    {/* MAIN CONTENT  */}
                    <div className='mt-6 lg:mt-10 w-[100%] flex justify-center items-center'>

                        <div className='w-[100%] lg:w-[90%]'>
                            <h1 className='text-xl font-bold '>How Many Guest(s)</h1>
                            <p className='text-[#606970] text-sm mt-2 w-[100%] lg:w-[70%]'>Please select the number of guests you want to book for (infants and child, adults (Alcohol / Non-alcohol)). By proceeding you understand your payment is transferable but non-refundable in line with Our terms and conditions.</p>

                            <div className='mt-4'>
                                <h1 className='text-lg font-bold '>Number of adult(s) (Alcoholic)</h1>
                                <div className='flex justify-between items-center w-[100%] lg:w-[80%]'>

                                    <div>
                                        <p className='text-[#606970] mt-2'>Adult Day Pass including Alcoholic Drinks</p>
                                        <p className='text-[#606970] mt-2'>₦45,000</p>
                                    </div>

                                    <div className='flex gap-x-4 items-center'>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlinePlus className='text-white' />
                                        </div>
                                        <div className='w-[5rem] h-[2rem] bg-white flex justify-center items-center rounded-md text-[#9BA6B0]'>1</div>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlineMinus className='text-white' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <h1 className='text-lg font-bold '>Number of adult(s) (Non-Alcoholic)</h1>
                                <div className='flex justify-between items-center w-[100%] lg:w-[80%]'>
                                    <div>
                                        <p className='text-[#606970] mt-2'>Adult Day Pass w/ Soft Drinks</p>
                                        <p className='text-[#606970] mt-2'>₦35,000</p>
                                    </div>                                    <div className='flex gap-x-4 items-center'>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlinePlus className='text-white' />
                                        </div>
                                        <div className='w-[5rem] h-[2rem] bg-white flex justify-center items-center rounded-md text-[#9BA6B0]'>1</div>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlineMinus className='text-white' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <h1 className='text-lg font-bold '>Number of Nanny</h1>
                                <div className='flex justify-between items-center w-[100%] lg:w-[80%]'>
                                    <div>
                                        <p className='text-[#606970] mt-2'>Nanny passes limited to 1 per child, maximum 3 nannies per booking.</p>
                                        <p className='text-[#606970] mt-2'>₦15,000</p>
                                    </div>
                                    <div className='flex gap-x-4 items-center'>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlinePlus className='text-white' />
                                        </div>
                                        <div className='w-[5rem] h-[2rem] bg-white flex justify-center items-center rounded-md text-[#9BA6B0]'>1</div>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlineMinus className='text-white' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <h1 className='text-lg font-bold '>Number of Child</h1>
                                <div className='flex justify-between items-center w-[100%] lg:w-[80%]'>

                                    <div>
                                        <p className='text-[#606970] mt-2'>Aged 6-17 years (or 3 years+ after first FREE Toddler)</p>
                                        <p className='text-[#606970] mt-2'>₦17,500</p>
                                    </div>

                                    <div className='flex gap-x-4 items-center'>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlinePlus className='text-white' />
                                        </div>
                                        <div className='w-[5rem] h-[2rem] bg-white flex justify-center items-center rounded-md text-[#9BA6B0]'>1</div>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlineMinus className='text-white' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>


                </div>


                {/* RESERVATION  */}
                <div className='min-w-[18rem] h-[fit] mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md'>
                    <DaypassReservation />
                </div>
            </div>


            {/* FOOTER  */}
            <OvernightFooter backLink={"/"} forwardLink={"/daypass/room-details"} />

        </div>
    )
}

export default Guest
