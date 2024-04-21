import React, { useEffect, useState } from 'react'
import downIcon from '../assets/down.svg'
// import Extra from '../assets/extra.png'
import axios from 'axios'
import { baseUrl } from '../constants/baseurl'
import { insert } from '../store/slices/daypassAvailablity.slice'
const Extras = ({ finalData, setFinalData, type }) => {
    const [showExtra, setshowExtra] = useState(false)
    const [cakeExtra, setCakeExtra] = useState([])
    const [lookoutExtra, setlookoutExtra] = useState([])
    const [massageExtra, setmassageExtra] = useState([])
    const [drinkExtra, setdrinkExtra] = useState([])
    const [rindingExtra, setrindingExtra] = useState([])
    const [personalExtra, setpersonalExtra] = useState([])
    const [addedItems, setAddedItems] = useState({});


    const getExtras = async () => {
        let cakes = await axios.get(`${baseUrl}/cake/get`)
        let lookout = await axios.get(`${baseUrl}/lookout/get`)
        let massage = await axios.get(`${baseUrl}/massage/get`)
        let drinks = await axios.get(`${baseUrl}/drink/get`)
        let riding = await axios.get(`${baseUrl}/riding/get`)
        let personal = await axios.get(`${baseUrl}/personal/get`)
        setpersonalExtra([
            { price: personal.data[0].DIYPainting, title: "DIY Painting" },
            { price: personal.data[0].baloons, title: "Baloons" },
            { price: personal.data[0].floatingBreakFast, title: "Floating Breakfast" },
            { price: personal.data[0].flowerPetals, title: "Flower Petals" },
            { price: personal.data[0].sunsetPicnic, title: "Sunset Picninc" },
            { price: personal.data[0].welcomeNote, title: "Welcome Note" },
        ])
        setCakeExtra(cakes.data)
        setlookoutExtra(lookout.data)
        setmassageExtra(massage.data)
        setdrinkExtra(drinks.data)
        setrindingExtra(riding.data)
    }

    console.log(personalExtra)

    useEffect(() => {
        getExtras()
    }, [])

    const handleAddRemoveExtra = (key, value) => {
        if (addedItems[key]) {
            setFinalData(prevData => prevData.filter(item => item.key !== key));
            setAddedItems(prevItems => ({ ...prevItems, [key]: false }));
        } else {
            setFinalData(prevData => [...prevData, { key, value }]);
            setAddedItems(prevItems => ({ ...prevItems, [key]: true }));
        }
    };

    const handleAddRemoveCake = (cakeItem) => {
        const itemIndex = finalData.findIndex(item => item.title === cakeItem.title);
        if (itemIndex !== -1) {
            setFinalData(prevData => { const newData = [...prevData]; newData.splice(itemIndex, 1); return newData; });
        } else {
            setFinalData(prevData => [...prevData, cakeItem]);
        }
    };

    const handleAddRemoveMassage = (massageItem) => {
        const itemIndex = finalData.findIndex(item => item.type === massageItem.type);
        if (itemIndex !== -1) {
            setFinalData(prevData => {
                const newData = [...prevData];
                newData.splice(itemIndex, 1);
                return newData;
            });
        } else {
            setFinalData(prevData => [...prevData, massageItem]);
        }
    };
    const handleAddRemoveDrink = (drinkItem) => {
        const itemIndex = finalData.findIndex(item => item.title === drinkItem.title);
        if (itemIndex !== -1) {
            setFinalData(prevData => {
                const newData = [...prevData];
                newData.splice(itemIndex, 1);
                return newData;
            });
        } else {
            setFinalData(prevData => [...prevData, drinkItem]);
        }
    };

    const handleAddRemoveRiding = (drinkItem) => {
        const itemIndex = finalData.findIndex(item => item.title === drinkItem.title);
        if (itemIndex !== -1) {
            setFinalData(prevData => {
                const newData = [...prevData];
                newData.splice(itemIndex, 1);
                return newData;
            });
        } else {
            setFinalData(prevData => [...prevData, drinkItem]);
        }
    };
    const handleAddRemovePersonal = (drinkItem) => {
        const itemIndex = finalData.findIndex(item => item.title === drinkItem.title);
        if (itemIndex !== -1) {
            setFinalData(prevData => {
                const newData = [...prevData];
                newData.splice(itemIndex, 1);
                return newData;
            });
        } else {
            setFinalData(prevData => [...prevData, drinkItem]);
        }
    };

    const isCakeAdded = (cakeItem) => {
        return finalData.some(item => item.title === cakeItem.title);
    };
    const isMassageAdded = (massageItem) => {
        return finalData.some(item => item.type === massageItem.type);
    }

    const isDrinkAdded = (drinkItem) => {
        return finalData.some(item => item.title === drinkItem.title);
    }

    const isRidingAdded = (drinkItem) => {
        return finalData.some(item => item.title === drinkItem.title);
    }

    const isPersonalAdded = (drinkItem) => {
        return finalData.some(item => item.title === drinkItem.title);
    }

    const selectBg = (item) => {
        switch (item) {
            case "DIY Painting":
                return "https://img.freepik.com/premium-photo/painting-paint-splash-color-full-width-white-art-painter-generative-ai_862745-558.jpg"
            case "Baloons":
                return "https://www.elliesparty.com/cdn/shop/products/black-gold-silver-balloon-arch-balloon-garland-kit-280393.jpg?v=1684344401&width=1946"

            case "Floating Breakfast":
                return "https://www.journeyera.com/wp-content/uploads/2023/11/Resorts-Offering-Floating-Breakfast-in-Bali-samaya-1024x746.jpg"
            case "Flower Petals":
                return "https://catalog.parkseed.com/images?highQuality=true&src=https%3A%2F%2Fparkseed.com%2Fimages%2Fxxl%2F88089-PK-6.jpg&s=b7176707314f1bcc91c8e13ca0439f7502392014b978925ff0a305f0c2a0a87e"
            case "Welcome Note":
                return "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/6501c92b89796e35d456179e_AnyConv.com__c%20(10).webp"
            case "Sunset Picninc":
                return "https://w0.peakpx.com/wallpaper/611/649/HD-wallpaper-sunset-beach-picnic-dusk-candlelight-sunset-twilight-eat-picnic-sea-beach-sand-dining-evening-exotic-islands-romantic-view-romance-food-ocean-ornage-sky-table-for-two-candles-skies.jpg"
        }
    }


    return (
        <div className='w-[100%] max-h-[19rem] overflow-y-auto  bg-white rounded-md mt-4 font-robotoFont p-4'>

            <h1 className='text-xl font-bold'>Want to add some Extras</h1>

            <div className='flex justify-between items-center gap-x-4'>
                <h1 className='text-sm mt-3 text-[#606970]'>Here you can book in any extra special experiences.Please select the ones you wish to add to your booking.</h1>
                <img onClick={() => setshowExtra(!showExtra)} src={downIcon} alt="" className=' cursor-pointer' />
            </div>

            {
                showExtra && (
                    <>
                        {lookoutExtra?.map((extra, index) => (
                            <div key={index} className='mt-4'>
                                <h1 className='text-lg mb-3 ml-0 font-semibold'>Lookout Experience</h1>
                                {Object.entries(extra).map(([key, value]) => {
                                    const keysToMapOver = ['dinnerChampagne', 'dinnerFish', 'dinnerRomantic', 'luchFish', 'luchHorse', 'luchShell', 'breakfastFish', 'breakfastHorse', 'breakfastShell'];
                                    if (keysToMapOver.includes(key)) {
                                        return (
                                            <div key={key} className='lg:flex justify-between items-center mb-4'>

                                                <div className='lg:flex items-center gap-x-4 min-w-[18rem] overflow-auto'>
                                                    <div>
                                                        <img src={"https://media-cdn.tripadvisor.com/media/photo-s/09/d2/09/77/hd-beach-resort.jpg"} alt="" className='lg:w-fit w-[100%] h-[10rem] bg-contain lg:h-[5rem]' />
                                                    </div>
                                                    <div className='lg:block flex gap-x-3 lt:mt-0 mt-2'>
                                                        <p className='text-[#606970]'>Item</p>
                                                        <p className='lg:mt-1 mt-0 font-bold'>{key}</p>
                                                    </div>
                                                </div>

                                                <div className='lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]'>
                                                    <p className='text-[#606970]'>Price</p>
                                                    <p className='font-bold'>{value}₦</p>
                                                </div>

                                                <div className='lg:mt-0 mt-4'>
                                                    <button onClick={() => handleAddRemoveExtra(key, value)} className='w-[8rem] h-[2.4rem] rounded-lg text-white bg-black'>{addedItems[key] ? 'Remove Extra' : 'Add Extra'}</button>
                                                </div>

                                            </div>
                                        );
                                    } else {
                                        return null; // Return null for keys you don't want to map over
                                    }
                                })}
                            </div>
                        ))}

                        {
                            cakeExtra?.map((item, index) => (
                                <div key={index} className='mt-4'>
                                    <h1 className='text-lg mb-3 ml-0 font-semibold'>Cake</h1>
                                    <div className='lg:flex justify-between items-center mb-4'>

                                        <div className='lg:flex items-center gap-x-4 min-w-[18rem] overflow-auto'>
                                            <div>
                                                <img src={"https://preppykitchen.com/wp-content/uploads/2022/05/Naked-Cake-Recipe-Card.jpg"} alt="" className='lg:w-fit w-[100%] h-[10rem] bg-contain lg:h-[5rem]' />
                                            </div>
                                            <div className='lg:block flex gap-x-3 lt:mt-0 mt-2'>
                                                <p className='text-[#606970]'>Item</p>
                                                <p className='lg:mt-1 mt-0 font-bold'>{item?.title}</p>
                                            </div>
                                        </div>

                                        <div className='lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]'>
                                            <p className='text-[#606970]'>Price</p>
                                            <p className='font-bold'>{item.price}₦</p>
                                        </div>

                                        <div className='lg:mt-0 mt-4'>
                                            <button onClick={() => handleAddRemoveCake(item)} className='w-[8rem] h-[2.4rem] rounded-lg text-white bg-black'>{isCakeAdded(item) ? 'Remove Cake' : 'Add Cake'}</button>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }


                        {
                            massageExtra?.map((item, index) => (
                                <div key={index} className='mt-4'>
                                    <h1 className='text-lg mb-3 ml-0 font-semibold'>Massage</h1>
                                    <div className='lg:flex justify-between items-center mb-4'>

                                        <div className='lg:flex items-center gap-x-4 min-w-[18rem] overflow-auto'>
                                            <div>
                                                <img src={"https://media.istockphoto.com/id/1336348648/photo/couple-massage-at-spa-resort-beautiful-couple-getting-a-back-massage-outdoor-romantic-weekend.jpg?s=612x612&w=0&k=20&c=5yU74zB3EEHnfxWP7qe7w2cqpqz8cE-EaPosdPlZZlI="} alt="" className='lg:w-fit w-[100%] h-[10rem] bg-contain lg:h-[5rem]' />
                                            </div>
                                            <div className='lg:block flex gap-x-3 lt:mt-0 mt-2'>
                                                <p className='text-[#606970]'>Item</p>
                                                <p className='lg:mt-1 mt-0 font-bold'>{item?.type}</p>
                                            </div>
                                        </div>

                                        <div className='lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]'>
                                            <p className='text-[#606970]'>Price</p>
                                            <p className='font-bold'>{item.price}₦</p>
                                        </div>

                                        <div className='lg:mt-0 mt-4'>
                                            <button onClick={() => handleAddRemoveMassage(item)} className='w-[8rem] h-[2.4rem] rounded-lg text-white bg-black'>{isMassageAdded(item) ? 'Remove Massage' : 'Add Massage'}</button>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }


                        {
                            drinkExtra?.map((item, index) => (
                                <div key={index} className='mt-4'>
                                    <h1 className='text-lg mb-3 ml-0 font-semibold'>Drinks</h1>
                                    <div className='lg:flex justify-between items-center mb-4'>

                                        <div className='lg:flex items-center gap-x-4 min-w-[18rem] overflow-auto'>
                                            <div>
                                                <img src={"https://img.freepik.com/free-photo/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai_188544-12370.jpg"} alt="" className='lg:w-fit w-[100%] h-[10rem] bg-contain lg:h-[5rem]' />
                                            </div>
                                            <div className='lg:block flex gap-x-3 lt:mt-0 mt-2'>
                                                <p className='text-[#606970]'>Item</p>
                                                <p className='lg:mt-1 mt-0 font-bold'>{item?.title}</p>
                                            </div>
                                        </div>

                                        <div className='lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]'>
                                            <p className='text-[#606970]'>Price</p>
                                            <p className='font-bold'>{item.price}₦</p>
                                        </div>

                                        <div className='lg:mt-0 mt-4'>
                                            <button onClick={() => handleAddRemoveDrink(item)} className='w-[8rem] h-[2.4rem] rounded-lg text-white bg-black'>{isDrinkAdded(item) ? 'Remove Drink' : 'Add Drink'}</button>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                        {console.log(type,'key')}
                        {
                            
                            type == "overnight" && (
                                <div>
                                    {
                                        rindingExtra?.map((item, index) => (
                                            <div key={index} className='mt-4'>
                                                <h1 className='text-lg mb-3 ml-0 font-semibold'>Riding</h1>
                                                <div className='lg:flex justify-between items-center mb-4'>

                                                    <div className='lg:flex items-center gap-x-4 min-w-[18rem] overflow-auto'>
                                                        <div>
                                                            <img src={"https://hips.hearstapps.com/hmg-prod/images/elm100120ppequestrians0012-1600436753.jpg?crop=1.00xw:0.492xh;0,0.322xh&resize=1200:*"} alt="" className='lg:w-fit w-[100%] h-[10rem] bg-contain lg:h-[5rem]' />
                                                        </div>
                                                        <div className='lg:block flex gap-x-3 lt:mt-0 mt-2'>
                                                            <p className='text-[#606970]'>Item</p>
                                                            <p className='lg:mt-1 mt-0 font-bold'>{item?.title}</p>
                                                        </div>
                                                    </div>

                                                    <div className='lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]'>
                                                        <p className='text-[#606970]'>Price</p>
                                                        <p className='font-bold'>{item.price}₦</p>
                                                    </div>

                                                    <div className='lg:mt-0 mt-4'>
                                                        <button onClick={() => handleAddRemoveRiding(item)} className='w-[8rem] h-[2.4rem] rounded-lg text-white bg-black'>{isRidingAdded(item) ? 'Remove Riding' : 'Add Ridng'}</button>
                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    }



                                    {
                                        personalExtra?.map((item, index) => (
                                            <div key={index} className='mt-4'>
                                                <h1 className='text-lg mb-3 ml-0 font-semibold'>{item.title}</h1>
                                                <div className='lg:flex justify-between items-center mb-4'>

                                                    <div className='lg:flex items-center gap-x-4 min-w-[18rem] overflow-auto'>
                                                        <div>
                                                            <img src={selectBg(item.title)} alt="" className='lg:w-fit w-[100%] h-[10rem] bg-contain lg:h-[5rem]' />
                                                        </div>
                                                        <div className='lg:block flex gap-x-3 lt:mt-0 mt-2'>
                                                            <p className='text-[#606970]'>Item</p>
                                                            <p className='lg:mt-1 mt-0 font-bold'>{item?.title}</p>
                                                        </div>
                                                    </div>

                                                    <div className='lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]'>
                                                        <p className='text-[#606970]'>Price</p>
                                                        <p className='font-bold'>{item.price}₦</p>
                                                    </div>

                                                    <div className='lg:mt-0 mt-4'>
                                                        <button onClick={() => handleAddRemovePersonal(item)} className='w-[fit] px-1 h-[2.4rem] rounded-lg text-white bg-black'>{isPersonalAdded(item) ? `Remove ${item.title}` : `Add ${item.title}`}</button>
                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            )
                        }




                    </>

                )
            }




        </div>
    )
}

export default Extras
