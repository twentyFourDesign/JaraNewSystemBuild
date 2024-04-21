import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {ImCross} from 'react-icons/im'
import { baseUrl } from '../../../../constants/baseurl'

const CreateSub = ({showRoom,data}) => {

    console.log(data,'data of main room')

    const [roomData, setroomData] = useState({title:"",totalRoom:0,adults:0,children:0,toddler:0,infant:0,roomId:data._id})
    const submitData = (e)=>{
        e.preventDefault()
        console.log(roomData,'roomData')
        if(!roomData.title || !roomData.totalRoom || !roomData.adults  || !roomData.children  || !roomData.infant  || !roomData.toddler){
            toast.error("All Fields Are Required")
            console.log(roomData)
        }
        else{
            axios.post(`${baseUrl}/main/rooms/sub/create`,{...roomData,availableRoom:roomData.totalRoom})
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
            <h1>Create Sub Room</h1>
            <ImCross onClick={()=>showRoom(false)} className='cursor-pointer'/>
        </div>

        <input onChange={(e)=>{setroomData({...roomData,title:e.target.value})}} type="text" placeholder='Enter Room Title'className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>{setroomData({...roomData,totalRoom:e.target.value})}} type="number" placeholder='Enter Total Room In This Category' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>{setroomData({...roomData,adults:e.target.value})}} type="number" placeholder='Enter Total Adults' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>{setroomData({...roomData,children:e.target.value})}} type="number" placeholder='Enter Total Children' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>{setroomData({...roomData,toddler:e.target.value})}} type="number" placeholder='Enter Total Toodler' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>{setroomData({...roomData,infant:e.target.value})}} type="number" placeholder='Enter Total Infant' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>

        <button onClick={submitData} className='mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800'>Create Room</button>

    </div>
  )
}

export default CreateSub
