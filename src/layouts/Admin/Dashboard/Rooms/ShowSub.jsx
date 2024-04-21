import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ImCross } from 'react-icons/im'
import { baseUrl } from '../../../../constants/baseurl'
import { FaTrash } from 'react-icons/fa'
import { AiOutlineEdit } from 'react-icons/ai'
import EditSubRoom from './EditSubRoom'

const ShowSub = ({ showRoom, data }) => {

    const trStyle = "pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider"
    const tdStyle = "p-4 text-sm text-gray-600 whitespace-nowrap  border-2 border-[#E9EBED] tracking-wider"

    const [rooms, setRooms] = useState([])

    const [showRooms, setShowrooms] = useState(false)
    const [detail, setDetail] = useState(null)

    useEffect(() => {
        axios.get(`${baseUrl}/main/rooms/sub/get/${data._id}`)
            .then((res) => {
                if (res.status) {
                    setRooms(res.data)
                }
            })
    }, [])

    const onEdit = (details) => {
        setShowrooms(true)
        setDetail(details)
    }

    const onDelete = (id) => {
        axios.delete(`${baseUrl}/main/rooms/sub/delete/${id}`)
            .then((res) => {
                toast.success("Room Deleted")
                axios.get(`${baseUrl}/main/rooms/sub/get/${data._id}`)
                    .then((res) => {
                        if (res.status) {
                            setRooms(res.data)
                        }
                    })
            })
    }

    return (
        <div className='bg-white w-[90%] p-2 rounded-md h-[20rem] overflow-scroll'>
            <div className='flex justify-between items-center font-robotoFont'>
                <h1 className='text-lg'>View Sub Rooms</h1>
                <ImCross onClick={() => showRoom(false)} className='cursor-pointer' />
            </div>

            {
                rooms?.length > 0 ? (
                    <table className='w-full mt-2'>

                        <thead >
                            <tr className=''>
                                <th className={trStyle}>Room Id</th>
                                <th className={trStyle}>Room Name</th>
                                <th className={trStyle}>Total Rooms</th>
                                <th className={trStyle}>Available Rooms</th>
                                <th className={trStyle}>Adults</th>
                                <th className={trStyle}>Children</th>
                                <th className={trStyle}>Toodler</th>
                                <th className={trStyle}>Infants</th>
                                <th className={trStyle}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                rooms?.map((item, index) => (
                                    <tr key={index}>
                                        <td className={tdStyle}>{item?.roomId}</td>
                                        <td className={tdStyle}>{item?.title}</td>
                                        <td className={tdStyle}>{item?.totalRoom}</td>
                                        <td className={tdStyle}>{item?.availableRoom}</td>

                                        <td className={tdStyle}>{item?.adults}</td>
                                        <td className={tdStyle}>{item?.children}</td>
                                        <td className={tdStyle}>{item?.toddler}</td>
                                        <td className={tdStyle}>{item?.infant}</td>

                                        <td className={tdStyle}>
                                            <div className='flex gap-x-5 items-center'>
                                                <AiOutlineEdit className='cursor-pointer' onClick={() => onEdit(item)} />
                                                <FaTrash className='cursor-pointer' onClick={() => onDelete(item._id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                ) : (
                    <h1 className='flex justify-center items-center h-[100%] text-lg'>NO ROOMS ADDED IN THIS CATEGORY</h1>
                )
            }

            {
                showRooms && (
                    <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50'>
                        <div className='flex justify-center items-center h-screen'>
                            <EditSubRoom showRoom={setShowrooms} detail={detail} setData={setRooms} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ShowSub
