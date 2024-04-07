import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import { baseUrl } from '../../../../../constants/baseurl'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'

const Daypass = ({ setShowPopups, showPopups }) => {

    const [data, setData] = useState({ name: "", description: "", weekDayPrice: "", weekendPrice: "", seasonPrice: "", urgetCharges: "" })
    const [apiData, setapiData] = useState([])

    const getData = async () => {
        let response = await axios.get(`${baseUrl}/option/get`)
        setapiData(response.data)
    }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getData()
    }, [])

    const create = async () => {
        let response = await axios.post(`${baseUrl}/option/create`, data)
        if (response.status) {
            getData()
            toast.success("Option Added")
        }
    }

    const update = async (id) => {
        let response = await axios.put(`${baseUrl}/option/update/${id}`, data)
        if (response.status) {
            getData()
            toast.success("Option Updated")
        }
    }

    const del = async (id) => {
        let response = await axios.delete(`${baseUrl}/option/delete/${id}`)
        if (response.status) {
            getData()
            toast.success("Option Deleted")
        }
    }

    return (

        <div className='bg-white p-3 w-[90%] md:w-[80%] rounded-md overflow-auto h-[40rem]'>

            <div className='flex justify-between items-center w-[100%]'>
                <p>Daypass Options</p>
                <ImCross className='cursor-pointer' onClick={() => { setShowPopups({ ...showPopups, daypass: false }) }} />
            </div>


            <div>
                {
                    apiData?.map((i) => (

                        <>
                            <div className='mt-4 flex justify-between overflow-auto items-center mb-2'>
                                <FaTrash onClick={() => del(i._id)} className='text-red-900 cursor-pointer' />
                                <input onChange={(e) => onChange(e)} name='name' className='w-[15rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300' type="text" defaultValue={i.name} placeholder='Enter Name' />
                                <input onChange={(e) => onChange(e)} name='description' className='w-[10rem h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300' type="text" defaultValue={i.description} placeholder='Enter Description'/>
                                <input onChange={(e) => onChange(e)} name='weekDayPrice' className='w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300' type="number" defaultValue={i.weekDayPrice} placeholder='Enter Week Day Price'/>
                                <input onChange={(e) => onChange(e)} name='weekendPrice' className='w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300' type="number" defaultValue={i.weekendPrice}  placeholder='Enter Weekend Price'/>
                                <input onChange={(e) => onChange(e)} name='seasonPrice' className='w-[10rem] h-[2.3rem] rounded-md px-3 outline-none  mr-2 border border-gray-300' type="number" defaultValue={i.seasonPrice} placeholder='Enter Season Price'/>
                                <input onChange={(e) => onChange(e)} name='urgetCharges' className='w-[10rem] h-[2.3rem] rounded-md px-3 outline-none mr-2 border border-gray-300' type="number" defaultValue={i.urgetCharges} placeholder='Enter Urgent Charges'/>
                                <TiTick className='text-xl text-green-800 cursor-pointer' onClick={() => update(i._id)} />
                            </div>

                            <div className='h-[1px] bg-gray-200 w-[100%]'></div>
                        </>
                    ))
                }
            </div>



            <div className='mt-4 flex justify-between overflow-auto items-center mb-2'>
                <input onChange={(e) => onChange(e)} name='name' className='w-[15rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300' type="text" placeholder='Enter Name' />
                <input onChange={(e) => onChange(e)} name='description' className='w-[10rem h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300' type="text"placeholder='Enter Description'/>
                <input onChange={(e) => onChange(e)} name='weekDayPrice' className='w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300' type="number"placeholder='Enter Week Day Price'/>
                <input onChange={(e) => onChange(e)} name='weekendPrice' className='w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300' type="number" placeholder='Enter Weekend Price'/>
                <input onChange={(e) => onChange(e)} name='seasonPrice' className='w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300' type="number" placeholder='Enter Season Price'/>
                <input onChange={(e) => onChange(e)} name='urgetCharges' className='w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300' type="number" placeholder='Enter Urgent Charges'/>
                <button className='w-[7rem] h-[2rem] font-bold rounded-md text-white font-cursive bg-blue-800' onClick={create}>Create</button>
            </div>



        </div>

    )
}

export default Daypass