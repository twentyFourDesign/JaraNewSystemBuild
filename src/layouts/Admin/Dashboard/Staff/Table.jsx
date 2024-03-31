import axios from 'axios'
import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
import { baseUrl } from '../../../../constants/baseurl'
import toast from 'react-hot-toast'
const Table = ({ tr, data,setData}) => {
    const trStyle = "pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider"
    const tdStyle = "p-4 text-sm text-gray-600 whitespace-nowrap text-center border-2 border-[#E9EBED] tracking-wider"

    const deleteStaff =(id)=>{
        axios.delete(`${baseUrl}/staff/delete/${id}`)
        .then((res)=>{
            if(res.status){
                axios.get(`${baseUrl}/staff/get`)
                .then((res)=>{
                    setData(res?.data)
                })
                toast.success("Staff Deleted")
            }
        })
    }
    return (

        <div className='w-full overflow-x-scroll md:overflow-x-auto bg-white h-[25rem] '>
            {
                data?.length > 0 ? (
                    <table className='w-full'>

                        <thead >
                            <tr className=''>
                                {
                                    tr?.map((item, index) => (<th key={index + 100} className={trStyle}>{item.title}</th>))
                                }
                            </tr>
                        </thead>

                        <tbody>
                            {
                                data?.map((item, index) => (
                                    <tr key={index}>
                                        <td className={tdStyle}>{item?.firstname}</td>
                                        <td className={tdStyle}>{item?.lastname}</td>
                                        <td className={tdStyle}>{item?.gender}</td>
                                        <td className={tdStyle}>{item?.email}</td>
                                        <td className={tdStyle}>{item?.mobile}</td>
                                        <td className={tdStyle}><AiFillDelete onClick={()=>deleteStaff(item._id)}/></td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                ):(
                    <h1 className='flex justify-center items-center h-[100%] text-lg'>NO STAFF FOUND</h1>
                )
            }
        </div>
    )
}

export default Table
