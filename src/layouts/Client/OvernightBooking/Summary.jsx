import React from 'react'
import OvernightSteps from '../../../components/OvernightSteps'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import OvernightFooter from '../../../components/OvernightFooter'
import OvernightReservation from '../../../components/OvernightReservation'
import OvernightSummary from '../../../components/OvernightSummary'

const Summary = () => {
    return (
        <div>

            <div className='flex w-screen justify-center items-start bg-[#eff6ff] p-[1rem] font-robotoFont flex-wrap gap-x-4'>
                {/* RESERVATION  */}
                <div className='min-w-[100%] sm:min-w-[24rem] sm:w-[24rem] h-[30rem] mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-lg'>
                    <OvernightReservation />
                </div>

                {/* RESERVATION  */}
                <div className='min-w-[100%] sm:min-w-[24rem] sm:w-[24rem] h-[30rem] mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md'>
                    <OvernightSummary />
                </div>

            </div>


            {/* FOOTER  */}
            {/* <OvernightFooter backLink="/overnight/details" forwardLink={"/overnight/confirmation"} /> */}
        </div>
    )
}

export default Summary
