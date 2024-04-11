import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {ImCross} from 'react-icons/im'
import { baseUrl } from '../../../../constants/baseurl'

const CreateSub = ({showRoom,data}) => {
    const [roomData, setroomData] = useState({title:"",capacity:0,roomId:data._id})
    const submitData = (e)=>{
        e.preventDefault()
        if(!roomData.title || !roomData.capacity){
            toast.error("All Fields Are Required")
        }
        else{
            axios.post(`${baseUrl}/main/rooms/sub/create`,{...roomData,availableRoom:roomData.capacity})
            .then((res)=>{
                if(res.status){
                    toast.success("New Room Category Added")
                    showRoom(false)
                }
            })
        }
    }

  return (
    <div className='bg-white w-[70%] sm:w-[40%] p-2 rounded-md'>

        <div className='flex justify-between items-center font-robotoFont'>
            <h1>Create Room Type</h1>
            <ImCross onClick={()=>showRoom(false)} className='cursor-pointer'/>
        </div>

        <input onChange={(e)=>{setroomData({...roomData,title:e.target.value})}} type="text" placeholder='Enter Room Title'className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>{setroomData({...roomData,capacity:e.target.value})}} type="number" placeholder='Enter Room Capacity' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <button onClick={submitData} className='mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800'>Create Room</button>

    </div>
  )
}

export default CreateSub
