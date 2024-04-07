import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import {baseUrl} from '../../../../../constants/baseurl'
import toast from 'react-hot-toast'
const Term = ({setShowPopups,showPopups}) => {

    const [data, setData] = useState({heading:"",desc:"",type:"Term",id:""})

    const getData = async ()=>{
        let response = await axios.get(`${baseUrl}/terms/condition/get`)
        setData({heading:response.data[0].heading,desc:response.data[0].desc,type:response.data[0].type,id:response.data[0]._id})
    }

    const onChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        getData()
    },[])

    const create = async()=>{
        let response = await axios.post(`${baseUrl}/terms/condition/create`,data)
        if(response.status){
            getData()
            toast.success("Terms Added")
        }
    }

  return (
    <div className='bg-white p-3 w-[80%] sm:w-[60%] md:w-[30%] rounded-md'>

        <div className='flex justify-between items-center w-[100%]'>
            <p>Terms & Conditions</p>
            <ImCross className='cursor-pointer' onClick={()=>{setShowPopups({...showPopups,term:false})}}/>
        </div>

        <input type="text" defaultValue={data.heading} name='heading' placeholder='Enter Heading' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-4' onChange={(e)=>onChange(e)}/>
        <textarea type="text" name='desc' defaultValue={data.desc} placeholder='Enter Desc' className='w-[100%] h-[5rem] rounded-md p-3 outline-none border border-gray-300 mt-4 resize-none' onChange={(e)=>onChange(e)}/>

        <button className='mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800' onClick={create}>Submit</button>
      
    </div>
  )
}

export default Term
