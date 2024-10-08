import React, { useEffect, useContext } from "react";
import OvernightSteps from "../../../components/OvernightSteps";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import OvernightReservation from "../../../components/OvernightReservation";
import { useState } from "react";
import Extras from "../../../components/Extras";
import axios from "axios";
import { baseUrl } from "../../../constants/baseurl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { insert } from "../../../store/slices/overnight/roomDetails.slice";
import toast from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FiRefreshCcw } from "react-icons/fi";
import arrow from "../../../assets/arrowLeft.png";
import arrowR from "../../../assets/arrowRIght.png";
import { reset as resetGuestInfo } from "../../../store/slices/overnight/guestInfo.slice";
import { reset as resetGuestCount } from "../../../store/slices/overnight/overnightGuest.slice";
import { reset as resetRoomDetails } from "../../../store/slices/overnight/roomDetails.slice";
import { ImCross } from "react-icons/im";
import { ClipLoader } from "react-spinners";
import { PriceContext } from "../../../Context/PriceContext";
import { Tooltip } from "react-tooltip";

const RoomDetails = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [showPopup, setshowPopup] = useState(false);
  const [roomId, setroomId] = useState(null);
  const [modifiedRoom, setModifiedRoom] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [finalData, setFinalData] = useState([]);
  const [occupancyRules, setOccupancyRules] = useState({});
  // const [numberOfNights, setNumberOfNights] = useState(0);
  const [selectedDate, setSelectedDate] = useState({
    visitDate: null,
    endDate: null,
  });
  const [selectedRoomIds, setSelectedRoomIds] = useState([]);

  const [showTooltip, setShowTooltip] = useState(false);
  const {
    calPrice,
    setPrice,
    setPreviousCost,
    setDiscount,
    setVoucher,
    numberOfNights,
    setNumberOfNights,
  } = useContext(PriceContext);

  const handleRestart = () => {
    dispatch(resetGuestInfo());
    dispatch(resetGuestCount());
    dispatch(resetRoomDetails());
    setPrice(0);
    setDiscount(null);
    setVoucher(null);
    setPreviousCost(0);
    nav("/");
  };
  const guestCount = useSelector((state) => state.overnightGuestCount);

  const handleClickSave = (room, price) => {
    setshowPopup(false);
    setroomId(null);
    const existingRoomIndex = selectedRooms.findIndex(
      (selectedRoom) => selectedRoom.id === room.id
    );
    if (existingRoomIndex === -1) {
      setSelectedRooms([...selectedRooms, { ...room, quantity, price }]);
    } else {
      const updatedRooms = selectedRooms.filter(
        (selectedRoom) => selectedRoom.id !== room.id
      );
      setSelectedRooms([...updatedRooms]);
    }
    setQuantity(1);
    setSelectedRoomIds((prevIds) =>
      existingRoomIndex === -1
        ? [...prevIds, room.id]
        : prevIds.filter((id) => id !== room.id)
    );
    // Recalculate price when a room is selected
    // setshowPopup(false);
    // setroomId(null);
    // const existingRoomIndex = selectedRooms.findIndex(
    //   (selectedRoom) => selectedRoom.id === room.id
    // );
    // if (existingRoomIndex !== -1) {
    //   const updatedRooms = selectedRooms.map((selectedRoom, index) =>
    //     index === existingRoomIndex
    //       ? { ...selectedRoom, quantity, price }
    //       : selectedRoom
    //   );
    //   setSelectedRooms(updatedRooms);
    // } else {
    //   setSelectedRooms([...selectedRooms, { ...room, quantity, price }]);
    // }
    // setQuantity(1);
    // setSelectedRoomIds((prevIds) => {
    //   if (prevIds.includes(room.id)) {
    //     return prevIds.filter((id) => id !== room.id);
    //   } else {
    //     return [...prevIds, room.id];
    //   }
    // });

    // setPrice(calPrice()); // Recalculate price when a room is selected
  };
  useEffect(() => {
    // if (selectedRooms.length > 0) {
    const visitDateObj2 = new Date(
      selectedDate.visitDate ? selectedDate.visitDate : null
    );
    const endDateObj2 = new Date(
      selectedDate.endDate ? selectedDate.endDate : null
    );
    const serializableSelectedDate = {
      ...selectedDate,
      visitDate: selectedDate.visitDate
        ? visitDateObj2.toLocaleDateString("en-CA")
        : null,
      endDate: selectedDate.endDate
        ? endDateObj2.toLocaleDateString("en-CA")
        : null,
    };

    dispatch(insert({ selectedRooms, ...serializableSelectedDate, finalData }));
    setPrice(calPrice()); // Recalculate price when a room is selected
    // }
  }, [selectedRooms, finalData, selectedDate]);
  const hasSelectedDates = selectedDate.visitDate && selectedDate.endDate;
  const hasSelectedRoom = selectedRooms.length > 0;
  const isValid = hasSelectedDates && hasSelectedRoom;

  const updateOccupancyRules = (modifiedRoom) => {
    const updatedOccupancyRules = {};

    modifiedRoom.forEach((room) => {
      const roomType = room.ref.trim();
      const details = room.details;

      if (details.length > 0) {
        const firstDetail = details[0];
        updatedOccupancyRules[roomType] = [
          { adults: firstDetail.adult, children: 0, toddlers: 0, infants: 1 },
          {
            adults: firstDetail.adult - 1,
            children: 1,
            toddlers: 0,
            infants: 1,
          },
          {
            adults: firstDetail.adult - 1,
            children: 0,
            toddlers: 1,
            infants: 1,
          },
          {
            adults: firstDetail.adult - 2,
            children: 1,
            toddlers: 1,
            infants: 1,
          },
          {
            adults: firstDetail.adult - 1,
            children: 1,
            toddlers: 1,
            infants: 0,
          },
        ];
      }
    });

    return updatedOccupancyRules;
  };

  useEffect(() => {
    let requestData = null;

    if (selectedDate.visitDate && selectedDate.endDate) {
      const visitDateObj = new Date(selectedDate.visitDate);
      const endDateObj = new Date(selectedDate.endDate);
      const numberOfNights =
        (endDateObj - visitDateObj) / (1000 * 60 * 60 * 24);
      setNumberOfNights(numberOfNights);
      requestData = {
        visitDate: visitDateObj.toLocaleDateString("en-CA"),
        endDate: endDateObj.toLocaleDateString("en-CA"),
      };
    }
    if (!requestData) return;
    axios
      .post(`${baseUrl}/main/rooms/sub/get/dynamic/all`, requestData)
      .then((res) => {
        const groupedRooms = res.data.reduce((acc, room) => {
          const { title, price } = room.roomId;
          const existingGroup = acc.find((group) => group.ref === title);
          // console.log("existingGroup", existingGroup);
          if (existingGroup) {
            existingGroup.details.push({
              title: room.title,
              booked: room.booked,
              capacity: room.capacity,
              id: room._id,
              adult: room.adults,
              children: room.children,
              infant: room.infant,
              toodler: room.toddler,
            });
          } else {
            acc.push({
              ref: title,
              price: price,
              details: [
                {
                  title: room.title,
                  booked: room.booked,
                  capacity: room.availableRoom,
                  id: room._id,
                  adult: room.adults,
                  children: room.children,
                  infant: room.infant,
                  toodler: room.toddler,
                },
              ],
            });
          }
          return acc;
        }, []);
        setModifiedRoom(groupedRooms);
        const updatedRules = updateOccupancyRules(groupedRooms);
        setOccupancyRules(updatedRules);
        // console.log("groupedRooms", groupedRooms);
      });
  }, [selectedDate]);
  // console.log(selectedRooms);
  // const occupancyRulesw = {
  //   "Ocean Deluxe": [
  //     { adults: 2, children: 0, toddlers: 0, infants: 1 },
  //     { adults: 1, children: 1, toddlers: 0, infants: 1 },
  //     { adults: 1, children: 1, toddlers: 1, infants: 0 },
  //   ],
  //   "Family Room": [
  //     { adults: 5, children: 0, toddlers: 0, infants: 1 },
  //     { adults: 4, children: 1, toddlers: 0, infants: 1 },
  //     { adults: 4, children: 1, toddlers: 1, infants: 0 },
  //   ],
  //   "FAMILY CABINS": [
  //     { adults: 5, children: 0, toddlers: 0, infants: 1 },
  //     { adults: 4, children: 1, toddlers: 0, infants: 1 },
  //     { adults: 4, children: 1, toddlers: 1, infants: 0 },
  //   ],

  //   "Villa (Sunrise)": [
  //     { adults: 5, children: 0, toddlers: 0, infants: 1 },
  //     { adults: 4, children: 1, toddlers: 0, infants: 1 },
  //     { adults: 4, children: 1, toddlers: 1, infants: 0 },
  //   ],
  //   "Villa (Sunset)": [
  //     { adults: 5, children: 0, toddlers: 0, infants: 1 },
  //     { adults: 4, children: 1, toddlers: 0, infants: 1 },
  //     { adults: 4, children: 1, toddlers: 1, infants: 0 },
  //   ],
  //   Studios: [
  //     { adults: 4, children: 0, toddlers: 0, infants: 1 },
  //     { adults: 3, children: 1, toddlers: 0, infants: 1 },
  //     { adults: 3, children: 1, toddlers: 1, infants: 0 },
  //   ],
  //   "Family Deluxe (The Loft)": [
  //     { adults: 5, children: 0, toddlers: 0, infants: 1 },
  //     { adults: 4, children: 1, toddlers: 0, infants: 1 },
  //     { adults: 4, children: 1, toddlers: 1, infants: 0 },
  //   ],
  // };
  console.log(occupancyRules);
  const validateGuestCount = (roomType, guestCount) => {
    const rules = occupancyRules[roomType];
    if (!rules) return false;
    const numChildren = guestCount?.ages?.filter((age) =>
      age.includes("child")
    ).length;
    const numToddlers = guestCount?.ages?.filter((age) =>
      age.includes("toddler")
    ).length;
    const numInfants = guestCount?.ages?.filter((age) =>
      age.includes("infant")
    ).length;
    // console.log(guestCount.adults, numChildren, numToddlers, numInfants);
    // console.log(rules);
    const isValid = rules.some(
      (rule) =>
        guestCount.adults <= rule.adults &&
        numChildren <= rule.children &&
        numToddlers <= rule.toddlers &&
        numInfants <= rule.infants
    );

    // console.log(`Is valid: ${isValid}`);
    return isValid;
  };
  const handleNext = () => {
    let totalAdults = 0;
    let totalChildren = 0;
    let totalInfants = 0;
    let totalToddlers = 0;

    selectedRooms?.forEach((room) => {
      totalAdults += room.adult * room.quantity;
      totalChildren += room.children * room.quantity;
      totalInfants += room.infant * room.quantity;
      totalToddlers += room.toodler * room.quantity;
    });

    if (!guestCount.adults) {
      toast.error("Please Return back and Select Number of Adults");
      return;
    }
    if (!selectedDate.visitDate || !selectedDate.endDate) {
      toast.error("Please Select Dates");
      return;
    }
    const isValidOccupancy = selectedRooms?.every((room) => {
      const groupedRoom = modifiedRoom.find((group) =>
        group.details.some((detail) => detail.title === room.title)
      );

      if (groupedRoom) {
        const reference = groupedRoom.ref;
        const isValid = validateGuestCount(reference.trim(), guestCount);
        // console.log(`Room: ${room.title}, Is valid: ${isValid}`);
        return isValid;
      }
      // validateGuestCount(room.title, guestCount)
    });
    // console.log("isValidOccupancy", isValidOccupancy);

    if (isValidOccupancy) {
      console.log("u can fit ");
      const visitDateObj2 = new Date(selectedDate.visitDate);
      const endDateObj2 = new Date(selectedDate.endDate);
      const serializableSelectedDate = {
        ...selectedDate,
        visitDate: visitDateObj2.toLocaleDateString("en-CA"),
        endDate: endDateObj2.toLocaleDateString("en-CA"),
      };
      const updatedRooms = selectedRooms.map((room) => ({
        ...room,
        guestCount: {
          adults: guestCount.adults,
          children: guestCount.children,
          infants: guestCount.infants,
          toodler: guestCount.toddler,
          ages: guestCount.ages,
        },
      }));

      dispatch(
        insert({
          selectedRooms: updatedRooms,
          ...serializableSelectedDate,
          finalData,
        })
      );
      nav("/overnight/extras", {
        state: { selectedRooms: updatedRooms, ...serializableSelectedDate },
      });
    } else if (
      selectedRooms?.length > 1 &&
      totalAdults >= guestCount.adults &&
      totalChildren >= guestCount.children &&
      totalInfants >= guestCount.infants &&
      totalToddlers >= guestCount.toddler
    ) {
      console.log("u can fit ");
      const visitDateObj2 = new Date(selectedDate.visitDate);
      const endDateObj2 = new Date(selectedDate.endDate);
      const serializableSelectedDate = {
        ...selectedDate,
        visitDate: visitDateObj2.toLocaleDateString("en-CA"),
        endDate: endDateObj2.toLocaleDateString("en-CA"),
      };
      const updatedRooms = selectedRooms.map((room) => ({
        ...room,
        guestCount: {
          adults: guestCount.adults,
          children: guestCount.children,
          infants: guestCount.infants,
          toodler: guestCount.toddler,
          ages: guestCount.ages,
        },
      }));

      dispatch(
        insert({
          selectedRooms: updatedRooms,
          ...serializableSelectedDate,
          finalData,
        })
      );
      nav("/overnight/extras", {
        state: { selectedRooms: updatedRooms, ...serializableSelectedDate },
      });
    } else {
      toast.error("Please Select More Rooms ");
      console.log("u cannot fit");
    }
  };

  const getSelectedCount = () => {};

  useEffect(() => {
    getSelectedCount();
  }, [selectedRooms]);
  useEffect(() => {
    if (isValid) {
      // console.log("being shown");
      setShowTooltip(true);
      // const timer = setTimeout(() => setShowTooltip(false), 5000); // Hide tooltip after 4 seconds
      // return () => clearTimeout(timer);
    }
  }, [isValid]);

  return (
    <div>
      <div className="xl:flex w-screen justify-between items-start bg-[white] p-[1rem] font-robotoFont flex-wrap overflow-x-auto">
        <div className="w-[100%] lg:w-[70%]  gap-x-3">
          {/* SETPS  */}
          <div className="w-[100%] overflow-x-auto flex justify-center items-center">
            <div className="w-[100%] lg:w-[90%]">
              <OvernightSteps step={2} />
            </div>
          </div>

          {/* MAIN CONTENT  */}
          <div className="mt-6  lg:mt-10 w-[100%] flex justify-start items-center pl-0 md:pl-[5%]">
            <div className="">
              <div>
                <h1 className="text-3xl font-bold md:text-xl  ">
                  Select Date(s) & Room(s)
                </h1>
                <p className="text-[#606970] text-sm mt-1">
                  Select the check-in and check-out dates you would like to
                  stay.
                </p>
              </div>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex gap-9 mt-3">
                  <div className="flex flex-col w-full md:flex-row gap-9 mt-3">
                    <DatePicker
                      label="Check-in Date"
                      value={selectedDate?.visitDate || null}
                      onChange={(newValue) => {
                        if (
                          newValue &&
                          selectedDate.endDate &&
                          selectedDate.endDate.isBefore(newValue)
                        ) {
                          toast.error("End date must be after the start date");
                          setSelectedDate({ ...selectedDate, visitDate: null });
                        } else {
                          setSelectedDate({
                            ...selectedDate,
                            visitDate: newValue,
                          });
                        }
                      }}
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          InputProps: {
                            style: {
                              // backgroundColor: selectedDate.visitDate
                              //   ? "inherit"
                              //   : "inherit",
                              color: selectedDate.visitDate
                                ? "black"
                                : "inherit",
                            },
                          },
                          label: "Check-in Date",
                        },
                      }}
                      minDate={dayjs()} // Add this line to set the minimum date to today
                    />

                    <DatePicker
                      label="Check-out Date"
                      disabled={selectedDate.visitDate ? false : true}
                      value={selectedDate?.endDate || null}
                      onChange={(newValue) => {
                        if (
                          newValue &&
                          selectedDate.visitDate &&
                          newValue.isBefore(selectedDate.visitDate)
                        ) {
                          toast.error("End date must be after the start date");
                          setSelectedDate({ ...selectedDate, endDate: null });
                        } else {
                          setSelectedDate({
                            ...selectedDate,
                            endDate: newValue,
                          });
                        }
                      }}
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          InputProps: {
                            style: {
                              // backgroundColor: selectedDate.endDate
                              //   ? "#75A9BF"
                              //   : "inherit",
                              color: selectedDate.endDate ? "black" : "inherit",
                            },
                          },
                          label: "Check-out Date",
                        },
                      }}
                      minDate={
                        selectedDate.visitDate
                          ? dayjs(selectedDate.visitDate).add(1, "day")
                          : dayjs() // Add this line to set the minimum date to 1 day after the checkin date
                      }
                    />
                  </div>
                </div>
              </LocalizationProvider>
              {/* FOR ROOM TYPES  */}
              <div className="mt-4 flex flex-col">
                <h1>How Long are you staying?</h1>
                <span className="px-3 py-2 bg-[#75A9BF] text-white rounded-md max-w-max ">
                  {numberOfNights === 1
                    ? `${numberOfNights} Night`
                    : `${numberOfNights} Nights`}
                </span>
              </div>
              <div className="mt-4">
                <h1 className="text-lg font-bold ">
                  Which room you are staying in?
                </h1>
                <p className="text-[#606970] text-sm mt-1">
                  Select your desired room type and decide how many people will
                  be in each room.
                </p>
              </div>

              {/* MAIN ROOM TYPES  */}
              <div className="mt-4 flex flex-col ">
                {modifiedRoom?.length > 0 ? (
                  modifiedRoom.map((item, index) => (
                    <div key={index} className="lg:flex  gap-x-10 items-center">
                      <div>
                        <h1 className="text-medium font-bold mt-2 w-[12rem] md:w-[6rem] truncate ">
                          {item?.ref}
                        </h1>
                      </div>
                      <div className="flex-1 flex gap-x-3 lg:mt-0 mt-3 flex-wrap">
                        {item?.details.map((room, index) => (
                          <div
                            key={index}
                            className={`relative min-w-[8rem] h-[2.4rem] mt-2 flex justify-center flex-wrap items-center rounded-xl cursor-pointer ${
                              selectedRoomIds.includes(room.id)
                                ? "bg-[#75A9BF] text-white"
                                : "bg-white"
                            }`}
                          >
                            <p
                              className="text-sm"
                              onClick={() => {
                                setroomId(room.id), setshowPopup(true);
                              }}
                            >
                              {room.title}
                            </p>
                            {showPopup && roomId === room.id && (
                              <>
                                <div className="absolute top-[-9rem] left-[0rem] right-0 w-[13rem] sm:w-[18rem] h-auto bg-white text-black shadow-shadow1  rounded-md p-2 z-50">
                                  <h1 className="text-lg text-black font-bold text-center">
                                    Capacity of {room.title}
                                  </h1>
                                  <ImCross
                                    onClick={() => setshowPopup(false)}
                                    className="absolute top-2 right-2 text-sm text-blackcursor-pointer"
                                  />
                                  <div className="flex flex-col justify-center items-center mt-1">
                                    <div>
                                      <p className="text-sm text-center text-black">
                                        <span className="font-bold text-[#75A9BF]">
                                          Adults
                                        </span>
                                        : {room.adult} <br />
                                        <span className="font-bold text-[#75A9BF]">
                                          Infant
                                        </span>
                                        : {room.infant} <br />
                                        <span>OR</span> <br />
                                        {room.adult - 1} :{" "}
                                        <span className="font-bold text-[#75A9BF]">
                                          Adult
                                        </span>{" "}
                                        <br />
                                        {room.children}:{" "}
                                        <span className="font-bold text-[#75A9BF]">
                                          {" "}
                                          child or Toodler
                                        </span>{" "}
                                        <br />
                                        {room.infant}:{" "}
                                        <span className="font-bold text-[#75A9BF]">
                                          Infant
                                        </span>
                                      </p>
                                    </div>

                                    <button
                                      onClick={() =>
                                        handleClickSave(room, item.price)
                                      }
                                      className="mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50"
                                    >
                                      {selectedRoomIds.includes(room.id)
                                        ? "Remove Room"
                                        : "Select Room"}
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : selectedDate.visitDate && selectedDate.endDate ? (
                  <div className="w-full text-center mt-3">
                    <ClipLoader color="#000000" size={35} />
                  </div>
                ) : null}
              </div>

              <p className="text-[#606970] text-sm mt-3">
                *Available rooms are showing based on your selected check-in and
                check-out dates above.
              </p>

              {/* EXTRAS  */}
              {/* <div>
                <Extras
                  setFinalData={setFinalData}
                  finalData={finalData}
                  type={"overnight"}
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* RESERVATION  */}
        <div className="w-auto mt-4 xl:mt-0 mx-4 md:mx-0 px-4 md:pr-4 md:px-2">
          <div className="w-full xl:max-w-[18rem] h-auto mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md">
            <OvernightReservation />
          </div>
          <div className="min-w-[18rem] ">
            <div className="flex flex-col  items-center gap-y-2 pt-4">
              <div className="w-full relative">
                <button
                  onClick={handleNext}
                  data-tooltip-id="continueTooltip"
                  className={`w-full p-2 gap-x-4 ${
                    isValid
                      ? "cursor-pointer bg-black"
                      : "bg-[#D2D2D2] cursor-not-allowed"
                  } text-white rounded-xl flex items-center  justify-center font-robotoFont`}
                >
                  <p className={"font-[500] text-xl"}>Continue</p>
                  <img src={arrowR} alt="icon" className="w-[1rem]" />
                </button>
                <Tooltip
                  id="continueTooltip"
                  place="top"
                  content="Happy with your room choice? Please continue"
                  isOpen={showTooltip}
                  style={{
                    backgroundColor: "#FFD562",
                    color: "black",
                    padding: "8px",
                    borderRadius: "10px",
                    fontSize: "15px",
                    height: "50px",
                    textAlign: "center",
                    verticalAlign: "center",
                  }}
                />
              </div>
              <div
                onClick={() => nav("/overnight/guest")}
                className=" flex w-full p-2 border-2 border-black bg-[#C8D5E0] rounded-xl gap-x-2 justify-center items-center text-black cursor-pointer"
              >
                <img src={arrow} alt="icon" className="w-[1rem]" />
                <p className="font-[500] text-xl">Back</p>
              </div>
              <div
                className="flex  w-full p-2 border-2 border-black bg-[#F1F5F8] rounded-xl gap-x-2 justify-center items-center text-black cursor-pointer"
                onClick={handleRestart}
              >
                {/* <img src={Edit} alt="icon" className="w-[1rem]" /> */}
                <FiRefreshCcw />
                <p className="font-[500] text-xl">Restart Booking</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER  */}

      <div className="mt-3 gap-4 md:gap-0 flex justify-between items-center w-screen bg-[#9DD4D3] text-black font-rubic py-3 md:px-5  px-2 text-sm ">
        <div>
          <p>© {new Date().getFullYear()} JARA BEACH RESORT</p>
        </div>
        <div>
          <p className="text-right max-w-[300px] md:max-w-full">
            Owned and Operated By Little Company Nigeria Limited
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
