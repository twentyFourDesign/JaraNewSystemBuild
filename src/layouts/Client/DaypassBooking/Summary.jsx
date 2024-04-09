import React from 'react'
import OvernightFooter from '../../../components/OvernightFooter'
import DaypassReservation from '../../../components/DaypassReservation'
import DaypassSummary from '../../../components/DaypassSummary'

const Summary = () => {
    return (
        <div>

            <div className='flex w-screen justify-center items-start bg-[#eff6ff] p-[1rem] font-robotoFont flex-wrap gap-x-4'>
                {/* RESERVATION  */}
                <div className='min-w-[100%] sm:min-w-[24rem] sm:w-[24rem] h-[30rem] mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-lg'>
                    <DaypassReservation />
                </div>

                {/* RESERVATION  */}
                <div className='min-w-[100%] sm:min-w-[24rem] sm:w-[24rem] h-[30rem] mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md'>
                    <DaypassSummary />
                </div>

            </div>


            {/* FOOTER  */}
            {/* <OvernightFooter backLink="/daypass/room-details" forwardLink={"/overnight/confirmation"} /> */}

        </div>
    )
}

export default Summary
