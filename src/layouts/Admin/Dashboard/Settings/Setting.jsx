import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ImCross } from 'react-icons/im'
import Term from './Popup/Term'
import Villa from './Popup/Villa'
import Loft from './Popup/Loft'
import Family from './Popup/Family'
import Standard from './Popup/Standard'
import Studio from './Popup/Studio'
import Lookout from './Popup/Lookout'
import Massage from './Popup/Massage'
import Loadging from './Popup/Loadging'
import Cake from './Popup/Cake'
import Daypass from './Popup/Daypass'
import Personalize from './Popup/Personalize'
import Riding from './Popup/Riding'
import Drink from './Popup/Drink'
import Holiday from './Popup/Holiday'
import BlockDaypass from './Popup/BlockDaypass'
import Disable from './Popup/Disable'

const Setting = ({ setShowNav, showNav }) => {
    const iconStyle = 'text-[#828893] text-lg cursor-pointer md:hidden block'

    const [showPopups, setShowPopups] = useState(
        {
            term: false, villa: false, loft: false, family: false, standard: false, studio: false, lookout: false, massage: false, loadging: false, cake: false, daypass: false, personalize: false, riding: false, drink: false, holiday: false, blocked: false,disable:false
        }
    )

    return (
        <div className='font-robotoFont w-[100%] overflow-x-auto'>

            {/* HEADER  */}
            <div className='w-[100%] bg-white h-[6rem] flex justify-between items-center p-5 border-b-2 border-solid border-[#e6e7e9]'>
                <h1 className='text-2xl font-medium'>Settings 🎡</h1>
                {
                    showNav ? <ImCross onClick={() => setShowNav(!showNav)} className={iconStyle} /> : <GiHamburgerMenu onClick={() => setShowNav(!showNav)} className={iconStyle} />
                }
            </div>


            {/* CARDS  */}

            <div className='flex justify-center items-center flex-1 w-full h-[80vh]'>

                <div className='bg-white p-4 w-[100%] lg:w-[70%] ml-5 mr-5 rounded-md flex justify-center md:justify-start items-center gap-2 flex-wrap'>

                    <div onClick={() => setShowPopups({ ...showPopups, term: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p className='text-sm'>Term & Condition</p>
                    </div>

                    <div onClick={() => setShowPopups({ ...showPopups, villa: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Villa Room</p>
                    </div>

                    <div onClick={() => setShowPopups({ ...showPopups, loft: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>The Loft</p>
                    </div>

                    <div onClick={() => setShowPopups({ ...showPopups, family: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Family Room</p>
                    </div>

                    <div onClick={() => setShowPopups({ ...showPopups, standard: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Standard Room</p>
                    </div>

                    <div onClick={() => setShowPopups({ ...showPopups, studio: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Studio Room</p>
                    </div>


                    <div onClick={() => setShowPopups({ ...showPopups, lookout: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Lookout Exp.</p>
                    </div>

                    <div onClick={() => setShowPopups({ ...showPopups, massage: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Massage</p>
                    </div>

                    <div onClick={() => setShowPopups({ ...showPopups, loadging: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Staff Loading</p>
                    </div>

                    {/* <div className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Photoshoot</p>
                    </div> */}


                    <div onClick={() => setShowPopups({ ...showPopups, cake: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Cakes</p>
                    </div>

                    <div onClick={() => setShowPopups({ ...showPopups, daypass: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Daypass Opt</p>
                    </div>

                    <div onClick={() => setShowPopups({ ...showPopups, personalize: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p className='text-sm'>Personalized Exp</p>
                    </div>

                    <div onClick={() => setShowPopups({ ...showPopups, riding: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Riding</p>
                    </div>

                    <div onClick={() => setShowPopups({ ...showPopups, drink: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Premium Drink</p>
                    </div>

                    <div onClick={() => setShowPopups({ ...showPopups, holiday: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Holiday Dates</p>
                    </div>



                    <div onClick={() => setShowPopups({ ...showPopups, blocked: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p className='text-xs'>Blocked Booking Date</p>
                    </div>

                    <div onClick={() => setShowPopups({ ...showPopups, disable: true })} className='bg-[#eff6ff]  h-[4rem] min-w-[8rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <p>Disable Extras</p>
                    </div>






                </div>

            </div>


            {
                showPopups.term && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Term setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.villa && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Villa setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.loft && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Loft setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.family && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Family setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.standard && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Standard setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.studio && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Studio setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.lookout && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Lookout setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.massage && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Massage setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.loadging && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Loadging setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.cake && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Cake setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.daypass && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Daypass setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.personalize && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Personalize setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.riding && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Riding setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.drink && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Drink setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.holiday && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Holiday setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.blocked && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <BlockDaypass setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }
            {
                showPopups.disable && (
                    <div className='fixed top-0 left-0 bg-black w-[100%] h-screen bg-opacity-50'>
                        <div className='flex justify-center items-center h-[100%] w-[100%]'>
                            <Disable setShowPopups={setShowPopups} showPopups={showPopups} />
                        </div>
                    </div>
                )
            }



        </div>
    )
}

export default Setting
