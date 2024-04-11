import React, { useEffect } from 'react'
import OvernightSteps from '../../../components/OvernightSteps'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import OvernightReservation from '../../../components/OvernightReservation'
import { useState } from 'react'
import Extras from '../../../components/Extras'
import axios from 'axios'
import { baseUrl } from '../../../constants/baseurl'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { insert } from '../../../store/slices/overnight/roomDetails.slice'

const RoomDetails = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const [showPopup, setshowPopup] = useState(false)
    const [roomId, setroomId] = useState(null)
    const [modifiedRoom, setModifiedRoom] = useState([])
    const [selectedRooms, setSelectedRooms] = useState([])
    const [quantity, setQuantity] = useState(1);
    const [finalData, setFinalData] = useState([])
    const [selectedDate, setSelectedDate] = useState({ visitDate: "", endDate: "" })

    const incrementQuantity = (maxCapacity) => {
        setQuantity(currentQuantity => currentQuantity < maxCapacity ? currentQuantity + 1 : currentQuantity);
    };

    const decrementQuantity = () => {
        setQuantity(currentQuantity => currentQuantity > 1 ? currentQuantity - 1 : currentQuantity);
    };

    const handleClickSave = (room,price) => {
        setshowPopup(false);
        setroomId(null);
        const existingRoomIndex = selectedRooms.findIndex(selectedRoom => selectedRoom.id === room.id);
        if (existingRoomIndex !== -1) {
            const updatedRooms = selectedRooms.map((selectedRoom, index) => index === existingRoomIndex ? { ...selectedRoom, quantity , price} : selectedRoom);
            setSelectedRooms(updatedRooms);
        }
        else { setSelectedRooms([...selectedRooms, { ...room, quantity , price}]); }
        setQuantity(1);
    };

    useEffect(() => {
        axios.get(`${baseUrl}/main/rooms/sub/get/all`)
            .then((res) => {
                const groupedRooms = res.data.reduce((acc, room) => {
                    const { title, price } = room.roomId;
                    const existingGroup = acc.find(group => group.ref === title);
                    if (existingGroup) {
                        existingGroup.details.push({ title: room.title, booked: room.booked, capacity: room.capacity, id: room._id });
                    }
                    else {
                        acc.push({ ref: title, price: price, details: [{ title: room.title, booked: room.booked, capacity: room.capacity, id: room._id }] });
                    }
                    return acc;
                }, []);
                setModifiedRoom(groupedRooms)
            })
    }, [])

    const handleNext = () => {
        dispatch(insert({selectedRooms,...selectedDate,finalData}))
        nav("/overnight/details")
    }



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

                            <div className='mt-4 flex gap-x-5 items-center sm:flex-row flex-col'>
                                <input onChange={(e) => { setSelectedDate({ ...selectedDate, visitDate: e.target.value }) }} type="date" className='w-[100%] sm:w-[15rem] h-[3rem] sm:mt-0 mt-2 pl-4 pr-4 rounded-md outline-none cursor-pointer text-[#828893]' />
                                <input onChange={(e) => { setSelectedDate({ ...selectedDate, endDate: e.target.value }) }} type="date" className='w-[100%] sm:w-[15rem] h-[3rem] sm:mt-0 mt-2 pl-4 pr-4 rounded-md outline-none cursor-pointer text-[#828893]' />
                            </div>


                            {/* FOR ROOM TYPES  */}

                            <div className='mt-4'>
                                <h1 className='text-lg font-bold '>Which room you are staying in?</h1>
                                <p className='text-[#606970] text-sm mt-1'>Select your desired room type for luxury stay and decide how many people will be in each room.</p>
                            </div>

                            {/* MAIN ROOM TYPES  */}
                            <div className='mt-4'>

                                {
                                    modifiedRoom?.length > 0 && (
                                        modifiedRoom.map((item, index) => (

                                            <div key={index} className='lg:flex gap-x-10 items-center'>
                                                <div>
                                                    <h1 className='text-medium font-bold mt-2  w-[6rem] truncate '>{item?.ref}</h1>
                                                </div>
                                                <div className='flex-1 flex gap-x-3 lg:mt-0 mt-3 flex-wrap'>
                                                    {
                                                        item?.details.map((room, index) => (
                                                            <div className='relative min-w-[8rem] h-[2.4rem] mt-2 flex justify-center flex-wrap items-center bg-white rounded-xl cursor-pointer'>
                                                                <p className='text-sm' onClick={() => { setroomId(room.id), setshowPopup(true) }}>{room.title}</p>
                                                                {
                                                                    (showPopup && roomId === room.id) && (
                                                                        <div className='absolute top-[-9rem] left-[0rem] right-0 w-[13rem] sm:w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50'>
                                                                            <h1>Add/minus your guests</h1>
                                                                            <div className='flex justify-between items-center mt-1'>
                                                                                <div><p className='text-sm'>Capacity: {room.capacity}</p></div>
                                                                                <div className='flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl'>
                                                                                    <AiOutlineMinus className='cursor-pointer' onClick={() => decrementQuantity()} />
                                                                                    <p>{quantity}</p>
                                                                                    <AiOutlinePlus className='cursor-pointer' onClick={() => incrementQuantity(room.capacity)} />
                                                                                </div>
                                                                            </div>
                                                                            <button onClick={() => handleClickSave(room,item.price)} className='mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50'>Save</button>
                                                                        </div>

                                                                    )
                                                                }
                                                            </div>

                                                        ))
                                                    }

                                                </div>
                                            </div>
                                        ))
                                    )
                                }



                            </div>

                            <p className='text-[#606970] text-sm mt-3'>*Available rooms are showing based your selected check-in and check-out dates above.</p>

                            {/* EXTRAS  */}
                            <div>
                                <Extras setFinalData={setFinalData} finalData={finalData} />
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

            <div className='w-screen bg-white'>

                <div className='flex justify-between items-center px-7 pt-4'>

                    <div className='flex gap-x-1 items-center text-[#75A9BF] cursor-pointer' onClick={() => nav("/overnight/guest")}>
                        <MdKeyboardArrowLeft />
                        <p>Back</p>
                    </div>
                    <div>
                        <button onClick={handleNext} className='w-[10rem] h-[3rem] bg-black text-white rounded-md flex items-center justify-center font-robotoFont'>
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

export default RoomDetails
