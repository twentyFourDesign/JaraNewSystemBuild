import React from 'react'
import OvernightSteps from '../../../components/OvernightSteps'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import OvernightFooter from '../../../components/OvernightFooter'
import OvernightReservation from '../../../components/OvernightReservation'
import { useState } from 'react'
import Extras from '../../../components/Extras'
import Calender from '../../../assets/calendar.png'
const RoomDetails = () => {

    const [showPopup, setshowPopup] = useState(false)
    const [roomId, setroomId] = useState(null)

    const handleClickSave = () => {
        setshowPopup(false)
        setroomId(null)
    };

    return (
        <div>

            <div className='xl:flex w-screen justify-between items-start bg-[#eff6ff] p-[1rem] font-robotoFont flex-wrap overflow-x-auto'>

                <div className='w-[100%] lg:w-[70%]  gap-x-3'>

                    {/* SETPS  */}
                    <div className='w-[100%] overflow-x-auto flex justify-center items-center'>
                        <div className='w-[100%] lg:w-[90%]'>
                            <OvernightSteps step={2} />
                        </div>
                    </div>

                    {/* MAIN CONTENT  */}
                    <div className='mt-6 lg:mt-10 w-[100%] flex justify-start items-center pl-0 lg:pl-[5%]'>


                        <div className=''>
                            <div>
                                <h1 className='text-xl font-bold '>Stay & Room Details</h1>
                                <p className='text-[#606970] text-sm mt-1'>Select the check-in and check-out dates you would like to stay (nights you will be sleeping) and your preferred room(s).</p>
                            </div>
                            {/* FOR CALENDER  */}
                            <div className='mt-4'>
                                <h1 className='text-lg font-bold '>How long are you staying?</h1>
                                <p className='text-[#606970] text-sm mt-1'>Select check-in and check-out dates.</p>
                                <img src={Calender} alt="" className='mt-3' classNameh='h-[5rem]' />
                            </div>

                            {/* FOR ROOM TYPES  */}

                            <div className='mt-4'>
                                <h1 className='text-lg font-bold '>Which room you are staying in?</h1>
                                <p className='text-[#606970] text-sm mt-1'>Select your desired room type for luxury stay and decide how many people will be in each room.</p>
                            </div>

                            {/* MAIN ROOM TYPES  */}
                            <div className='mt-4'>

                                <div className='lg:flex gap-x-10 items-center'>
                                    <div>
                                        <h1 className='text-medium font-bold '>Standard (5)</h1>
                                    </div>
                                    <div className='flex-1 flex gap-x-3 lg:mt-0 mt-3'>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(1), setshowPopup(true) }}>Standard Room 2</p>
                                            {
                                                (showPopup && roomId === 1) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(2), setshowPopup(true) }}>Standard Room 3</p>
                                            {
                                                (showPopup && roomId === 2) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(3), setshowPopup(true) }}>Standard Room 4</p>
                                            {
                                                (showPopup && roomId === 3) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(4), setshowPopup(true) }}>Standard Room 5</p>
                                            {
                                                (showPopup && roomId === 4) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                    </div>
                                </div>

                                <div className='lg:flex gap-x-[3.5rem] items-center mt-3'>
                                    <h1 className='text-medium font-bold '>Family (3)</h1>
                                    <div className='flex-1 flex gap-x-3 lg:mt-0 mt-3'>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(9), setshowPopup(true) }}>Standard Room 2</p>
                                            {
                                                (showPopup && roomId === 9) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(10), setshowPopup(true) }}>Standard Room 3</p>
                                            {
                                                (showPopup && roomId === 10) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(11), setshowPopup(true) }}>Standard Room 4</p>
                                            {
                                                (showPopup && roomId === 11) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(12), setshowPopup(true) }}>Standard Room 5</p>
                                            {
                                                (showPopup && roomId === 12) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                    </div>
                                </div>

                                <div className='mt-3 lg:flex gap-x-[4.5rem] items-center'>
                                    <h1 className='text-medium font-bold '>Villa (3)</h1>
                                    <div className='flex-1 flex gap-x-3 lg:mt-0 mt-3'>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(5), setshowPopup(true) }}>Standard Room 2</p>
                                            {
                                                (showPopup && roomId === 5) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(6), setshowPopup(true) }}>Standard Room 3</p>
                                            {
                                                (showPopup && roomId === 6) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(7), setshowPopup(true) }}>Standard Room 4</p>
                                            {
                                                (showPopup && roomId === 7) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(8), setshowPopup(true) }}>Standard Room 5</p>
                                            {
                                                (showPopup && roomId === 8) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                    </div>
                                </div>

                                <div className='lg:flex gap-x-[4.5rem] items-center mt-3'>
                                    <h1 className='text-medium font-bold  '>Loft (2)</h1>
                                    <div className='flex-1 flex gap-x-3 lg:mt-0 mt-3'>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(15), setshowPopup(true) }}>Standard Room 2</p>
                                            {
                                                (showPopup && roomId === 15) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(16), setshowPopup(true) }}>Standard Room 3</p>
                                            {
                                                (showPopup && roomId === 16) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(17), setshowPopup(true) }}>Standard Room 4</p>
                                            {
                                                (showPopup && roomId === 17) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(18), setshowPopup(true) }}>Standard Room 5</p>
                                            {
                                                (showPopup && roomId === 18) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                    </div>
                                </div>

                                <div className='lg:flex gap-x-[3.5rem] items-center mt-3'>
                                    <h1 className='text-medium font-bold '>Studio (2)</h1>
                                    <div className='flex-1 flex gap-x-3 lg:mt-0 mt-3'>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(25), setshowPopup(true) }}>Standard Room 2</p>
                                            {
                                                (showPopup && roomId === 25) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(26), setshowPopup(true) }}>Standard Room 3</p>
                                            {
                                                (showPopup && roomId === 26) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(27), setshowPopup(true) }}>Standard Room 4</p>
                                            {
                                                (showPopup && roomId === 27) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                        <div className='relative min-w-[8rem] h-[2.4rem] flex justify-center items-center bg-white rounded-xl cursor-pointer'>
                                            <p className='text-sm' onClick={() => { setroomId(28), setshowPopup(true) }}>Standard Room 5</p>
                                            {
                                                (showPopup && roomId === 28) && (
                                                    <div className='absolute top-[-9rem] left-[-10rem] w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                        <h1>Add/minus your guests</h1>
                                                        <div className='flex justify-between items-center mt-1'>
                                                            <div><p className='text-sm'>Capacity: 10</p></div>
                                                            <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                <AiOutlineMinus className='cursor-pointer' />
                                                                <p>4</p>
                                                                <AiOutlinePlus className='cursor-pointer' />
                                                            </div>
                                                        </div>
                                                        <button onClick={handleClickSave} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                    </div>

                                                )
                                            }
                                        </div>

                                    </div>
                                </div>


                            </div>

                            <p className='text-[#606970] text-sm mt-3'>*Available rooms are showing based your selected check-in and check-out dates above.</p>

                            {/* EXTRAS  */}
                            <div>
                                <Extras />
                            </div>

                        </div>

                    </div>


                </div>


                {/* RESERVATION  */}
                <div className='min-w-[18rem] h-[30rem] mt-10 xl:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md'>
                    <OvernightReservation />
                </div>
            </div>


            {/* FOOTER  */}
            <OvernightFooter backLink="/overnight/guest" forwardLink={"/overnight/details"} />

        </div>
    )
}

export default RoomDetails
