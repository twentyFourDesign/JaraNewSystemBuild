import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { ImCross } from 'react-icons/im'
import { baseUrl } from '../../../../constants/baseurl'

const EditRoom = ({ showRoom, data,setData }) => {
    const [roomData, setroomData] = useState({ title: data.title, price: data.price })


    const submitData = (e) => {
        e.preventDefault()

        axios.put(`${baseUrl}/main/rooms/update/${data._id}`, roomData)
            .then((res) => {
                if (res.status) {
                    toast.success("Room Type Updated")
                    axios.get(`${baseUrl}/main/rooms/get`)
                    .then((res)=>{
                        if(res.status){setData(res.data);showRoom(false)}
                    })
                }
            })
    }
    return (
        <div className='bg-white w-[70%] sm:w-[40%] p-2 rounded-md'>

            <div className='flex justify-between items-center font-robotoFont'>
                <h1>Update Room Type</h1>
                <ImCross onClick={() => showRoom(false)} className='cursor-pointer' />
            </div>

            <input defaultValue={data.title} onChange={(e) => { setroomData({ ...roomData, title: e.target.value }) }} type="text" placeholder='Enter Room Title' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none' />
            <input defaultValue={data.price} onChange={(e) => { setroomData({ ...roomData, price: e.target.value }) }} type="number" placeholder='Enter Room Price' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none' />
            <button onClick={submitData} className='mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800'>Edit Room</button>

        </div>
    )
}

export default EditRoom
