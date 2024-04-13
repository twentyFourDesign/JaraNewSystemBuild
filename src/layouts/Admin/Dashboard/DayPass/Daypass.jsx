import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ImCross } from 'react-icons/im'
import Table from './Table'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import { dayPassRow, daypassBookinRow, overNightBookinRow } from '../../../../constants/tableData'
import axios from 'axios'
import { baseUrl } from '../../../../constants/baseurl'
import Table2 from './Table2'

const Daypass = ({ setShowNav, showNav }) => {

  const [searchValue, setSearchValue] = useState("")
  const iconStyle = 'text-[#828893] text-lg cursor-pointer md:hidden block'
  const [data, setData] = useState([])
  const [Type, setType] = useState("overnight")
  const [daypassData, setdaypassData] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/overnight/booking/get/all`)
      .then((res) => {
        setData(res?.data)
      })

    axios.get(`${baseUrl}/daypass/booking/get/all`)
      .then((res) => {
        console.log(res.data,'setdaypassData')
        setdaypassData(res?.data)
      })
  }, [Type])

  return (
    <div className='font-robotoFont w-[100%] overflow-x-auto'>

      {/* HEADER  */}
      <div className='w-[100%] bg-white h-[6rem] flex justify-between items-center p-5 border-b-2 border-solid border-[#e6e7e9]'>
        <h1 className='text-2xl font-medium'>Booking</h1>
        {
          showNav ? <ImCross onClick={() => setShowNav(!showNav)} className={iconStyle} /> : <GiHamburgerMenu onClick={() => setShowNav(!showNav)} className={iconStyle} />
        }
      </div>

      {/* TABLE  */}

      <div className='p-5'>

        <div className='mb-4 block md:flex justify-between items-start'>
          {/* <Input placeholder={"Search booking list ...."} className={"sm:mb-0 mb-2 w-[15rem] h-[3rem] pl-4 pr-4 rounded-md outline-none text-[#828893]"}/> */}
          <div className='flex gap-x-2 items-center md:mb-0 mb-3'>
            <Button onClickFunc={() => setType("overnight")} buttonTitle={"Overnight"} className={`w-[6rem] h-[2rem] text-sm font-bold rounded-md  font-cursive ${Type === "overnight" ? "bg-blue-800 border-none text-white" : "border-2 border-blue-800 text-black"}`} />
            <Button onClickFunc={() => setType("daypass")} buttonTitle={"Day pass"} className={`w-[6rem] h-[2rem] text-sm font-bold rounded-md font-cursive ${Type === "daypass" ? "bg-blue-800 border-none text-white" : "border-2 border-blue-800 text-black"} `} />
          </div>

          <Button buttonTitle={"Export"} className={"w-[10rem] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800"} />
        </div>
        <div>
          {
            Type === "overnight" ?(
              <Table tr={overNightBookinRow} data={data} />
            )
            :(
              <Table2 tr={daypassBookinRow} data={daypassData} />
            )
          }
        </div>
      </div>

    </div>
  )
}

export default Daypass
