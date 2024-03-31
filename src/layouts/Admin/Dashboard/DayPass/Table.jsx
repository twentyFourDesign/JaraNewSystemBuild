import React from 'react'

const Table = ({ tr, data }) => {
    const trStyle = "pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider"
    const tdStyle = "p-4 text-sm text-gray-600 whitespace-nowrap text-center border-2 border-[#E9EBED] tracking-wider"

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
                                        <td className={tdStyle}>{item?.name}</td>
                                        <td className={tdStyle}>{item?.email}</td>
                                        <td className={tdStyle}>{item?.mobile}</td>
                                        <td className={tdStyle}>{item?.visitingDate}</td>
                                        <td className={tdStyle}>{item?.optionType}</td>
                                        <td className={tdStyle}>{item?.totalGuest}</td>

                                        {/* <td className={tdStyle}>{!item?.member ? "No" : "Yes"}</td>
                                        <td className={tdStyle}>{!item?.birthdayReminded ? "No" : "Yes"}</td> */}
                                        {/* <td className={tdStyle + ' cursor-pointer'}>More</td> */}
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                ):(
                    <h1 className='flex justify-center items-center h-[100%] text-lg'>NO BOOKING FOUND</h1>
                )
            }
        </div>
    )
}

export default Table
