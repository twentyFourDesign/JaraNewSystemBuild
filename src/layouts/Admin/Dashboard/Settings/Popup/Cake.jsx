import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import { baseUrl } from '../../../../../constants/baseurl'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'

const Cake = ({ setShowPopups, showPopups }) => {

    const [data, setData] = useState({ title: "", price: "", desc: "" })
    const [apiData, setapiData] = useState([])

    const getData = async () => {
        let response = await axios.get(`${baseUrl}/cake/get`)
        setapiData(response.data)
    }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getData()
    }, [])

    const create = async () => {
        let response = await axios.post(`${baseUrl}/cake/create`, data)
        if (response.status) {
            getData()
            toast.success("Cake Added")
        }
    }

    const update = async (id) => {
        let response = await axios.put(`${baseUrl}/cake/update/${id}`, data)
        if (response.status) {
            getData()
            toast.success("Cake Updated")
        }
    }

    const del = async (id) => {
        let response = await axios.delete(`${baseUrl}/cake/delete/${id}`)
        if (response.status) {
            // getData()
            toast.success("Cake Deleted")
        }
    }

    return (

        <div className='bg-white p-3 w-[90%] md:w-[80%] rounded-md overflow-auto h-[40rem]'>

            <div className='flex justify-between items-center w-[100%]'>
                <p>Cakes</p>
                <ImCross className='cursor-pointer' onClick={() => { setShowPopups({ ...showPopups, cake: false }) }} />
            </div>


            <div>
                {
                    apiData?.map((i) => (

                        <>
                            <div className='mt-4 flex justify-between overflow-auto items-center mb-2'>
                                <FaTrash onClick={() => del(i._id)} className='text-red-900 cursor-pointer' />
                                <input onChange={(e) => onChange(e)} name='title' className='w-[15rem] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300' type="text" defaultValue={i.title} />
                                <input onChange={(e) => onChange(e)} name='desc' className='w-[10rem h-[2.3rem] rounded-md px-3 outline-none border border-gray-300' type="text" defaultValue={i.desc} />
                                <input onChange={(e) => onChange(e)} name='price' className='w-[10rem] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300' type="number" defaultValue={i.price} />
                                <TiTick className='text-xl text-green-800 cursor-pointer' onClick={() => update(i._id)} />
                            </div>

                            <div className='h-[1px] bg-gray-200 w-[100%]'></div>
                        </>
                    ))
                }
            </div>




            <div className='lg:flex justify-between items-center mt-3 gap-x-3'>
                <input type="text" name='title' placeholder='Cake Title' className='block w-[100%] lg:mt-0 mt-2 lg:flex-1 h-[2.3rem] rounded-md px-3 outline-none border border-gray-300' onChange={(e) => onChange(e)} />
                <input type="text" name='desc' placeholder='Cake Description' className='w-[100%] lg:w-[10rem] lg:mt-0 mt-2 block h-[2.3rem] rounded-md px-3 outline-none border border-gray-300' onChange={(e) => onChange(e)} />
                <input type="text" name='price' placeholder='Cake Price' className='w-[100%] lg:w-[10rem] lg:mt-0 mb-2 mt-2 lg:mb-0 block h-[2.3rem] rounded-md px-3 outline-none border border-gray-300' onChange={(e) => onChange(e)} />
                <button className='w-[7rem] h-[2rem] font-bold rounded-md text-white font-cursive bg-blue-800' onClick={create}>Create</button>
            </div>

            {/* <input type="text" name='heading' placeholder='Enter Heading' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-4' onChange={(e)=>onChange(e)}/> */}


        </div>

    )
}

export default Cake
