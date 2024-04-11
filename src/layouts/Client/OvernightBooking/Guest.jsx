import React, { useState } from 'react'
import OvernightSteps from '../../../components/OvernightSteps'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import OvernightReservation from '../../../components/OvernightReservation'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import {useDispatch} from 'react-redux'
import { insert } from '../../../store/slices/overnight/overnightGuest.slice'
const Guest = () => {

    const [guestNumber, setguestNumber] = useState({ adults: 0, children: 0, toddler: 0, infants: 0 })
    const nav = useNavigate()
    const dispatch = useDispatch()

    const onNext = () => {
        dispatch(insert(guestNumber))
        nav("/overnight/room-details")
    }

    return (

        <div>

            <div className='xl:flex w-screen justify-between items-start bg-[#eff6ff] p-[1rem] font-robotoFont flex-wrap'>

                <div className='flex-1 gap-x-3'>

                    {/* SETPS  */}
                    <div className='w-[100%] flex justify-center items-center'>
                        <div className='w-[100%] lg:w-[90%]'>
                            <OvernightSteps step={1} />
                        </div>
                    </div>

                    {/* MAIN CONTENT  */}
                    <div className='mt-6 lg:mt-10 w-[100%] flex justify-center items-center'>

                        <div className='w-[100%] lg:w-[90%]'>
                            <h1 className='text-xl font-bold '>How Many Guest(s)</h1>
                            <p className='text-[#606970] text-sm mt-2 w-[100%] lg:w-[70%]'>Please select the number of guests you want to book for (infants and toddlers included). By proceeding you understand your payment is transferable but non-refundable in line with Our terms and conditions.</p>

                            <div className='mt-4'>
                                <h1 className='text-lg font-bold '>Number of adult(s)</h1>
                                <div className='flex justify-between items-center w-[100%] lg:w-[80%]'>
                                    <p className='text-[#606970] mt-2 w-[70%]'>Age above 17 years</p>
                                    <div className='flex gap-x-4 items-center'>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlinePlus onClick={() => setguestNumber({ ...guestNumber, adults: guestNumber.adults + 1 })} className='text-white' />
                                        </div>
                                        <div className='w-[5rem] h-[2rem] bg-white flex justify-center items-center rounded-md text-[#9BA6B0]'>{guestNumber.adults}</div>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlineMinus onClick={() => setguestNumber({ ...guestNumber, adults: guestNumber.adults > 0 ? guestNumber.adults - 1 : guestNumber.adults })} className='text-white' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <h1 className='text-lg font-bold '>Number of child(ren)</h1>
                                <div className='flex justify-between items-center w-[100%] lg:w-[80%]'>
                                    <p className='text-[#606970] mt-2 w-[70%]'>Age 4-17 years</p>
                                    <div className='flex gap-x-4 items-center'>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlinePlus onClick={() => setguestNumber({ ...guestNumber, children: guestNumber.children + 1 })} className='text-white' />
                                        </div>
                                        <div className='w-[5rem] h-[2rem] bg-white flex justify-center items-center rounded-md text-[#9BA6B0]'>{guestNumber.children}</div>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlineMinus onClick={() => setguestNumber({ ...guestNumber, children: guestNumber.children > 0 ? guestNumber.children - 1 : guestNumber.children })} className='text-white' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <h1 className='text-lg font-bold '>Number of Toddler(s)</h1>
                                <div className='flex justify-between items-center w-[100%] lg:w-[80%]'>
                                    <p className='text-[#606970] mt-2 w-[70%]'>Age 1-3 years</p>
                                    <div className='flex gap-x-4 items-center'>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlinePlus onClick={() => setguestNumber({ ...guestNumber, toddler: guestNumber.toddler + 1 })} className='text-white' />
                                        </div>
                                        <div className='w-[5rem] h-[2rem] bg-white flex justify-center items-center rounded-md text-[#9BA6B0]'>{guestNumber.toddler}</div>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlineMinus onClick={() => setguestNumber({ ...guestNumber, toddler: guestNumber.toddler > 0 ? guestNumber.toddler - 1 : guestNumber.toddler })} className='text-white' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <h1 className='text-lg font-bold '>Number of infant(s)</h1>
                                <div className='flex justify-between items-center w-[100%] lg:w-[80%]'>
                                    <p className='text-[#606970] mt-2 w-[70%]'>Age 0-1 year</p>
                                    <div className='flex gap-x-4 items-center'>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlinePlus onClick={() => setguestNumber({ ...guestNumber, infants: guestNumber.infants + 1 })} className='text-white' />
                                        </div>
                                        <div className='w-[5rem] h-[2rem] bg-white flex justify-center items-center rounded-md text-[#9BA6B0]'>{guestNumber.infants}</div>
                                        <div className='w-[2rem] h-[2rem] bg-black flex justify-center items-center rounded-md cursor-pointer'>
                                            <AiOutlineMinus onClick={() => setguestNumber({ ...guestNumber, infants: guestNumber.infants > 0 ? guestNumber.infants - 1 : guestNumber.infants })} className='text-white' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>


                </div>


                {/* RESERVATION  */}
                <div className='min-w-[18rem] h-[30rem] mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md'>
                    <OvernightReservation />
                </div>
            </div>


            {/* FOOTER  */}
            <div className='w-screen bg-white'>

                <div className='flex justify-between items-center px-7 pt-4'>

                    <div className='flex gap-x-1 items-center text-[#75A9BF] cursor-pointer' onClick={() => nav("/")}>
                        <MdKeyboardArrowLeft />
                        <p>Back</p>
                    </div>
                    <div>
                        <button onClick={onNext} className='w-[10rem] h-[3rem] bg-black text-white rounded-md flex items-center justify-center font-robotoFont'>
                            Continue
                            <MdKeyboardArrowRight className='ml-2 text-lg' />
                        </button>
                    </div>
                </div>

                <div className='flex justify-between items-center px-7 mt-3 pb-3'>
                    <p>© 2023 JARA BEACH RESORT</p>
                    <p>owned and operated by Little Company Nigeria Limited</p>
                </div>

            </div>

        </div>
    )
}

export default Guest
