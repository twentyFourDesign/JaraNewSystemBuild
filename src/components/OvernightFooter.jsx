import React from 'react'
import { MdKeyboardArrowLeft,MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const OvernightFooter = ({backLink,forwardLink}) => {

    const nav = useNavigate()
  return (
    <div className='w-screen bg-white'>

        <div className='flex justify-between items-center px-7 pt-4'>

            <div className='flex gap-x-1 items-center text-[#75A9BF] cursor-pointer' onClick={()=>nav(backLink)}>
                <MdKeyboardArrowLeft/>
                <p>Back</p>
            </div>
            <div>
                <button onClick={()=>nav(forwardLink)} className='w-[10rem] h-[3rem] bg-black text-white rounded-md flex items-center justify-center font-robotoFont'>
                    Continue
                    <MdKeyboardArrowRight className='ml-2 text-lg'/>
                </button>
            </div>
        </div>

        <div className='flex justify-between items-center px-7 mt-3 pb-3'>
            <p>© 2023 JARA BEACH RESORT</p>
            <p>owned and operated by Little Company Nigeria Limited</p>
        </div>

    </div>
  )
}

export default OvernightFooter
