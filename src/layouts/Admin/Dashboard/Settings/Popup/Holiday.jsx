import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import { baseUrl } from '../../../../../constants/baseurl'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'

const Holiday = ({ setShowPopups, showPopups }) => {

    const [data, setData] = useState({ date: "" })
    const [apiData, setapiData] = useState([])

    const getData = async () => {
        let response = await axios.get(`${baseUrl}/holiday/get`)
        setapiData(response.data)
    }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getData()
    }, [])

    const create = async () => {
        let response = await axios.post(`${baseUrl}/holiday/create`, data)
        if (response.status) {
            getData()
            toast.success("Holiday Added")
        }
    }

    // const update = async (id) => {
    //     let response = await axios.put(`${baseUrl}/drink/update/${id}`, data)
    //     if (response.status) {
    //         getData()
    //         toast.success("Drink Updated")
    //     }
    // }

    const del = async (id) => {
        let response = await axios.delete(`${baseUrl}/holiday/delete/${id}`)
        if (response.status) {
            // getData()
            toast.success("Holiday Deleted")
        }
    }

    return (

        <div className='bg-white p-3 w-[90%] md:w-[50%] rounded-md overflow-auto h-[20rem]'>

            <div className='flex justify-between items-center w-[100%]'>
                <p>Holiday Dates</p>
                <ImCross className='cursor-pointer' onClick={() => { setShowPopups({ ...showPopups, holiday: false }) }} />
            </div>


            <div className='flex justify-center items-center gap-3 flex-wrap'>
                {
                    apiData?.map((i) => (
                        <div className='mt-4 flex justify-between overflow-auto items-center  border border-gray-300 p-1 rounded-md'>
                            <FaTrash onClick={() => del(i._id)} className='text-red-900 cursor-pointer mr-2' />
                            <p>{i?.date}</p>
                        </div>

                    ))
                }
            </div>




            <div className='lg:flex justify-between items-center mt-3 gap-x-3'>
                <input type="date" name='date' placeholder='Enter Date' className='block w-[100%] lg:mt-0 mt-2 lg:flex-1 h-[2.3rem] rounded-md px-3 outline-none border border-gray-300' onChange={(e) => onChange(e)} />
                <button className='w-[100%] lg:w-[7rem] lg:mt-0 mt-2 h-[2rem] font-bold rounded-md text-white font-cursive bg-blue-800' onClick={create}>Create</button>
            </div>

            {/* <input type="text" name='heading' placeholder='Enter Heading' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-4' onChange={(e)=>onChange(e)}/> */}


        </div>

    )
}

export default Holiday