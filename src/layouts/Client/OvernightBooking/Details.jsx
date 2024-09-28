import React, { useState, useEffect, useContext } from "react";
import upload from "../../../assets/Vector.png";
import OvernightReservation from "../../../components/OvernightReservation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OvernightSteps from "../../../components/OvernightSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { insert } from "../../../store/slices/overnight/guestInfo.slice";
import GuestForm from "../../../components/GuestForm";
import { FiRefreshCcw } from "react-icons/fi";
import toast from "react-hot-toast";
import arrow from "../../../assets/arrowLeft.png";

import arrowR from "../../../assets/arrowRIght.png";

import { reset as resetGuestInfo } from "../../../store/slices/overnight/guestInfo.slice";
import { reset as resetGuestCount } from "../../../store/slices/overnight/overnightGuest.slice";
import { reset as resetRoomDetails } from "../../../store/slices/overnight/roomDetails.slice";
import { PriceContext } from "../../../Context/PriceContext";

const Details = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const guestCount = useSelector(
    (state) => state.overnightGuestCount.adults || 0
  );
  const { setPrice, setPreviousCost, setDiscount, setVoucher } =
    useContext(PriceContext);
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
  const guests = useSelector((state) => state.overnightGuestDetails);
  // console.log(guests);
  const [isNamesValid, setIsNamesValid] = useState(false);

  const [userDetails, setuserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
    para: "",
    dateOfBirth: "",
    mailLitst: false,
    keepInfo: false,
    file: "",
    aboutUs: "",
    guests: Array.from({ length: guestCount }, (_, i) => ({
      id: i + 1,
      firstName: "",
      lastName: "",
      room: "",
    })),
  });
  const updateGuest = (id, field, value) => {
    setuserDetails((prevState) => ({
      ...prevState,
      guests: prevState.guests.map((guest) =>
        guest.id === id ? { ...guest, [field]: value } : guest
      ),
    }));
  };

  const validateGuests = () => {
    if (!userDetails.guests) return;
    const isNamesValid = userDetails.guests?.every(
      (guest) => guest.firstName && guest.lastName && guest.room
    ); // Example validation
    setIsNamesValid(isNamesValid);
  };
  useEffect(() => {
    // Step 3: Use Effect for Validation
    validateGuests();
  }, [userDetails.guests]);

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  const isValid =
    userDetails.firstname &&
    userDetails.lastname &&
    userDetails.email &&
    userDetails.phone &&
    userDetails.gender &&
    userDetails.dateOfBirth &&
    userDetails.aboutUs &&
    userDetails.file;
  // console.log(userDetails.dateOfBirth);

  const acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
  ];
  const onSubmit = async () => {
    if (!isValid) {
      toast.error("Please fill all the fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    const phoneRegex =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    if (!phoneRegex.test(userDetails.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (calculateAge(userDetails.dateOfBirth) < 18) {
      toast.error("You must be above 18 years old");
      return;
    }
    if (
      userDetails.file &&
      !acceptedFileTypes.includes(userDetails.file.type)
    ) {
      toast.error("Please upload a valid file (jpg, png, gif, pdf)");
      return;
    }
    if (!isNamesValid) {
      toast.error("Please let us know the names of the guests");
      return;
    }

    dispatch(insert(userDetails));
    nav("/overnight/summary");
  };
  const handleFileChange = (e) => {
    setuserDetails({ ...userDetails, file: e.target.files[0] });
  };
  return (
    <div style={{ fontFamily: "Inter sans-serif" }}>
      <div className="xl:flex w-screen justify-between items-start bg-[white] p-[1rem] font-robotoFont flex-wrap">
        <div className="flex-1 gap-x-3">
          {/* SETPS  */}
          <div className="w-[100%] flex justify-center items-center">
            <div className="w-[100%] lg:w-[90%]">
              <OvernightSteps step={3} />
            </div>
          </div>

          {/* MAIN CONTENT  */}
          <div className="mt-6 lg:mt-10 w-[100%] flex justify-center items-center">
            <div className="w-[100%] lg:w-[90%]">
              <div className="w-[100%] lg:w-[90%]">
                <h1 className="text-xl font-bold ">Your Details</h1>
                <p className="text-[#606970] text-sm mt-2 w-[100%] lg:w-[80%]">
                  Please provide full details about the person booking. We
                  request your Identification here to ensure your arrival/
                  check-in is as smooth and fast as possible. If you have an
                  image file above 5mb, try screenshotting the photo or using an
                  image resizing tool.
                </p>

                <div className="mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]">
                  <input
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        firstname: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder="First name"
                    className="flex-1 h-[2.4rem] w-[100%] rounded-md bg-white pl-3 pr-3 outline-none border-2 border-[#C8D5E0]"
                  />
                  <input
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        lastname: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder="Last name"
                    className="lg:mt-0 mt-3 flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none"
                  />
                </div>
                <div className="mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]">
                  <input
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        email: e.target.value,
                      });
                    }}
                    type="email"
                    placeholder="Email"
                    className="flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 outline-none border-2 border-[#C8D5E0]"
                  />
                  <input
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        phone: e.target.value,
                      });
                    }}
                    type="tel"
                    placeholder="Phone Number"
                    className="lg:mt-0 mt-3 flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none"
                  />
                </div>
                <div className="mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]">
                  <select
                    value={userDetails.gender}
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        gender: e.target.value,
                      });
                    }}
                    className="flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 outline-none border-2 border-[#C8D5E0]"
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>

                  {/* <input
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        dateOfBirth: e.target.value,
                      });
                    }}
                    type="date"
                    max={
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() - 18)
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                    placeholder="Date of Birth"
                    className="lg:mt-0 mt-3 flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none"
                  /> */}
                  <div className="w-[100%] lg:mt-0 mt-3 flex-1 flex rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0]">
                    <DatePicker
                      selected={userDetails.dateOfBirth}
                      onChange={(date) => {
                        setuserDetails({
                          ...userDetails,
                          dateOfBirth: date,
                        });
                      }}
                      dateFormat="yyyy-MM-dd"
                      maxDate={
                        new Date(
                          new Date().setFullYear(new Date().getFullYear() - 18)
                        )
                      }
                      className=" h-[2.4rem]  w-[100%] outline-none"
                      placeholderText="Date of Birth"
                    />
                  </div>
                </div>

                <textarea
                  onChange={(e) => {
                    setuserDetails({ ...userDetails, para: e.target.value });
                  }}
                  type="text"
                  placeholder="State any dietary or setup requirements (i.e baby bathtub or children’s cot)"
                  name=""
                  className=" lg:w-[83%] w-[100%] h-[5rem] rounded-md bg-white outline-none border-2 border-[#C8D5E0] mt-4 resize-none p-4"
                />
                <p className="mt-2">
                  Upload Image [face] identification (i.e. passport, national
                  ID, driver's license)
                </p>

                <div className="mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]">
                  <div>
                    <label
                      htmlFor="file"
                      className="w-[300px]  h-[50px] flex  justify-between items-center px-4 border-2 border-[#C8D5E0] rounded-md cursor-pointer"
                    >
                      <p className="text-[#a0b1c0]">
                        {userDetails.file
                          ? userDetails.file.name
                          : "Upload File"}
                      </p>
                      <img src={upload} alt="upload" className="w-6 h-6" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>

                  {/* <input
                    type="text"
                    placeholder="How did you hear about us?"
                    className="lg:mt-0 mt-3 flex-1 h-[50px]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none"
                  /> */}
                  <select
                    name="aboutus"
                    className="lg:mt-0 mt-3 flex-1 h-[50px]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none"
                    id="aboutus"
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        aboutUs: e.target.value,
                      });
                    }}
                  >
                    <option value="" selected disabled>
                      How did you hear about us?
                    </option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Google">Google</option>
                    <option value="Linkedin">Linkedin</option>
                    <option value="Friend/Associate">Friend/Associate</option>
                    <option value="Billbaord">Billbaord</option>
                    <option value="Branded Vehicle">Branded Vehicle</option>
                    <option value="Agent / Tour Operator">
                      Agent / Tour Operator
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]">
                  <div className="flex items-center mt-4">
                    <input
                      onChange={(e) => {
                        setuserDetails({
                          ...userDetails,
                          mailLitst: e.target.checked,
                        });
                      }}
                      value={userDetails.mailLitst}
                      type="radio"
                      className="w-4 h-4 border-2 border-[#C8D5E0] rounded-md"
                    />
                    <p className="text-[#606970] text-sm ml-2">
                      Signup for our mailing list
                    </p>
                  </div>
                  <div className="flex items-center mt-4">
                    <input
                      type="radio"
                      onChange={(e) => {
                        setuserDetails({
                          ...userDetails,
                          keepInfo: e.target.checked,
                        });
                      }}
                      value={userDetails.keepInfo}
                      className="w-4 h-4 border-2 border-[#C8D5E0] rounded-md"
                    />
                    <p className="text-[#606970] text-sm ml-2">
                      Keep information for next visit
                    </p>
                  </div>
                </div>
                <div>
                  <GuestForm
                    guests={userDetails.guests}
                    guestCount={guestCount}
                    updateGuest={updateGuest}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RESERVATION  */}

        <div className="w-auto  lg:mt-4 xl:mt-0 mx-4 md:mx-0 px-4 md:pr-4 md:px-2">
          <div className="w-full xl:max-w-[18rem] h-auto mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md">
            <OvernightReservation />
          </div>
          <div className="min-w-[18rem] ">
            <div className="flex flex-col  items-center gap-y-2 pt-4">
              <div className="w-full">
                <button
                  onClick={onSubmit}
                  // disabled={!isValid}
                  className={`w-full p-2 gap-x-4 ${
                    isValid &&
                    isNamesValid &&
                    calculateAge(userDetails.dateOfBirth) >= 18
                      ? "cursor-pointer bg-black"
                      : "bg-[#D2D2D2] cursor-not-allowed"
                  } text-white rounded-xl flex items-center justify-center font-robotoFont`}
                >
                  <p className={"font-[500] text-xl"}>Continue</p>
                  <img src={arrowR} alt="icon" className="w-[1rem]" />
                </button>
              </div>
              <div
                onClick={() => nav("/overnight/room-details")}
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

      <div className="w-screen bg-[#9DD4D3] text-black font-rubic">
        <div className="flex justify-between items-center px-7 mt-3 pb-3">
          <p>© {new Date().getFullYear()} JARA BEACH RESORT</p>
          <p>Owned and Operated By Little Company Nigeria Limited</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
