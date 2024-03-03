import React, { useState } from 'react'
import downIcon from '../assets/down.svg'
import Extra from '../assets/extra.png'

const Extras = () => {

    const arr = [1, 2, 3, 4, 5, 7, 9, 1111, 7, 9787]
    const [showExtra, setshowExtra] = useState(false)
    return (
        <div className='w-[100%] max-h-[19rem] overflow-y-auto  bg-white rounded-md mt-4 font-robotoFont p-4'>

            <h1 className='text-xl font-bold'>Want to add some Extras</h1>

            <div className='flex justify-between items-center gap-x-4'>
                <h1 className='text-sm mt-3 text-[#606970]'>Here you can book in any extra special experiences.Please select the ones you wish to add to your booking.</h1>
                <img onClick={()=>setshowExtra(!showExtra)} src={downIcon} alt="" className=' cursor-pointer' />
            </div>

            {
                showExtra && (
                    arr?.map((i, index) => (
                        <div key={i+index} className='mt-4 lg:flex justify-between items-center'>
    
                            <div className='lg:flex items-center gap-x-4'>
                                <div>
                                    <img src={Extra} alt="" className='lg:w-fit w-[100%] bg-cover' />
                                </div>
                                <div className='lg:block flex gap-x-3 lt:mt-0 mt-2'>
                                    <p className='text-[#606970]'>Item</p>
                                    <p className='lg:mt-1 mt-0 font-bold'>Extra Item Name</p>
                                </div>
                            </div>
    
                            <div className='lg:block flex gap-x-3 lt:mt-0 mt-2'>
                                <p className='text-[#606970]'>Price</p>
                                <p className='font-bold'>100$</p>
                            </div>
    
                            <div className='lg:mt-0 mt-4'>
                                <button className='w-[8rem] h-[2.4rem] rounded-lg text-white bg-black'>Add Extra</button>
                            </div>
    
    
                        </div>
    
                    ))
                )
            }
            
            


        </div>
    )
}

export default Extras
