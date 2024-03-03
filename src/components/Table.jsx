import React from 'react'

const Table = ({ tr }) => {
    const trStyle = "pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider"
    const tdStyle = "p-4 text-sm text-gray-600 whitespace-nowrap text-center border-2 border-[#E9EBED] tracking-wider"
    // bg-[#eff6ff]
    const arr = [1, 2, 23, 3, 2, 2, 2, 2, 2, 2, 2, , 2,]
    return (

        <div className='w-full overflow-x-scroll md:overflow-x-auto bg-white h-[25rem] '>
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
                        arr.map((item, index) => (
                            <tr key={index}>
                                <td className={tdStyle}>Wole Michoel</td>
                                <td className={tdStyle}>Male</td>
                                <td className={tdStyle}>wole@mail.com</td>
                                <td className={tdStyle}>03422893234</td>
                                <td className={tdStyle}>2-04-2024</td>
                                <td className={tdStyle}>2-04-2024</td>
                                <td className={tdStyle}>EB22101016103</td>
                                <td className={tdStyle}>No</td>
                                <td className={tdStyle + ' cursor-pointer'}>More</td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>
        </div>
    )
}

export default Table
