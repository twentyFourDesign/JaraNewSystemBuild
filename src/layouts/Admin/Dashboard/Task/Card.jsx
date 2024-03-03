import React from 'react'
import { FaTrash } from "react-icons/fa";
const Card = () => {

    const task = [1, 2, 3, 4, 5, 6, 6, 7, 7, 7, 545, 4, 54, 5, 34, 2, 34, 4, 3, 4, 3, 4, 3]
    return (

        <div className='bg-white pt-4 pb-4 h-[25rem] overflow-y-auto min-w-[15rem] rounded-md shadow-shadow2 font-robotoFont'>

            <div className='flex justify-between items-center pl-2 pr-2 border-b-2 border-solid border-[#e6e7e9] pb-2'>
                <h1 className='truncate w-[9rem]'>Task Heading</h1>
                <FaTrash className='text-red-700 cursor-pointer' />
            </div>

            <div className='flex justify-between items-center mt-2 pl-2 pr-2 border-b-2 border-solid border-[#e6e7e9] pb-2'>
                <h1 className='truncate w-[100%]'>Created Date: 17-02-2024</h1>
            </div>

            {/* EACH SINGLE TASK  */}
            <div>
                {
                    task?.map((item,i) => (
                        <div key={item+i} className='flex justify-between items-center mt-2 pl-2 pr-2 border-b-2 border-solid border-[#e6e7e9] pb-2'>
                            <h1 className='truncate w-[100%] text-[#828893]'>{i+1}. Task 1</h1>
                        </div>

                    ))
                }


            </div>

        </div>
    )
}

export default Card
