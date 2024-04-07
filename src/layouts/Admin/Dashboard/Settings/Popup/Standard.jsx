import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import {baseUrl} from '../../../../../constants/baseurl'
import toast from 'react-hot-toast'

const Standard = ({setShowPopups,showPopups}) => {

    const [data, setData] = useState({id:"",type:"standard",price:""})

    const getData = async ()=>{
        let response = await axios.get(`${baseUrl}/rooms/get/standard`)
        setData({price:response.data[0].price,id:response.data[0]._id})
    }

    const onChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        getData()
    },[])

    const create = async()=>{
        let response = await axios.post(`${baseUrl}/rooms/create`,data)
        if(response.status){
            getData()
            toast.success("Price Added")
        }
    }

  return (
    <div className='bg-white p-3 w-[80%] sm:w-[60%] md:w-[30%] rounded-md'>

        <div className='flex justify-between items-center w-[100%]'>
            <p>Standard Room</p>
            <ImCross className='cursor-pointer' onClick={()=>{setShowPopups({...showPopups,standard:false})}}/>
        </div>

        <input type="number" defaultValue={data.price} name='price' placeholder='Enter Price' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-4' onChange={(e)=>onChange(e)}/>

        <button className='mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800' onClick={create}>Submit</button>
      
    </div>
  )
}

export default Standard
