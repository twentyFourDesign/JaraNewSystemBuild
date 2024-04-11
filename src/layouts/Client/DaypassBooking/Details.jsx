import React, { useState } from 'react'
import OvernightReservation from '../../../components/OvernightReservation'
import OvernightFooter from '../../../components/OvernightFooter'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import OvernightSteps from '../../../components/OvernightSteps'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DaypassSteps from '../../../components/DaypassSteps'
import DaypassReservation from '../../../components/DaypassReservation'
import { insert } from '../../../store/slices/daypassUserInfo.slice'

const Details = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const [userDetails, setuserDetails] = useState({firstname:"",lastname:"",email:"",phone:"",gender:"",para:"",dateOfBirth:""})

    const onSubmit = ()=>{
        dispatch(insert(userDetails))
        nav("/daypass/summary")
    }


    return (
        <div>

            <div className='xl:flex w-screen justify-between items-start bg-[#eff6ff] p-[1rem] font-robotoFont flex-wrap'>

                <div className='flex-1 gap-x-3'>

                    {/* SETPS  */}
                    <div className='w-[100%] flex justify-center items-center'>
                        <div className='w-[100%] lg:w-[90%]'>
                            <DaypassSteps step={3} />
                        </div>
                    </div>

                    {/* MAIN CONTENT  */}
                    <div className='mt-6 lg:mt-10 w-[100%] flex justify-center items-center'>

                        <div className='w-[100%] lg:w-[90%]'>

                            <div className='w-[100%] lg:w-[90%]'>
                                <h1 className='text-xl font-bold '>Your Details</h1>
                                <p className='text-[#606970] text-sm mt-2 w-[100%] lg:w-[80%]'>Please provide full details about the person booking. We request your Identification here to ensure your arrival/ check-in is as smooth and fast as possible. If you have an image file above 5mb, try screenshotting the photo or using an image resizing tool.</p>

                                <div className='mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]'>
                                    <input onChange={(e)=>{setuserDetails({...userDetails,firstname:e.target.value})}} type="text" placeholder='First name' className='flex-1 h-[2.4rem] w-[100%] rounded-md bg-white pl-3 pr-3 outline-none border-2 border-[#C8D5E0]' />
                                    <input onChange={(e)=>{setuserDetails({...userDetails,lastname:e.target.value})}} type="text" placeholder='Last name' className='lg:mt-0 mt-3 flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none' />
                                </div>
                                <div className='mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]'>
                                    <input onChange={(e)=>{setuserDetails({...userDetails,email:e.target.value})}} type="text" placeholder='Email' className='flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 outline-none border-2 border-[#C8D5E0]' />
                                    <input onChange={(e)=>{setuserDetails({...userDetails,phone:e.target.value})}} type="text" placeholder='Phone Number' className='lg:mt-0 mt-3 flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none' />
                                </div>
                                <div className='mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]'>
                                    <input onChange={(e)=>{setuserDetails({...userDetails,gender:e.target.value})}} type='text' placeholder='Gender' className='flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 outline-none border-2 border-[#C8D5E0]' />
                                    <input onChange={(e)=>{setuserDetails({...userDetails,dateOfBirth:e.target.value})}} type="date" placeholder='' className='lg:mt-0 mt-3 flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none' />
                                </div>
                                <textarea type="text" placeholder='State any dietary or setup requirements (i.e baby bathtub or children’s cot)' name="" className=' lg:w-[83%] w-[100%] h-[5rem] rounded-md bg-white outline-none border-2 border-[#C8D5E0] mt-4 resize-none p-4' />
                                <p className='mt-2'>Upload Image [face] identification (i.e. passport, national ID, driver's license) - Max: 5 MB</p>

                                <div className='mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]'>
                                    <input type="file" className='' />
                                    <input onChange={(e)=>{setuserDetails({...userDetails,para:e.target.value})}} type="text" placeholder='How did you hear about us?' className='lg:mt-0 mt-3 flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none' />
                                </div>
                            </div>

                            {/* <div className='w-[100%] lg:w-[90%] mt-4'>
                                <h1 className='text-xl font-bold '>Names of guests</h1>

                                <div className='flex justify-between items-center lg:w-[83%] flex-wrap'>
                                    <p className='text-[#606970] text-sm mt-2'>Please give us some information about your guests.</p>
                                    <button className='min-w-[10rem] sm:mt-0 mt-2 h-[2.4rem] bg-black text-white rounded-md'>Add Guests Info</button>
                                </div>
                            </div> */}

                        </div>

                    </div>


                </div>

                {/* RESERVATION  */}
                <div className='min-w-[18rem] h-[30rem] mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md'>
                    <DaypassReservation />
                </div>
            </div>


            {/* FOOTER  */}
            <div className='w-screen bg-white'>

                <div className='flex justify-between items-center px-7 pt-4'>

                    <div className='flex gap-x-1 items-center text-[#75A9BF] cursor-pointer' onClick={() => nav('/daypass/room-details')}>
                        <MdKeyboardArrowLeft />
                        <p>Back</p>
                    </div>
                    <div>
                        <button onClick={onSubmit} className='w-[10rem] h-[3rem] bg-black text-white rounded-md flex items-center justify-center font-robotoFont'>
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

export default Details
