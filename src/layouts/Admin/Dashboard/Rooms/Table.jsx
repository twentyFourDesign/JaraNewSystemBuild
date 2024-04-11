import React, { useState } from 'react'
import { AiFillEye, AiOutlineEdit } from 'react-icons/ai'
import EditRoom from './EditRoom'
import Button from '../../../../components/Button'
import ShowSub from './ShowSub'
import CreateSub from './CreateSub'

const Table = ({ tr, data, setData }) => {
    const trStyle = "pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider"
    const tdStyle = "p-4 text-sm text-gray-600 whitespace-nowrap  border-2 border-[#E9EBED] tracking-wider"
    const [editRoom, setEditRoom] = useState(false)
    const [roomData, setroomData] = useState(null)

    const [showSub, setShowSub] = useState(false)
    const [addSub, setAddSub] = useState(false)



    const onEdit = (details) => {
        setroomData(details)
        setEditRoom(true)
    }

    const onShow = (details) => {
        setroomData(details)
        setShowSub(true)
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
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td className={tdStyle}>{item?._id}</td>
                                        <td className={tdStyle}>{item?.title}</td>
                                        <td className={tdStyle}>{item?.price}</td>

                                        <td className={tdStyle}>
                                            <div className='flex gap-x-5 items-center'>
                                                <AiFillEye className='cursor-pointer' onClick={() => onShow(item)} />
                                                <AiOutlineEdit className='cursor-pointer' onClick={() => onEdit(item)} />
                                            </div>
                                        </td>

                                        <td className={tdStyle}>
                                            <Button buttonTitle={"Add Sub Room"} onClickFunc={() => {setAddSub(true);setroomData(item)}}
                                                className={" w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800"} />
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                ) : (
                    <h1 className='flex justify-center items-center h-[100%] text-lg'>NO ROOMS FOUND</h1>
                )
            }


            {
                editRoom && (
                    <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50'>
                        <div className='flex justify-center items-center h-screen'>
                            <EditRoom setData={setData} showRoom={setEditRoom} data={roomData} />
                        </div>
                    </div>
                )
            }

            {
                showSub && (
                    <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50'>
                        <div className='flex justify-center items-center h-screen'>
                            <ShowSub showRoom={setShowSub} data={roomData} />
                        </div>
                    </div>
                )
            }

            {
                addSub && (
                    <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50'>
                        <div className='flex justify-center items-center h-screen'>
                            <CreateSub showRoom={setAddSub} data={roomData} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Table
