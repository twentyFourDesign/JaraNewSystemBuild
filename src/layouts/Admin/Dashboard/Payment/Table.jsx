import axios from 'axios'
import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { baseUrl } from '../../../../constants/baseurl'
import toast from 'react-hot-toast'
const Table = ({ tr, data}) => {
    const trStyle = "pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider"
    const tdStyle = "p-4 text-sm text-gray-600 whitespace-nowrap text-center border-2 border-[#E9EBED] tracking-wider"

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        return formattedDate;
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
                                        <td className={tdStyle}>{item?._id}</td>
                                        <td className={tdStyle}>{item?.name}</td>
                                        <td className={tdStyle}>{item?.amount}</td>
                                        <td className={tdStyle}>{item?.status}</td>
                                        <td className={tdStyle}>{item?.ref}</td>
                                        <td className={tdStyle}>{formatDate(item?.createdAt)}</td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                ) : (
                    <h1 className='flex justify-center items-center h-[100%] text-lg'>NO PAYMENT FOUND</h1>
                )
            }
        </div>
    )
}

export default Table