import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {ImCross} from 'react-icons/im'
import { baseUrl } from '../../../../constants/baseurl'

const CreateRoom = ({setCreateRoom,setData}) => {
    const [roomData, setroomData] = useState({title:"",price:0})
    const submitData = (e)=>{
        e.preventDefault()
        if(!roomData.title || !roomData.price){
            toast.error("All Fields Are Required")
        }
        else{
            axios.post(`${baseUrl}/main/rooms/create`,roomData)
            .then((res)=>{
                if(res.status){
                    toast.success("New Room Type Added")
                    axios.get(`${baseUrl}/main/rooms/get`)
                    .then((res)=>{
                        if(res.status){setData(res.data);setCreateRoom(false)}
                    })
                }
            })
        }
    }
  return (
    <div className='bg-white w-[70%] sm:w-[40%] p-2 rounded-md'>

        <div className='flex justify-between items-center font-robotoFont'>
            <h1>Create Room</h1>
            <ImCross onClick={()=>setCreateRoom(false)} className='cursor-pointer'/>
        </div>

        <input onChange={(e)=>{setroomData({...roomData,title:e.target.value})}} type="text" placeholder='Enter Room Title'className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>{setroomData({...roomData,price:e.target.value})}} type="number" placeholder='Enter Room Price' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        
        <button onClick={submitData} className='mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800'>Create Room</button>

    </div>
  )
}

export default CreateRoom
