

const Table = ({ tr,data}) => {
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
                                        <td className={tdStyle}>{item?.totalGuest?.adults }</td>
                                        <td className={tdStyle}>{item?.totalGuest?.children }</td>
                                        <td className={tdStyle}>{item?.totalGuest?.toddler}</td>
                                        <td className={tdStyle}>{item?.totalGuest?.infants}</td>

                                        <td className={tdStyle}>{item?.bookingDetails?.visitDate}</td>
                                        <td className={tdStyle}>{item?.bookingDetails?.endDate}</td>
                                        
                                        <td className={tdStyle}>
                                            {
                                                item?.bookingDetails?.selectedRooms?.map((i,index)=>(<span key={i?.title}><span>{i.title}</span> <span>-</span> </span>))
                                                
                                            }
                                        </td>


                                        <td className={tdStyle}>
                                            {
                                                item?.bookingDetails?.finalData?.map((i,index)=>(
                                                <span key={index }>
                                                    <span>{i?.key || i?.type || i?.title}</span> 
                                                    <span className="ml-1 mr-1">-</span> 
                                                </span>
                                                ))
                                                
                                            }
                                        </td>


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
