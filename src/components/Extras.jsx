import React, { useEffect, useState } from "react";
import downIcon from "../assets/down.svg";
// import Extra from '../assets/extra.png'
import axios from "axios";
import { baseUrl } from "../constants/baseurl";
import massage from "../assets/massage.jpeg";
import Room from "../assets/Room Decoration.jpeg";
import photo from "../assets/Photo.jpeg";
import riding from "../assets/Riding.jpeg";
import teams from "../assets/teams.jpeg";
import tie from "../assets/tie.jpeg";
import unforgettable from "../assets/unforgettable.jpeg";
import drinking from "../assets/Drinking.jpeg";
import dining from "../assets/Dining Experience.jpeg";
import daypass from "../assets/daypassExtension.jpeg";
import conference from "../assets/conferences.jpeg";
import cake from "../assets/Cake.jpeg";
import adire from "../assets/adire.jpeg";
import bedroom from "../assets/bedRoom.png";
import { insert } from "../store/slices/daypassAvailablity.slice";
import { ClipLoader } from "react-spinners";
const Extras = ({ finalData, setFinalData, type }) => {
  const [showExtra, setshowExtra] = useState(
    type != "overnight" ? false : true
  );
  const [cakeExtra, setCakeExtra] = useState([]);
  const [lookoutExtra, setlookoutExtra] = useState([]);
  const [massageExtra, setmassageExtra] = useState([]);
  const [drinkExtra, setdrinkExtra] = useState([]);
  const [unforgettableExtra, setunforgettableExtra] = useState([]);
  const [domesticStaffExtra, setdomesticStaffExtra] = useState([]);
  const [roomDecorationExtra, setroomDecorationExtra] = useState([]);
  const [rindingExtra, setrindingExtra] = useState([]);
  const [diningExtra, setdiningExtra] = useState([]);
  const [daypassExtensionExtra, setdaypassExtensionExtra] = useState([]);
  const [personalExtra, setpersonalExtra] = useState([]);
  const [addedItems, setAddedItems] = useState({});
  const [disabledExtras, setDisabledExtras] = useState([]);
  const formatPrice = (price) => {
    const priceNumber = Number(price);
    return priceNumber.toLocaleString(); // Format the price with commas
  };
  const getExtras = async () => {
    let cakes = await axios.get(`${baseUrl}/cake/get`);
    // let lookout = await axios.get(`${baseUrl}/lookout/get`);
    let massage = await axios.get(`${baseUrl}/massage/get`);
    let drinks = await axios.get(`${baseUrl}/drink/get`);
    let riding = await axios.get(`${baseUrl}/riding/get`);
    let personal = await axios.get(`${baseUrl}/personal/get`);
    let unforgettableExp = await axios.get(`${baseUrl}/unforgettableExp/get`);
    let domesticStaff = await axios.get(`${baseUrl}/domesticStaff/get`);
    let roomDecoration = await axios.get(`${baseUrl}/roomDecoration/get`);
    let diningExperience = await axios.get(`${baseUrl}/diningExperience/get`);
    let daypassExtension = await axios.get(`${baseUrl}/daypassExtension/get`);
    // console.log(personal.data);
    setpersonalExtra([
      {
        price: personal.data[0].DIYPainting,
        title: "Photo Shoot (Photographer Access)",
      },
      // { price: personal.data[0].baloons, title: "Dining Experience" },
      // {
      //   price: personal.data[0].floatingBreakFast,
      //   title: "Daypass Extension - On Last Day",
      // },
      { price: personal.data[0].flowerPetals, title: "Conference Facility" },
      { price: personal.data[0].sunsetPicnic, title: "Organized Team Bonding" },
      { price: personal.data[0].welcomeNote, title: "Adire" },
      { price: personal.data[1].TieDye, title: "Tie-Dye" },
    ]);
    setCakeExtra(cakes.data);
    // setlookoutExtra(lookout.data);

    // console.log(lookout.data);
    setmassageExtra(massage.data);
    setdrinkExtra(drinks.data);
    // console.log(drinks.data);
    setrindingExtra(riding.data);
    setdiningExtra(diningExperience.data);
    setdaypassExtensionExtra(daypassExtension.data);
    setunforgettableExtra(unforgettableExp.data);
    setdomesticStaffExtra(domesticStaff.data);
    setroomDecorationExtra(roomDecoration.data);
  };

  const fetchDisabledExtras = async () => {
    let response = await axios.get(`${baseUrl}/disable/get`);
    if (response.data) {
      setDisabledExtras(response.data);
    }
  };
  useEffect(() => {
    getExtras();
    fetchDisabledExtras();
  }, []);
  const filterExtras = (extras) => {
    return extras.filter((item) => {
      const isDisabled = disabledExtras.some(
        (disabledItem) =>
          disabledItem?.type?.trim() === item?.title?.trim() &&
          new Date(disabledItem.date).toDateString() ===
            new Date().toDateString() // Replace with the provided date
      );
      return !isDisabled;
    });
  };
  // const filterMassageExtras = (extras) => {
  //   return extras.filter((item) => {
  //     const isDisabled = disabledExtras.some(
  //       (disabledItem) =>
  //         disabledItem?.type?.trim() === item?.type?.trim() &&
  //         new Date(disabledItem.date).toDateString() ===
  //           new Date().toDateString() // Replace with the provided date
  //     );
  //     return !isDisabled;
  //   });
  // };
  const filteredCakeExtras = filterExtras(cakeExtra);
  // const filteredLookoutExtras = filterExtras(lookoutExtra);
  const filteredDiningExtras = filterExtras(diningExtra);
  const filteredDaypassExtensionExtras = filterExtras(daypassExtensionExtra);
  const filteredMassageExtras = filterExtras(massageExtra);
  const filteredDrinkExtras = filterExtras(drinkExtra);
  const filteredUnforgettableExtras = filterExtras(unforgettableExtra);
  const filteredDomesticStaffExtras = filterExtras(domesticStaffExtra);
  const filteredRoomDecorationExtras = filterExtras(roomDecorationExtra);
  const filteredRidingExtras = filterExtras(rindingExtra);
  const filteredPersonalExtras = filterExtras(personalExtra);

  const handleAddRemoveExtra = (key, value) => {
    if (addedItems[key]) {
      setFinalData((prevData) => prevData.filter((item) => item.key !== key));
      setAddedItems((prevItems) => ({ ...prevItems, [key]: false }));
    } else {
      setFinalData((prevData) => [...prevData, { key, value }]);
      setAddedItems((prevItems) => ({ ...prevItems, [key]: true }));
    }
  };

  const handleAddRemoveCake = (cakeItem) => {
    const itemIndex = finalData.findIndex(
      (item) => item.title === cakeItem.title
    );
    if (itemIndex !== -1) {
      setFinalData((prevData) => {
        const newData = [...prevData];
        newData.splice(itemIndex, 1);
        return newData;
      });
    } else {
      setFinalData((prevData) => [...prevData, { ...cakeItem, type: "cake" }]);
    }
  };

  const handleAddRemoveMassage = (massageItem) => {
    const itemIndex = finalData.findIndex(
      (item) => item.title === massageItem.title
    );
    if (itemIndex !== -1) {
      setFinalData((prevData) => {
        const newData = [...prevData];
        newData.splice(itemIndex, 1);
        return newData;
      });
    } else {
      // setFinalData((prevData) => [...prevData, massageItem]);
      setFinalData((prevData) => [
        ...prevData,
        { ...massageItem, type: "massage" },
      ]);
    }
  };
  const handleAddRemoveDrink = (drinkItem) => {
    const itemIndex = finalData.findIndex(
      (item) => item.title === drinkItem.title
    );
    if (itemIndex !== -1) {
      setFinalData((prevData) => {
        const newData = [...prevData];
        newData.splice(itemIndex, 1);
        return newData;
      });
    } else {
      // setFinalData((prevData) => [...prevData, drinkItem]);
      setFinalData((prevData) => [
        ...prevData,
        { ...drinkItem, type: "drink" },
      ]);
    }
  };

  const handleAddRemoveRiding = (drinkItem) => {
    const itemIndex = finalData.findIndex(
      (item) => item.title === drinkItem.title
    );
    if (itemIndex !== -1) {
      setFinalData((prevData) => {
        const newData = [...prevData];
        newData.splice(itemIndex, 1);
        return newData;
      });
    } else {
      // setFinalData((prevData) => [...prevData, drinkItem]);
      setFinalData((prevData) => [
        ...prevData,
        { ...drinkItem, type: "riding" },
      ]);
    }
  };
  const handleAddRemovePersonal = (drinkItem) => {
    const itemIndex = finalData.findIndex(
      (item) => item.title === drinkItem.title
    );
    if (itemIndex !== -1) {
      setFinalData((prevData) => {
        const newData = [...prevData];
        newData.splice(itemIndex, 1);
        return newData;
      });
    } else {
      // setFinalData((prevData) => [...prevData, drinkItem]);
      setFinalData((prevData) => [
        ...prevData,
        {
          ...drinkItem,
          type: drinkItem.title.trim().toLowerCase(),
          _id: Date.now(),
        },
      ]);
    }
  };

  const handleAddRemoveDomesticStaff = (domesticStaffItem) => {
    const itemIndex = finalData.findIndex(
      (item) => item.title === domesticStaffItem.title
    );
    if (itemIndex !== -1) {
      setFinalData((prevData) => {
        const newData = [...prevData];
        newData.splice(itemIndex, 1);
        return newData;
      });
    } else {
      // setFinalData((prevData) => [...prevData, domesticStaffItem]);
      setFinalData((prevData) => [
        ...prevData,
        { ...domesticStaffItem, type: "domestic" },
      ]);
    }
  };

  const handleAddRemoveRoomDecoration = (roomDecorationItem) => {
    const itemIndex = finalData.findIndex(
      (item) => item.title === roomDecorationItem.title
    );
    if (itemIndex !== -1) {
      setFinalData((prevData) => {
        const newData = [...prevData];
        newData.splice(itemIndex, 1);
        return newData;
      });
    } else {
      // setFinalData((prevData) => [...prevData, roomDecorationItem]);
      setFinalData((prevData) => [
        ...prevData,
        { ...roomDecorationItem, type: "roomDecoration" },
      ]);
    }
  };

  const handleAddRemoveUnforgettable = (unforgettableItem) => {
    const itemIndex = finalData.findIndex(
      (item) => item.title === unforgettableItem.title
    );
    if (itemIndex !== -1) {
      setFinalData((prevData) => {
        const newData = [...prevData];
        newData.splice(itemIndex, 1);
        return newData;
      });
    } else {
      // setFinalData((prevData) => [...prevData, unforgettableItem]);
      setFinalData((prevData) => [
        ...prevData,
        { ...unforgettableItem, type: "unforgettable" },
      ]);
    }
  };

  const handleAddRemoveDining = (diningItem) => {
    const itemIndex = finalData.findIndex(
      (item) => item.title === diningItem.title
    );
    if (itemIndex !== -1) {
      setFinalData((prevData) => {
        const newData = [...prevData];
        newData.splice(itemIndex, 1);
        return newData;
      });
    } else {
      // setFinalData((prevData) => [...prevData, diningItem]);
      setFinalData((prevData) => [
        ...prevData,
        { ...diningItem, type: "dining" },
      ]);
    }
  };
  const handleAddRemoveDaypassExtension = (daypassExtensionItem) => {
    const itemIndex = finalData.findIndex(
      (item) => item.title === daypassExtensionItem.title
    );
    if (itemIndex !== -1) {
      setFinalData((prevData) => {
        const newData = [...prevData];
        newData.splice(itemIndex, 1);
        return newData;
      });
    } else {
      // setFinalData((prevData) => [...prevData, daypassExtensionItem]);
      setFinalData((prevData) => [
        ...prevData,
        { ...daypassExtensionItem, type: "daypassExtension" },
      ]);
    }
  };

  const isCakeAdded = (cakeItem) => {
    return finalData.some((item) => item.title === cakeItem.title);
  };
  const isMassageAdded = (massageItem) => {
    return finalData.some((item) => item.title === massageItem.title);
  };

  const isDrinkAdded = (drinkItem) => {
    return finalData.some((item) => item.title === drinkItem.title);
  };

  const isRidingAdded = (drinkItem) => {
    return finalData.some((item) => item.title === drinkItem.title);
  };

  const isPersonalAdded = (drinkItem) => {
    return finalData.some((item) => item.title === drinkItem.title);
  };

  const isDomesticStaffAdded = (domesticStaffItem) => {
    return finalData.some((item) => item.title === domesticStaffItem.title);
  };

  const isRoomDecorationAdded = (roomDecorationItem) => {
    return finalData.some((item) => item.title === roomDecorationItem.title);
  };

  const isUnforgettableAdded = (unforgettableItem) => {
    return finalData.some((item) => item.title === unforgettableItem.title);
  };

  const isDiningAdded = (diningItem) => {
    return finalData.some((item) => item.title === diningItem.title);
  };

  const isDaypassExtensionAdded = (daypassExtensionItem) => {
    return finalData.some((item) => item.title === daypassExtensionItem.title);
  };

  const selectBg = (item) => {
    switch (item) {
      case "Photo Shoot (Photographer Access)":
        return photo;
      // case "Dining Experience":
      //   return dining;
      // case "Daypass Extension - On Last Day":
      //   return daypass;
      case "Conference Facility":
        return conference;
      case "Organized Team Bonding":
        return teams;
      case "Adire":
        return adire;
      case "Tie-Dye":
        return tie;
    }
  };
  const [showCake, setshowCake] = useState(false);
  const [showMassage, setshowMassage] = useState(false);
  const [showDrink, setshowDrink] = useState(false);
  const [showRiding, setshowRiding] = useState(false);
  const [showPersonal, setshowPersonal] = useState(false);
  const [showDomesticStaff, setshowDomesticStaff] = useState(false);
  const [showRoomDecoration, setshowRoomDecoration] = useState(false);
  const [showUnforgettable, setshowUnforgettable] = useState(false);
  const [showDining, setshowDining] = useState(false);
  const [showDaypassExtension, setshowDaypassExtension] = useState(false);

  const filteredDiningbreakfastExtras = filteredDiningExtras?.filter(
    (item) => item.typeOf.toLowerCase().trim() === "lookout breakfast"
  );
  const filteredDininglunchExtras = filteredDiningExtras?.filter(
    (item) => item.typeOf.toLowerCase().trim() === "lookout lunch"
  );
  const filteredDiningdinnerExtras = filteredDiningExtras?.filter(
    (item) => item.typeOf.toLowerCase().trim() === "beachside dinner"
  );

  return (
    <div
      className={`w-[100%]  overflow-y-auto ${
        type != "overnight" && "border-2 border-[#75A9BF] p-4"
      }  rounded-md mt-4 font-robotoFont `}
    >
      <h1 className="text-xl font-bold">Want to add some Extras</h1>

      <div className="flex justify-between items-center gap-x-4">
        <h1 className="text-sm mt-3 text-[#606970]">
          Here you can book in any extra special experiences.Please select the
          ones you wish to add to your booking.
        </h1>
        {type != "overnight" && (
          <img
            onClick={() => setshowExtra(!showExtra)}
            src={downIcon}
            alt=""
            className=" cursor-pointer"
          />
        )}
      </div>

      {showExtra && (
        <>
          {/* {lookoutExtra?.map((extra, index) => (
            <div key={index} className="mt-4">
              <h1 className="text-lg mb-3 ml-0 font-semibold">
                Lookout Experience
              </h1>
              {Object.entries(extra).map(([key, value]) => {
                const keysToMapOver = [
                  "dinnerChampagne",
                  "dinnerFish",
                  "dinnerRomantic",
                  "luchFish",
                  "luchHorse",
                  "luchShell",
                  "breakfastFish",
                  "breakfastHorse",
                  "breakfastShell",
                ];
                if (keysToMapOver.includes(key)) {
                  return (
                    <div
                      key={key}
                      className="lg:flex justify-between items-center mb-4"
                    >
                      <div className="lg:flex items-center gap-x-4 min-w-[18rem] overflow-auto">
                        <div>
                          <img
                            src={
                              "https://media-cdn.tripadvisor.com/media/photo-s/09/d2/09/77/hd-beach-resort.jpg"
                            }
                            alt=""
                            className="md:w-[80px] w-[60px] h-[10rem] b-[55em]"
                          />
                        </div>
                        <div className="lg:block flex gap-x-3 lt:mt-0 mt-2">
                          <p className="text-[#606970]">Item</p>
                          <p className="lg:mt-1 mt-0 font-bold">{key}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <div className="lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]">
                          <p className="text-[#606970]">Price</p>
                          <p className="font-bold">{value}₦</p>
                        </div>

                        <div className="lg:mt-0 mt-4">
                          <button
                            onClick={() => handleAddRemoveExtra(key, value)}
                            className="w-[8rem] h-[2.4rem] rounded-lg text-white bg-black"
                          >
                            {addedItems[key] ? "Remove Extra" : "Add Extra"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null; // Return null for keys you don't want to map over
                }
              })}
            </div>
          ))} */}
          {!cakeExtra?.length > 0 &&
          !massageExtra?.length > 0 &&
          !drinkExtra?.length > 0 &&
          !unforgettableExtra?.length > 0 &&
          !rindingExtra?.length > 0 &&
          !roomDecorationExtra?.length > 0 &&
          !domesticStaffExtra?.length > 0 &&
          !personalExtra?.length > 0 &&
          !diningExtra?.length > 0 &&
          !daypassExtensionExtra?.length > 0 ? (
            <div className="w-full text-center mt-10">
              <ClipLoader color="#000000" size={35} />
            </div>
          ) : (
            <>
              {cakeExtra?.length > 0 && (
                <div className="my-4">
                  <div className="flex justify-between items-center gap-x-4">
                    <div className="flex items-center gap-x-4 ">
                      <img
                        src={cake}
                        alt=""
                        className="md:w-[80px] w-[60px] rounded-full bg-contain md:h-[5rem] h-[4rem]"
                      />
                      <h1 className="text-lg mb-3 ml-0 font-semibold">Cake</h1>
                    </div>

                    <img
                      onClick={() => setshowCake(!showCake)}
                      src={downIcon}
                      alt=""
                      className=" cursor-pointer"
                    />
                  </div>
                  {showCake && (
                    <>
                      {filteredCakeExtras?.map((item, index) => (
                        <div key={index} className="mt-4">
                          <div className="flex flex-wrap justify-between items-center mb-4">
                            <div className="flex items-center gap-x-4 min-w-[18rem] overflow-auto">
                              <div className=" flex items-center gap-x-3 lt:mt-0 mt-2">
                                {/* <p className="text-[#606970] ">Item</p> */}
                                <input
                                  type="checkbox"
                                  checked={isCakeAdded(item)}
                                  onChange={() => {
                                    handleAddRemoveCake(item);
                                  }}
                                  className="w-6 h-6 rounded-sm cursor-pointer"
                                />
                                <p className="lg:mt-1 mt-0 font-bold">
                                  {item?.title}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col lg:gap-y-2">
                              <div className="lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]">
                                {/* <p className="text-[#606970]">Price</p> */}
                                <p className="font-bold">
                                  ₦{formatPrice(item.price)}
                                </p>
                              </div>

                              {/* <div className="lg:mt-0 mt-4">
                            <button
                              onClick={() => handleAddRemoveCake(item)}
                              className="w-[8rem] h-[2.4rem] rounded-lg text-white bg-black"
                            >
                              {isCakeAdded(item) ? "Remove Cake" : "Add Cake"}
                            </button>
                          </div> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}

              {massageExtra?.length > 0 && (
                <div className="my-4">
                  <div className="flex justify-between items-center gap-x-4">
                    <div className="flex items-center gap-x-4 ">
                      <img
                        src={massage}
                        alt=""
                        className="md:w-[80px] w-[60px] rounded-full bg-contain md:h-[5rem] h-[4rem]"
                      />
                      <h1 className="text-lg mb-3 ml-0 font-semibold">
                        Massage
                      </h1>
                    </div>

                    <img
                      onClick={() => setshowMassage(!showMassage)}
                      src={downIcon}
                      alt=""
                      className=" cursor-pointer"
                    />
                  </div>
                  {showMassage && (
                    <>
                      {filteredMassageExtras?.map((item, index) => (
                        <div key={index} className="mt-4">
                          <div className="flex flex-wrap justify-between items-center mb-4">
                            <div className="flex items-center gap-x-4 min-w-[18rem] overflow-auto">
                              <div className=" flex items-center gap-x-3 lt:mt-0 mt-2">
                                {/* <p className="text-[#606970]">Item</p> */}
                                <input
                                  type="checkbox"
                                  checked={isMassageAdded(item)}
                                  onChange={() => {
                                    handleAddRemoveMassage(item);
                                  }}
                                  className="w-6 h-6 rounded-sm cursor-pointer"
                                />
                                <p className="lg:mt-1 mt-0 font-bold">
                                  {item?.title}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col lg:gap-y-2">
                              <div className="lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]">
                                {/* <p className="text-[#606970]">Price</p> */}
                                <p className="font-bold">
                                  ₦{formatPrice(item.price)}
                                </p>
                              </div>

                              {/* <div className="lg:mt-0 mt-4">
                            <button
                              onClick={() => handleAddRemoveMassage(item)}
                              className="w-[8rem] h-[2.4rem] rounded-lg text-white bg-black"
                            >
                              {isMassageAdded(item)
                                ? "Remove Massage"
                                : "Add Massage"}
                            </button>
                          </div> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}

              {drinkExtra?.length > 0 && (
                <div className="my-4">
                  <div className="flex justify-between items-center gap-x-4">
                    <div className="flex items-center gap-x-4 ">
                      <img
                        src={drinking}
                        alt=""
                        className="md:w-[80px] w-[60px] rounded-full bg-contain md:h-[5rem] h-[4rem]"
                      />
                      <h1 className="text-lg mb-3 ml-0 font-semibold">
                        Drinks
                      </h1>
                    </div>

                    <img
                      onClick={() => setshowDrink(!showDrink)}
                      src={downIcon}
                      alt=""
                      className=" cursor-pointer"
                    />
                  </div>
                  {showDrink && (
                    <>
                      {filteredDrinkExtras?.map((item, index) => (
                        <div key={index} className="mt-4">
                          <div className="flex flex-wrap justify-between items-center mb-4">
                            <div className="flex items-center gap-x-4 min-w-[18rem] overflow-auto">
                              <div className="flex items-center gap-x-3 lt:mt-0 mt-2">
                                {/* <p className="text-[#606970]">Item</p> */}
                                <input
                                  type="checkbox"
                                  checked={isDrinkAdded(item)}
                                  onChange={() => {
                                    handleAddRemoveDrink(item);
                                  }}
                                  className="w-6 h-6 rounded-sm cursor-pointer"
                                />
                                <p className="lg:mt-1 mt-0 font-bold">
                                  {item?.title}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col lg:gap-y-2">
                              <div className="lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]">
                                {/* <p className="text-[#606970]">Price</p> */}
                                <p className="font-bold">
                                  ₦{formatPrice(item.price)}
                                </p>
                              </div>

                              {/* <div className="lg:mt-0 mt-4">
                            <button
                              onClick={() => handleAddRemoveDrink(item)}
                              className="w-[8rem] h-[2.4rem] rounded-lg text-white bg-black"
                            >
                              {isDrinkAdded(item)
                                ? "Remove Drink"
                                : "Add Drink"}
                            </button>
                          </div> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}

              {unforgettableExtra?.length > 0 && (
                <div className="my-4">
                  <div className="flex justify-between items-center gap-x-4">
                    <div className="flex items-center gap-x-4 ">
                      <img
                        src={unforgettable}
                        alt=""
                        className="md:w-[80px] w-[60px] rounded-full bg-contain md:h-[5rem] h-[4rem]"
                      />
                      <h1 className="text-lg mb-3 ml-0 font-semibold">
                        Unforgettable Experiences
                      </h1>
                    </div>

                    <img
                      onClick={() => setshowUnforgettable(!showUnforgettable)}
                      src={downIcon}
                      alt=""
                      className=" cursor-pointer"
                    />
                  </div>
                  {showUnforgettable && (
                    <>
                      {filteredUnforgettableExtras?.map((item, index) => (
                        <div key={index} className="mt-4">
                          <div className="flex flex-wrap justify-between items-center mb-4">
                            <div className="flex items-center gap-x-4 min-w-[18rem] overflow-auto">
                              <div className="flex items-center gap-x-3 lt:mt-0 mt-2">
                                {/* <p className="text-[#606970]">Item</p> */}
                                <input
                                  type="checkbox"
                                  checked={isUnforgettableAdded(item)}
                                  onChange={() => {
                                    handleAddRemoveUnforgettable(item);
                                  }}
                                  className="w-6 h-6 rounded-sm cursor-pointer"
                                />
                                <p className="lg:mt-1 mt-0 font-bold">
                                  {item?.title}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col lg:gap-y-2">
                              <div className="lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]">
                                {/* <p className="text-[#606970]">Price</p> */}
                                <p className="font-bold">
                                  ₦{formatPrice(item.price)}
                                </p>
                              </div>

                              {/* <div className="lg:mt-0 mt-4">
                            <button
                              onClick={() => handleAddRemoveUnforgettable(item)}
                              className="w-auto px-4 h-[2.4rem] rounded-lg text-white bg-black"
                            >
                              {isUnforgettableAdded(item)
                                ? "Remove Experience"
                                : "Add Experience"}
                            </button>
                          </div> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
              {type == "overnight" && (
                <div>
                  {rindingExtra?.length > 0 && (
                    <div className="my-4">
                      <div className="flex justify-between items-center gap-x-4">
                        <div className="flex items-center gap-x-4 ">
                          <img
                            src={riding}
                            alt=""
                            className="md:w-[80px] w-[60px] rounded-full bg-contain md:h-[5rem] h-[4rem]"
                          />
                          <h1 className="text-lg mb-3 ml-0 font-semibold">
                            Riding
                          </h1>
                        </div>

                        <img
                          onClick={() => setshowRiding(!showRiding)}
                          src={downIcon}
                          alt=""
                          className=" cursor-pointer"
                        />
                      </div>
                      {showRiding && (
                        <>
                          {filteredRidingExtras?.map((item, index) => (
                            <div key={index} className="mt-4">
                              <div className="flex flex-wrap justify-between items-center mb-4">
                                <div className="flex items-center gap-x-4 min-w-[18rem] overflow-auto">
                                  <div className="flex items-center gap-x-3 lt:mt-0 mt-2">
                                    {/* <p className="text-[#606970]">Item</p> */}
                                    <input
                                      type="checkbox"
                                      checked={isRidingAdded(item)}
                                      onChange={() => {
                                        handleAddRemoveRiding(item);
                                      }}
                                      className="w-6 h-6 rounded-sm cursor-pointer"
                                    />
                                    <p className="lg:mt-1 mt-0 font-bold">
                                      {item?.title}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col lg:gap-y-2">
                                  <div className="lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]">
                                    {/* <p className="text-[#606970]">Price</p> */}
                                    <p className="font-bold">
                                      ₦{formatPrice(item.price)}
                                    </p>
                                  </div>

                                  {/* <div className="lg:mt-0 mt-4">
                                <button
                                  onClick={() => handleAddRemoveRiding(item)}
                                  className="w-[8rem] h-[2.4rem] rounded-lg text-white bg-black"
                                >
                                  {isRidingAdded(item)
                                    ? "Remove Riding"
                                    : "Add Ridng"}
                                </button>
                              </div> */}
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                  {roomDecorationExtra?.length > 0 && (
                    <div className="my-4">
                      <div className="flex justify-between items-center gap-x-4">
                        <div className="flex items-center gap-x-4 ">
                          <img
                            src={Room}
                            alt=""
                            className="md:w-[80px] w-[60px] rounded-full bg-contain md:h-[5rem] h-[4rem]"
                          />
                          <h1 className="text-lg mb-3 ml-0 font-semibold">
                            Room Decoration
                          </h1>
                        </div>

                        <img
                          onClick={() =>
                            setshowRoomDecoration(!showRoomDecoration)
                          }
                          src={downIcon}
                          alt=""
                          className=" cursor-pointer"
                        />
                      </div>
                      {showRoomDecoration && (
                        <>
                          {filteredRoomDecorationExtras?.map((item, index) => (
                            <div key={index} className="mt-4">
                              <div className="flex flex-wrap justify-between items-center mb-4">
                                <div className="flex items-center gap-x-4 min-w-[18rem] overflow-auto">
                                  <div className="flex items-center gap-x-3 lt:mt-0 mt-2">
                                    {/* <p className="text-[#606970]">Item</p> */}
                                    <input
                                      type="checkbox"
                                      checked={isRoomDecorationAdded(item)}
                                      onChange={() => {
                                        handleAddRemoveRoomDecoration(item);
                                      }}
                                      className="w-6 h-6 rounded-sm cursor-pointer"
                                    />
                                    <p className="lg:mt-1 mt-0 font-bold">
                                      {item?.title}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col lg:gap-y-2">
                                  <div className="lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]">
                                    {/* <p className="text-[#606970]">Price</p> */}
                                    <p className="font-bold">
                                      ₦{formatPrice(item.price)}
                                    </p>
                                  </div>

                                  {/* <div className="lg:mt-0 mt-4">
                                <button
                                  onClick={() =>
                                    handleAddRemoveRoomDecoration(item)
                                  }
                                  className="w-auto px-4 h-[2.4rem] rounded-lg text-white bg-black"
                                >
                                  {isRoomDecorationAdded(item)
                                    ? "Remove Decoration"
                                    : "Add Decoration"}
                                </button>
                              </div> */}
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                  {diningExtra?.length > 0 && (
                    <div className="my-4">
                      <div className="flex justify-between items-center gap-x-4">
                        <div className="flex items-center gap-x-4 ">
                          <img
                            src={dining}
                            alt=""
                            className="md:w-[80px] w-[60px] rounded-full bg-contain md:h-[5rem] h-[4rem]"
                          />
                          <h1 className="text-lg mb-3 ml-0 font-semibold">
                            Dining Experience
                          </h1>
                        </div>

                        <img
                          onClick={() => setshowDining(!showDining)}
                          src={downIcon}
                          alt=""
                          className=" cursor-pointer"
                        />
                      </div>
                      {showDining && (
                        <>
                          {filteredDiningbreakfastExtras?.length > 0 && (
                            <>
                              <div>
                                <h1 className="text-lg mb-3 ml-0 font-semibold">
                                  Lookout Breakfast
                                </h1>
                              </div>
                              {filteredDiningbreakfastExtras?.map(
                                (item, index) => (
                                  <div key={index} className="mt-4">
                                    <div className="flex flex-wrap justify-between items-center mb-4">
                                      <div className="flex items-center gap-x-4 min-w-[18rem] overflow-auto">
                                        <div className="flex items-center gap-x-3 lt:mt-0 mt-2">
                                          {/* <p className="text-[#606970]">Item</p> */}
                                          <input
                                            type="checkbox"
                                            checked={isDiningAdded(item)}
                                            onChange={() => {
                                              handleAddRemoveDining(item);
                                            }}
                                            className="w-6 h-6 rounded-sm cursor-pointer"
                                          />
                                          <p className="lg:mt-1 mt-0 font-bold">
                                            {item?.title}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="flex flex-col lg:gap-y-2">
                                        <div className="lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]">
                                          {/* <p className="text-[#606970]">Price</p> */}
                                          <p className="font-bold">
                                            ₦{formatPrice(item.price)}
                                          </p>
                                        </div>

                                        {/* <div className="lg:mt-0 mt-4">
                                <button
                                  onClick={() =>
                                    handleAddRemoveRoomDecoration(item)
                                  }
                                  className="w-auto px-4 h-[2.4rem] rounded-lg text-white bg-black"
                                >
                                  {isRoomDecorationAdded(item)
                                    ? "Remove Decoration"
                                    : "Add Decoration"}
                                </button>
                              </div> */}
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </>
                          )}
                          {filteredDininglunchExtras?.length > 0 && (
                            <div>
                              <h1 className="text-lg mb-3 ml-0 font-semibold">
                                Lookout Lunch
                              </h1>
                              {filteredDininglunchExtras.map((item, index) => (
                                <div key={index} className="mt-4">
                                  <div className="flex flex-wrap justify-between items-center mb-4">
                                    <div className="flex items-center gap-x-4 min-w-[18rem] overflow-auto">
                                      <div className="flex items-center gap-x-3 lt:mt-0 mt-2">
                                        {/* <p className="text-[#606970]">Item</p> */}
                                        <input
                                          type="checkbox"
                                          checked={isDiningAdded(item)}
                                          onChange={() => {
                                            handleAddRemoveDining(item);
                                          }}
                                          className="w-6 h-6 rounded-sm cursor-pointer"
                                        />
                                        <p className="lg:mt-1 mt-0 font-bold">
                                          {item?.title}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex flex-col lg:gap-y-2">
                                      <div className="lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]">
                                        {/* <p className="text-[#606970]">Price</p> */}
                                        <p className="font-bold">
                                          ₦{formatPrice(item.price)}
                                        </p>
                                      </div>

                                      {/* <div className="lg:mt-0 mt-4">
                                <button
                                  onClick={() =>
                                    handleAddRemoveRoomDecoration(item)
                                  }
                                  className="w-auto px-4 h-[2.4rem] rounded-lg text-white bg-black"
                                >
                                  {isRoomDecorationAdded(item)
                                    ? "Remove Decoration"
                                    : "Add Decoration"}
                                </button>
                              </div> */}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          {filteredDiningdinnerExtras?.length > 0 && (
                            <div>
                              <h1 className="text-lg mb-3 ml-0 font-semibold">
                                Beachside Dinner
                              </h1>
                              {filteredDiningdinnerExtras.map((item, index) => (
                                <div key={index} className="mt-4">
                                  <div className="flex flex-wrap justify-between items-center mb-4">
                                    <div className="flex items-center gap-x-4 min-w-[18rem] overflow-auto">
                                      <div className="flex items-center gap-x-3 lt:mt-0 mt-2">
                                        {/* <p className="text-[#606970]">Item</p> */}
                                        <input
                                          type="checkbox"
                                          checked={isDiningAdded(item)}
                                          onChange={() => {
                                            handleAddRemoveDining(item);
                                          }}
                                          className="w-6 h-6 rounded-sm cursor-pointer"
                                        />
                                        <p className="lg:mt-1 mt-0 font-bold">
                                          {item?.title}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex flex-col lg:gap-y-2">
                                      <div className="lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]">
                                        {/* <p className="text-[#606970]">Price</p> */}
                                        <p className="font-bold">
                                          ₦{formatPrice(item.price)}
                                        </p>
                                      </div>

                                      {/* <div className="lg:mt-0 mt-4">
                                <button
                                  onClick={() =>
                                    handleAddRemoveRoomDecoration(item)
                                  }
                                  className="w-auto px-4 h-[2.4rem] rounded-lg text-white bg-black"
                                >
                                  {isRoomDecorationAdded(item)
                                    ? "Remove Decoration"
                                    : "Add Decoration"}
                                </button>
                              </div> */}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  {daypassExtensionExtra?.length > 0 && (
                    <div className="my-4">
                      <div className="flex justify-between items-center gap-x-4">
                        <div className="flex items-center gap-x-4 ">
                          <img
                            src={daypass}
                            alt=""
                            className="md:w-[80px] w-[60px] rounded-full bg-contain md:h-[5rem] h-[4rem]"
                          />
                          <h1 className="text-lg mb-3 ml-0 font-semibold">
                            Daypass Extension
                          </h1>
                        </div>

                        <img
                          onClick={() =>
                            setshowDaypassExtension(!showDaypassExtension)
                          }
                          src={downIcon}
                          alt=""
                          className=" cursor-pointer"
                        />
                      </div>
                      {showDaypassExtension && (
                        <>
                          {filteredDaypassExtensionExtras?.map(
                            (item, index) => (
                              <div key={index} className="mt-4">
                                <div className="flex flex-wrap justify-between items-center mb-4">
                                  <div className="flex items-center gap-x-4 min-w-[18rem] overflow-auto">
                                    <div className="flex items-center gap-x-3 lt:mt-0 mt-2">
                                      {/* <p className="text-[#606970]">Item</p> */}
                                      <input
                                        type="checkbox"
                                        checked={isDaypassExtensionAdded(item)}
                                        onChange={() => {
                                          handleAddRemoveDaypassExtension(item);
                                        }}
                                        className="w-6 h-6 rounded-sm cursor-pointer"
                                      />
                                      <p className="lg:mt-1 mt-0 font-bold">
                                        {item?.title}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex flex-col lg:gap-y-2">
                                    <div className="lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]">
                                      {/* <p className="text-[#606970]">Price</p> */}
                                      <p className="font-bold">
                                        ₦{formatPrice(item.price)}
                                      </p>
                                    </div>

                                    {/* <div className="lg:mt-0 mt-4">
                                <button
                                  onClick={() =>
                                    handleAddRemoveRoomDecoration(item)
                                  }
                                  className="w-auto px-4 h-[2.4rem] rounded-lg text-white bg-black"
                                >
                                  {isRoomDecorationAdded(item)
                                    ? "Remove Decoration"
                                    : "Add Decoration"}
                                </button>
                              </div> */}
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </>
                      )}
                    </div>
                  )}
                  {domesticStaffExtra?.length > 0 && (
                    <div className="my-4">
                      <div className="flex justify-between items-center gap-x-4">
                        <div className="flex items-center gap-x-4 ">
                          <img
                            src={bedroom}
                            alt=""
                            className="md:w-[80px] w-[60px] rounded-full bg-contain md:h-[5rem] h-[4rem]"
                          />
                          <h1 className="text-lg mb-3 ml-0 font-semibold">
                            Domestic Staff
                          </h1>
                        </div>

                        <img
                          onClick={() =>
                            setshowDomesticStaff(!showDomesticStaff)
                          }
                          src={downIcon}
                          alt=""
                          className=" cursor-pointer"
                        />
                      </div>
                      {showDomesticStaff && (
                        <>
                          {filteredDomesticStaffExtras?.map((item, index) => (
                            <div key={index} className="mt-4">
                              <div className="flex flex-wrap justify-between items-center mb-4">
                                <div className="flex items-center gap-x-4 min-w-[18rem] overflow-auto">
                                  <div className="flex items-center gap-x-3 lt:mt-0 mt-2">
                                    {/* <p className="text-[#606970]">Item</p> */}
                                    <input
                                      type="checkbox"
                                      checked={isDomesticStaffAdded(item)}
                                      onChange={() => {
                                        handleAddRemoveDomesticStaff(item);
                                      }}
                                      className="w-6 h-6 rounded-sm cursor-pointer"
                                    />
                                    <p className="lg:mt-1 mt-0 font-bold">
                                      {item?.title}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col lg:gap-y-2">
                                  <div className="lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]">
                                    {/* <p className="text-[#606970]">Price</p> */}
                                    <p className="font-bold">
                                      ₦{formatPrice(item.price)}
                                    </p>
                                  </div>

                                  {/* <div className="lg:mt-0 mt-4">
                                <button
                                  onClick={() =>
                                    handleAddRemoveDomesticStaff(item)
                                  }
                                  className="w-auto px-4 h-[2.4rem] rounded-lg text-white bg-black"
                                >
                                  {isDomesticStaffAdded(item)
                                    ? "Remove Staff"
                                    : "Add Staff"}
                                </button>
                              </div> */}
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                  {personalExtra?.length > 0 && (
                    <div className="my-4">
                      <div className="flex justify-between items-center gap-x-4">
                        <div className="flex items-center gap-x-4 ">
                          {/* <img
                        src={bedroom}
                        alt=""
                        className="md:w-[80px] w-[60px] rounded-full bg-contain md:h-[5rem] h-[4rem]"
                      /> */}
                          <h1 className="text-lg mb-3 ml-0 font-semibold">
                            Personal Extras
                          </h1>
                        </div>

                        <img
                          onClick={() => setshowPersonal(!showPersonal)}
                          src={downIcon}
                          alt=""
                          className=" cursor-pointer"
                        />
                      </div>
                      {showPersonal && (
                        <>
                          {filteredPersonalExtras?.map((item, index) => (
                            <div key={index} className="mt-4">
                              <div className="flex flex-wrap justify-between items-center mb-4">
                                <div className="flex items-center gap-x-4 min-w-[18rem] overflow-auto">
                                  <div>
                                    <img
                                      src={selectBg(item.title)}
                                      alt=""
                                      className="md:w-[80px] w-[60px] rounded-full bg-contain md:h-[5rem] h-[4rem]"
                                    />
                                  </div>
                                  <div className="flex items-center gap-x-3 lt:mt-0 mt-2">
                                    {/* <p className="text-[#606970]">Item</p> */}
                                    <input
                                      type="checkbox"
                                      checked={isPersonalAdded(item)}
                                      onChange={() => {
                                        handleAddRemovePersonal(item);
                                      }}
                                      className="w-6 h-6 rounded-sm cursor-pointer"
                                    />
                                    <p className="lg:mt-1 mt-0 font-bold">
                                      {item?.title}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col lg:gap-y-2">
                                  <div className="lg:block flex gap-x-3 lt:mt-0 mt-2 min-w-[8rem]">
                                    {/* <p className="text-[#606970]">Price</p> */}
                                    <p className="font-bold">
                                      ₦{formatPrice(item.price)}
                                    </p>
                                  </div>

                                  {/* <div className="lg:mt-0 mt-4">
                                <button
                                  onClick={() => handleAddRemovePersonal(item)}
                                  className="w-[fit] px-1 h-[2.4rem] rounded-lg text-white bg-black"
                                >
                                  {isPersonalAdded(item)
                                    ? `Remove ${item.title}`
                                    : `Add ${item.title}`}
                                </button>
                              </div> */}
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Extras;
