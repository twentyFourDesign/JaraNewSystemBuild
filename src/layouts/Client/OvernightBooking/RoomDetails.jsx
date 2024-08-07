import React, { useEffect } from "react";
import OvernightSteps from "../../../components/OvernightSteps";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import OvernightReservation from "../../../components/OvernightReservation";
import { useState } from "react";
import Extras from "../../../components/Extras";
import axios from "axios";
import { baseUrl } from "../../../constants/baseurl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { insert } from "../../../store/slices/overnight/roomDetails.slice";
import toast from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, InputAdornment } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import dayjs from "dayjs";
import { FiRefreshCcw } from "react-icons/fi";
import arrow from "../../../assets/arrowLeft.png";
import arrowR from "../../../assets/arrowRIght.png";
const RoomDetails = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [showPopup, setshowPopup] = useState(false);
  const [roomId, setroomId] = useState(null);
  const [modifiedRoom, setModifiedRoom] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [finalData, setFinalData] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    visitDate: null,
    endDate: null,
  });

  const guestCount = useSelector((state) => state.overnightGuestCount);

  const incrementQuantity = (maxCapacity) => {
    setQuantity((currentQuantity) =>
      currentQuantity < maxCapacity ? currentQuantity + 1 : currentQuantity
    );
  };

  const decrementQuantity = () => {
    setQuantity((currentQuantity) =>
      currentQuantity > 1 ? currentQuantity - 1 : currentQuantity
    );
  };

  const handleClickSave = (room, price) => {
    setshowPopup(false);
    setroomId(null);
    const existingRoomIndex = selectedRooms.findIndex(
      (selectedRoom) => selectedRoom.id === room.id
    );
    if (existingRoomIndex !== -1) {
      const updatedRooms = selectedRooms.map((selectedRoom, index) =>
        index === existingRoomIndex
          ? { ...selectedRoom, quantity, price }
          : selectedRoom
      );
      setSelectedRooms(updatedRooms);
    } else {
      setSelectedRooms([...selectedRooms, { ...room, quantity, price }]);
    }
    setQuantity(1);
  };

  const hasSelectedDates = selectedDate.visitDate && selectedDate.endDate; // Check if both dates are selected
  const hasSelectedRoom = selectedRooms.length > 0; // Check if at least one room is selected
  const isValid = hasSelectedDates && hasSelectedRoom;

  useEffect(() => {
    let requestData = null;
    if (selectedDate.visitDate && selectedDate.endDate) {
      const visitDateObj = new Date(selectedDate.visitDate);
      const endDateObj = new Date(selectedDate.endDate);
      requestData = {
        visitDate: visitDateObj.toLocaleDateString("en-CA"),
        endDate: endDateObj.toLocaleDateString("en-CA"),
      };
    }
    // selectedDate
    axios
      .post(`${baseUrl}/main/rooms/sub/get/dynamic/all`, requestData)
      .then((res) => {
        console.log(res.data);
        const groupedRooms = res.data.reduce((acc, room) => {
          const { title, price } = room.roomId;
          const existingGroup = acc.find((group) => group.ref === title);
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
        console.log("grouped rooms", groupedRooms);
      });
  }, [selectedDate]);

  const handleNext = () => {
    let totalAdults = 0;
    let totalChildren = 0;
    let totalInfants = 0;
    let totalToddlers = 0;

    selectedRooms.forEach((room) => {
      console.log(room, "rooom");
      totalAdults += room.adult * room.quantity;
      totalChildren += room.children * room.quantity;
      totalInfants += room.infant * room.quantity;
      totalToddlers += room.toodler * room.quantity;
    });
    console.log("Calculated Totals:");
    console.log("Adults:", totalAdults, "vs Booked:", guestCount.adults);
    console.log("Children:", totalChildren, "vs Booked:", guestCount.children);
    console.log("Infants:", totalInfants, "vs Booked:", guestCount.infants);
    console.log("Toddlers:", totalToddlers, "vs Booked:", guestCount.toddler);
    console.log("GUest Adults", guestCount.adults);

    if (!guestCount.adults) {
      toast.error("Please Return back and Select Number of Adults");
      return;
    }
    if (!selectedDate.visitDate || !selectedDate.endDate) {
      toast.error("Please Select Dates");
      return;
    }

    if (
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

      selectedRooms.forEach((room) => {
        room.guestCount = {
          adults: guestCount.adults,
          children: guestCount.children,
          infants: guestCount.infants,
          toodler: guestCount.toddler,
          ages: guestCount.ages,
        };
      });
      dispatch(
        insert({ selectedRooms, ...serializableSelectedDate, finalData })
      );
      nav("/overnight/details");
    } else {
      toast.error("Please Select More Rooms ");
      console.log("u cannot fit");
    }
  };

  const getSelectedCount = () => {};

  useEffect(() => {
    getSelectedCount();
  }, [selectedRooms]);

  return (
    <div>
      <div className="xl:flex w-screen justify-between items-start bg-[#eff6ff] p-[1rem] font-robotoFont flex-wrap overflow-x-auto">
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
                  Stay & Room Details
                </h1>
                <p className="text-[#606970] text-sm mt-1">
                  Select the check-in and check-out dates you would like to stay
                  (nights you will be sleeping).
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
                      minDate={dayjs()} // Add this line to set the minimum date to today
                    />
                  </div>
                </div>
              </LocalizationProvider>
              {/* FOR ROOM TYPES  */}

              <div className="mt-4">
                <h1 className="text-lg font-bold ">
                  Which room you are staying in?
                </h1>
                <p className="text-[#606970] text-sm mt-1">
                  Select your desired room type for luxury stay and decide how
                  many people will be in each room.
                </p>
              </div>

              {/* MAIN ROOM TYPES  */}
              <div className="mt-4 flex ">
                {modifiedRoom?.length > 0 &&
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
                            className="relative min-w-[8rem] h-[2.4rem] mt-2 flex justify-center flex-wrap items-center bg-white rounded-xl cursor-pointer"
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
                              <div className="absolute top-[-9rem] left-[0rem] right-0 w-[13rem] sm:w-[18rem] h-[8rem] bg-white shadow-shadow1  rounded-md p-2 z-50">
                                <h1>Add/minus your guests</h1>
                                <div className="flex justify-between items-center mt-1">
                                  <div>
                                    <p className="text-sm">
                                      Available Room: {room.capacity}
                                    </p>
                                  </div>
                                  <div className="flex justify-center gap-x-2 items-center text-white bg-[#75A9BF] w-[6rem] h-[2rem] rounded-xl">
                                    <AiOutlineMinus
                                      className="cursor-pointer"
                                      onClick={() => decrementQuantity()}
                                    />
                                    <p>{quantity}</p>
                                    <AiOutlinePlus
                                      className="cursor-pointer"
                                      onClick={() =>
                                        incrementQuantity(room.capacity)
                                      }
                                    />
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    handleClickSave(room, item.price)
                                  }
                                  className="mt-4 bg-black w-[100%] h-[2rem] text-white rounded-md z-50"
                                >
                                  Save
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

              <p className="text-[#606970] text-sm mt-3">
                *Available rooms are showing based your selected check-in and
                check-out dates above.
              </p>

              {/* EXTRAS  */}
              <div>
                <Extras
                  setFinalData={setFinalData}
                  finalData={finalData}
                  type={"overnight"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RESERVATION  */}
        <div className="min-w-[18rem] pr-4">
          <div className="min-w-[18rem] h-[30rem] mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md">
            <OvernightReservation />
          </div>
          <div className="min-w-[18rem] ">
            <div className="flex flex-col  items-center gap-y-2 pt-4">
              <div
                className="flex  w-full p-2 border-2 border-black bg-[#F1F5F8] rounded-xl gap-x-2 justify-center items-center text-black cursor-pointer"
                onClick={() => nav("/")}
              >
                {/* <img src={Edit} alt="icon" className="w-[1rem]" /> */}
                <FiRefreshCcw />
                <p className="font-[500] text-xl">Restart Booking</p>
              </div>
              <div
                onClick={() => nav("/overnight/guest")}
                className=" flex w-full p-2 border-2 border-black bg-[#C8D5E0] rounded-xl gap-x-2 justify-center items-center text-black cursor-pointer"
              >
                <img src={arrow} alt="icon" className="w-[1rem]" />
                <p className="font-[500] text-xl">Back</p>
              </div>
              <div className="w-full">
                <button
                  onClick={handleNext}
                  // disabled={!isValid}
                  className={`w-full p-2 gap-x-4 ${
                    isValid
                      ? "cursor-pointer bg-black"
                      : "bg-[#D2D2D2] cursor-not-allowed"
                  } text-white rounded-xl flex items-center justify-center font-robotoFont`}
                >
                  <p className={"font-[500] text-xl"}>Continue</p>
                  <img src={arrowR} alt="icon" className="w-[1rem]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER  */}

      <div className="w-screen bg-black text-white">
        <div className="flex justify-between items-center px-7 mt-3 pb-3">
          <p>© 2023 JARA BEACH RESORT</p>
          <p>owned and operated by Little Company Nigeria Limited</p>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
