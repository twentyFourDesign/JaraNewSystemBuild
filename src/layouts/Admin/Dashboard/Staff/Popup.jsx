import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {ImCross} from 'react-icons/im'
import { baseUrl } from '../../../../constants/baseurl'

const Popup = ({setshowPopup,setData}) => {
    const [staffData, setstaffData] = useState({firstname:"",lastname:"",email:"",mobile:"",gender:""})

    const submitData = ()=>{
        if(!staffData.firstname || !staffData.lastname || !staffData.email || !staffData.mobile || !staffData.gender){
            toast.error("All Fields Are Required")
        }
        else{
            axios.post(`${baseUrl}/staff/create`,staffData)
            .then((res)=>{
                if(res.status){
                    toast.success("Staff Created")
                    axios.get(`${baseUrl}/staff/get`)
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
            <h1 className='text-lg font-robotoFont'>Create Staff</h1>
            <ImCross onClick={()=>setshowPopup(false)}/>
        </div>
        <input onChange={(e)=>setstaffData({...staffData,firstname:e.target.value})} type="text" name="firstname" id="" placeholder='First Name' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>setstaffData({...staffData,lastname:e.target.value})} type="text" name="lastname" id="" placeholder='Last Name' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>setstaffData({...staffData,email:e.target.value})} type="text" name="email" id="" placeholder='Email Name' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>setstaffData({...staffData,mobile:e.target.value})} type="text" name="mobile" id="" placeholder='Mobile Number' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <input onChange={(e)=>setstaffData({...staffData,gender:e.target.value})} type="text" name="gener" id="" placeholder='Gender' className='w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none'/>
        <button onClick={submitData} className='mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800'>Create Staff</button>
    </div>
  )
}

export default Popup
