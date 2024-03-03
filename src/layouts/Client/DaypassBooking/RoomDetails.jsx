import React from 'react'
import OvernightSteps from '../../../components/OvernightSteps'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import OvernightFooter from '../../../components/OvernightFooter'
import OvernightReservation from '../../../components/OvernightReservation'
import { useState } from 'react'
import Extras from '../../../components/Extras'
import Calender from '../../../assets/calendar.png'
import DaypassSteps from '../../../components/DaypassSteps'
import DaypassReservation from '../../../components/DaypassReservation'
const RoomDetails = () => {

    const [dayType, setdayType] = useState("weekdays")

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
                            <DaypassSteps step={2} />
                        </div>
                    </div>

                    {/* MAIN CONTENT  */}
                    <div className='mt-6 lg:mt-10 w-[100%] flex justify-start items-center pl-0 lg:pl-[5%]'>


                        <div className=''>
                            <div>
                                <h1 className='text-xl font-bold '>Availability</h1>
                                <p className='text-[#606970] text-sm mt-1'>Are you booking on a weekday (MON-THUR), weekend (FRI-SUN) or Seasonal?</p>
                            </div>
                            {/* FOR CALENDER  */}
                            <div className='mt-4'>

                                <div className='flex gap-x-4 items-center'>
                                    <div onClick={() => setdayType("weekdays")} className='cursor-pointer'>
                                        <p className={`${dayType === "weekdays" ? "text-black border-b-2 border-[#75A9BF]" : "text-[#8F95B2]"}`}>Weekdays</p>
                                    </div>
                                    <div className='cursor-pointer' onClick={() => setdayType("weekends")}>
                                        <p className={`${dayType === "weekends" ? "text-black border-b-2 border-[#75A9BF]" : "text-[#8F95B2]"}`}>Weekends</p>
                                    </div>
                                    <div className='cursor-pointer' onClick={() => setdayType("Seasonal")}>
                                        <p className={`${dayType === "Seasonal" ? "text-black border-b-2 border-[#75A9BF]" : "text-[#8F95B2]"}`}>Seasonal</p>
                                    </div>
                                </div>
                                <img src={Calender} alt="" className='mt-3' classNameh='h-[5rem]' />
                            </div>

                            {/* EXTRAS  */}
                            <div>
                                <Extras />
                            </div>

                        </div>

                    </div>


                </div>


                {/* RESERVATION  */}
                <div className='min-w-[18rem] h-[30rem] mt-10 xl:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md'>
                    <DaypassReservation />
                </div>
            </div>


            {/* FOOTER  */}
            <OvernightFooter backLink="/daypass/guest" forwardLink={"/daypass/summary"} />

        </div>
    )
}

export default RoomDetails
