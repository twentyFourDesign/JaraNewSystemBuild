import React from 'react'

const Table2 = ({ tr,data}) => {
    const trStyle = "pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider"
    const tdStyle = "p-4 text-sm text-gray-600 whitespace-nowrap text-start border-2 border-[#E9EBED] tracking-wider"
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
                            <tr key={item._id}>
                                <td className={tdStyle}>{item?._id}</td>
                                <td className={tdStyle}>{item?.guestDetails?.firstname + item?.guestDetails?.lastname }</td>
                                <td className={tdStyle}>{item?.guestDetails?.email }</td>
                                <td className={tdStyle}>{item?.guestDetails?.phone }</td>
                                <td className={tdStyle}>{item?.guestDetails?.gender }</td>
                                <td className={tdStyle}>{item?.totalGuest?.adultsAlcoholic}</td>
                                <td className={tdStyle}>{item?.totalGuest?.adultsNonAlcoholic }</td>
                                <td className={tdStyle}>{item?.totalGuest?.Nanny}</td>
                                <td className={tdStyle}>{item?.totalGuest?.childTotal}</td>

                                <td className={tdStyle}>{item?.bookingDetails?.startDate}</td>
                                <td className={tdStyle}>{item?.bookingDetails?.dayType}</td>
                                


                                <td className={tdStyle}>
                                    {
                                        item?.bookingDetails?.extras?.map((i,index)=>(
                                        <span key={index }>
                                            <span>{i?.key || i?.type || i?.title}</span> 
                                            <span className="ml-1 mr-1">-</span> 
                                        </span>
                                        ))
                                        
                                    }
                                </td>



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

export default Table2
