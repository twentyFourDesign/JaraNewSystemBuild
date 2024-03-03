import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ImCross } from 'react-icons/im'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import Card from './Card'

const Task = ({ setShowNav, showNav }) => {

  const [searchValue,setSearchValue] = useState("")
  const iconStyle = 'text-[#828893] text-lg cursor-pointer md:hidden block'

  return (
    <div className='font-robotoFont w-[100%] overflow-x-auto'>

      {/* HEADER  */}
      <div className='w-[100%] bg-white h-[6rem] flex justify-between items-center p-5 border-b-2 border-solid border-[#e6e7e9]'>
        <h1 className='text-2xl font-medium'>Tasks ✅</h1>
        {
          showNav ? <ImCross onClick={() => setShowNav(!showNav)} className={iconStyle} /> : <GiHamburgerMenu onClick={() => setShowNav(!showNav)} className={iconStyle} />
        }
      </div>

      {/* TASK CARD  */}

      <div className='p-5'>

        <div className='mb-4 block md:flex justify-between items-start'>
          <Input placeholder={"Search task list ...."} className={"sm:mb-0 mb-2 w-[15rem] h-[3rem] pl-4 pr-4 rounded-md outline-none text-[#828893]"}/>
          <Button buttonTitle={"Create New Task"} className={"w-[11rem] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800"}/>
        </div>

        <div className='flex gap-x-3 items-start overflow-x-auto p-2'>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>

      </div>

    </div>
  )
}

export default Task
