import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {ImCross} from 'react-icons/im'
import { baseUrl } from '../../../../constants/baseurl'

const Popup = ({setshowPopup,setData}) => {
    const [data, setstaffData] = useState({code:"",percentage:"",days:"",expires:"",roomNo:""})

    const submitData = ()=>{
        if(!data.code || !data.percentage || !data.days  || !data.expires || !data.roomNo){
            toast.error("All Fields Are Required")
        }
        else{
            axios.post(`${baseUrl}/discount/create`,data)
            .then((res)=>{
                if(res.status){
                    toast.success("Discount Created")
                    axios.get(`${baseUrl}/discount/get`)
                    .then((res)=>{
                        setData(res?.data)
                    })
                    setTimeout(() => {
                        setshowPopup(false)
                    }, 3000);
                }
            })
        }
    }
  return (

    <div className='p-5 bg-white w-[20rem] rounded-md'>

        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-robotoFont'>Create Discount</h1>
            <ImCross onClick={()=>setshowPopup(false)}/>
        </div>
        <input onChange={(e)=>setstaffData({...data,code:e.target.value})} type="text" name="code" id="" placeholder='Code' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>setstaffData({...data,percentage:e.target.value})} type="text" name="amount" id="" placeholder='Percentage' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>setstaffData({...data,expires:e.target.value})} type="text" name="email" id="" placeholder='Expires' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>setstaffData({...data,roomNo:e.target.value})} type="text" name="startsAt" id="" placeholder='Room No' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>setstaffData({...data,days:e.target.value})} type="text" name="expireAt" id="" placeholder='Days' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <button onClick={submitData} className='mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800'>Create Discount</button>
    </div>
  )
}

export default Popup
