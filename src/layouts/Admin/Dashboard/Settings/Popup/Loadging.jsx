import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import {baseUrl} from '../../../../../constants/baseurl'
import toast from 'react-hot-toast'

const Loadging = ({setShowPopups,showPopups}) => {
    const [data, setData] = useState({driver:"",nany:"",id:""})

    const getData = async ()=>{
        let response = await axios.get(`${baseUrl}/loadging/get`)
        setData({driver:response.data[0].driver,nany:response.data[0].nany,id:response.data[0]._id})
    }

    const onChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        getData()
    },[])

    const create = async()=>{
        let response = await axios.post(`${baseUrl}/loadging/create`,data)
        if(response.status){
            getData()
            toast.success("Loadging Added")
        }
    }
  return (
    <div className='bg-white p-3 w-[80%] sm:w-[60%] md:w-[30%] rounded-md'>

        <div className='flex justify-between items-center w-[100%]'>
            <p>Staff Loadging</p>
            <ImCross className='cursor-pointer' onClick={()=>{setShowPopups({...showPopups,loadging:false})}}/>
        </div>

        <input type="number" defaultValue={data.driver} name='driver' placeholder='Enter Driver' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-4' onChange={(e)=>onChange(e)}/>
        <input type="number" name='nany' defaultValue={data.nany} placeholder='Enter Nany' className='w-[100%] h-[2.3rem] rounded-md p-3 outline-none border border-gray-300 mt-4 resize-none' onChange={(e)=>onChange(e)}/>

        <button className='mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800' onClick={create}>Submit</button>
      
    </div>
  )
}

export default Loadging
