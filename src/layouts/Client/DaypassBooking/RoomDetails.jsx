import React from 'react'
import { useState } from 'react'
import Extras from '../../../components/Extras'
import DaypassSteps from '../../../components/DaypassSteps'
import DaypassReservation from '../../../components/DaypassReservation'
import { insert } from '../../../store/slices/daypassAvailablity.slice'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'


const RoomDetails = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const [finalData, setFinalData] = useState([])
    const [dayType, setdayType] = useState("weekdays")
    const [availablityInfo, setavailablityInfo] = useState({
        dayType: dayType,
        startDate: "",
        extras: finalData
    })

    const onSubmit = () => {
        setavailablityInfo({...availablityInfo,extras:finalData})
        dispatch(insert({...availablityInfo,extras:[...finalData]}))
        // nav("/daypass/summary")
        nav("/daypass/details")
    }

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

                                <div className='mt-3' >
                                    <input type="date" className='mr-10 w-[100%] lg:mb-0 mb-2 lg:w-[20rem] h-[2.3rem] px-3 rounded-md' onChange={(e) => setavailablityInfo({ ...availablityInfo, startDate: e.target.value })} />
                                    {/* <input type="date" className='lg:w-[20rem] w-[100%]  h-[2.3rem] px-3 rounded-md' onChange={(e) => setavailablityInfo({ ...availablityInfo, endDate: e.target.value })} /> */}
                                </div>
                                {/* <img src={Calender} alt="" className='mt-3' classNameh='h-[5rem]' /> */}
                            </div>

                            {/* EXTRAS  */}
                            <div>
                                <Extras setFinalData={setFinalData} finalData={finalData} type={"daypass"} />
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
            {/* <OvernightFooter backLink="/daypass/guest" forwardLink={"/daypass/summary"} /> */}
            <div className='w-screen bg-white'>

                <div className='flex justify-between items-center px-7 pt-4'>

                    <div className='flex gap-x-1 items-center text-[#75A9BF] cursor-pointer' onClick={() => nav('/daypass/guest')}>
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

export default RoomDetails
