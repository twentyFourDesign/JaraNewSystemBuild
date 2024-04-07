import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ImCross } from 'react-icons/im'
import Table from './Table'
import Input from '../../../../components/Input'
import {paymentRow } from '../../../../constants/tableData'

const Payment = ({ setShowNav, showNav,data }) => {
    const [searchValue,setSearchValue] = useState("")
    const iconStyle = 'text-[#828893] text-lg cursor-pointer md:hidden block'
  return (
    <div className='font-robotoFont w-[100%] overflow-x-auto'>

      {/* HEADER  */}
      <div className='w-[100%] bg-white h-[6rem] flex justify-between items-center p-5 border-b-2 border-solid border-[#e6e7e9]'>
        <h1 className='text-2xl font-medium'>Payment 💵</h1>
        {
          showNav ? <ImCross onClick={() => setShowNav(!showNav)} className={iconStyle} /> : <GiHamburgerMenu onClick={() => setShowNav(!showNav)} className={iconStyle} />
        }
      </div>

      {/* TABLE  */}

      <div className='p-5'>

        <div className='mb-4 block md:flex justify-between items-start'>
          <Input placeholder={"Search Payment ...."} className={"sm:mb-0 mb-2 w-[15rem] h-[3rem] pl-4 pr-4 rounded-md outline-none text-[#828893]"}/>
        </div>
        <div>
          <Table tr={paymentRow} data={data} />
        </div>
      </div>

    </div>
  )
}

export default Payment
