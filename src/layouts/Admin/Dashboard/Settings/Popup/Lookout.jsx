import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import {baseUrl} from '../../../../../constants/baseurl'
import toast from 'react-hot-toast'

const Lookout = ({setShowPopups,showPopups}) => {

    const [data, setData] = useState({breakfastShell:"",breakfastHorse:"",breakfastFish:"", luchShell:"", luchHorse:"", luchFish:"",dinnerChampagne:"",dinnerRomantic:"",dinnerFish:"",id:""})

    const getData = async ()=>{
        let response = await axios.get(`${baseUrl}/lookout/get`)
        setData({breakfastShell:response.data[0].breakfastShell,breakfastHorse:response.data[0].breakfastHorse,breakfastFish:response.data[0].breakfastFish,luchShell:response.data[0].luchShell,luchFish:response.data[0].luchFish,luchHorse:response.data[0].luchHorse,dinnerChampagne:response.data[0].dinnerChampagne,dinnerRomantic:response.data[0].dinnerRomantic,dinnerFish:response.data[0].dinnerFish,id:response.data[0]._id})
    }

    const onChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        getData()
    },[])

    const create = async()=>{
        let response = await axios.post(`${baseUrl}/lookout/create`,data)
        if(response.status){
            getData()
            toast.success("Lookout Added")
        }
    }

  return (
    <div className='bg-white p-3 w-[80%] sm:w-[60%] md:w-[30%] rounded-md'>

        <div className='flex justify-between items-center w-[100%]'>
            <p>Look Out Experience</p>
            <ImCross className='cursor-pointer' onClick={()=>{setShowPopups({...showPopups,lookout:false})}}/>
        </div>

        <input type="price" defaultValue={data.breakfastShell} name='breakfastShell' placeholder='Breakfast - Shell Package' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2' onChange={(e)=>onChange(e)}/>
        <input type="price" defaultValue={data.breakfastHorse} name='breakfastHorse' placeholder='Breakfast - Seahorse Packag' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2' onChange={(e)=>onChange(e)}/>
        <input type="price" defaultValue={data.breakfastFish} name='breakfastFish' placeholder='Breakfast - Starfish Package' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2' onChange={(e)=>onChange(e)}/>
        
        <input type="price" defaultValue={data.luchShell} name='luchShell' placeholder='Lunch - Shell Package' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2' onChange={(e)=>onChange(e)}/>
        <input type="price" defaultValue={data.luchHorse} name='luchHorse' placeholder='Lunch - Seahorse Package' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2' onChange={(e)=>onChange(e)}/>
        <input type="price" defaultValue={data.luchFish} name='luchFish' placeholder='Lunch - Starfish Packag' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2' onChange={(e)=>onChange(e)}/>

        <input type="price" defaultValue={data.dinnerChampagne} name='dinnerChampagne' placeholder='Dinner - Romantic Beachside (Champagne)' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2' onChange={(e)=>onChange(e)}/>
        <input type="price" defaultValue={data.dinnerRomantic} name='dinnerRomantic' placeholder='Dinner - Romantic Beachside' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2' onChange={(e)=>onChange(e)}/>
        <input type="price" defaultValue={data.dinnerFish} name='dinnerFish' placeholder='Dinner - Starfish Package' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2' onChange={(e)=>onChange(e)}/>

        <button className='mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800' onClick={create}>Submit</button>
      
    </div>
  )
}

export default Lookout