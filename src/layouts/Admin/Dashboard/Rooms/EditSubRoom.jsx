import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { ImCross } from 'react-icons/im'
import { baseUrl } from '../../../../constants/baseurl'

const EditSubRoom = ({ showRoom, detail, setData }) => {
    const [roomData, setroomData] = useState({ title: detail.title, totalRoom: detail.totalRoom, adults: detail.adult, children: detail.children, toddler: detail.toddler, infant: detail.infant,roomId:detail.roomId})
    const submitData = (e) => {
        e.preventDefault()

        axios.put(`${baseUrl}/main/rooms/sub/update/${detail._id}`, roomData)
            .then((res) => {
                if (res.status) {
                    toast.success("Room Type Updated")
                    axios.get(`${baseUrl}/main/rooms/sub/get/${detail.roomId}`)
                        .then((res) => {
                            if (res.status) { setData(res.data); showRoom(false) }
                        })
                }
            })
    }
    return (
        <div className='bg-white w-[70%] sm:w-[40%] p-2 rounded-md'>

            <div className='flex justify-between items-center font-robotoFont'>
                <h1>Update Room </h1>
                <ImCross onClick={() => showRoom(false)} className='cursor-pointer' />
            </div>

            <input defaultValue={detail.title} onChange={(e) => { setroomData({ ...roomData, title: e.target.value }) }} type="text" placeholder='Room Title' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none' />
            <input defaultValue={detail.totalRoom} onChange={(e) => { setroomData({ ...roomData, capacity: e.target.value }) }} type="number" placeholder='Total Room' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none' />


            <input  defaultValue={detail.adults} onChange={(e) => { setroomData({ ...roomData, adults: e.target.value }) }} type="number" placeholder='Enter Total Adults' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none' />
            <input  defaultValue={detail.children} onChange={(e) => { setroomData({ ...roomData, children: e.target.value }) }} type="number" placeholder='Enter Total Children' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none' />
            <input  defaultValue={detail.toddler} onChange={(e) => { setroomData({ ...roomData, toddler: e.target.value }) }} type="number" placeholder='Enter Total Toodler' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none' />
            <input  defaultValue={detail.infant} onChange={(e) => { setroomData({ ...roomData, infant: e.target.value }) }} type="number" placeholder='Enter Total Infant' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none' />
            <button onClick={submitData} className='mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800'>Update Room</button>

        </div>
    )
}

export default EditSubRoom
