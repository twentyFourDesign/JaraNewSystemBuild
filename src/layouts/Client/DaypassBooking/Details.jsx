import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DaypassSteps from "../../../components/DaypassSteps";
import DaypassReservation from "../../../components/DaypassReservation";
import { insert } from "../../../store/slices/daypassUserInfo.slice";
import toast from "react-hot-toast";
import upload from "../../../assets/Vector.png";
import { reset as resetGuestInfo } from "../../../store/slices/daypass.slice";
import { reset as resetGuestCount } from "../../../store/slices/daypassAvailablity.slice";
import { reset as resetRoomDetails } from "../../../store/slices/daypassUserInfo.slice";
import { PriceContext } from "../../../Context/PriceContext";
const Details = () => {
  const bookingInfo = useSelector((state) => state.daypassBookingInfo);
  const {
    setDaypassPrice,
    setDaypassDiscount,
    setDaypassVoucher,
    userDetails2: userDetails,
    setuserDetails2: setuserDetails,
  } = useContext(PriceContext);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [otherSource, setOtherSource] = useState(""); // State for the "Other" input

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

  const handleRestart = () => {
    // dispatch(resetGuestInfo());
    // dispatch(resetGuestCount());
    // dispatch(resetRoomDetails());
    // setDaypassPrice(0);
    // setDaypassDiscount(null);
    // setDaypassVoucher(null);
    nav("/");
    window.location.reload();
  };
  const isValid =
    userDetails.firstname &&
    userDetails.lastname &&
    userDetails.email &&
    userDetails.phone &&
    userDetails.gender &&
    userDetails.dateOfBirth &&
    userDetails.aboutUs &&
    (userDetails.aboutUs !== "Other" || otherSource.trim()) && // Check if "Other" is selected and if otherSource is not empty
    userDetails.file;

  const acceptedFileTypes = ["image/jpeg", "image/png", "image/gif"];
  const emailPhoneValid =
    emailRegex.test(userDetails.email) && phoneRegex.test(userDetails.phone);
  const onSubmit = () => {
    if (
      !bookingInfo.adultsAlcoholic &&
      !bookingInfo.adultsNonAlcoholic &&
      !bookingInfo.Nanny &&
      !bookingInfo.childTotal
    ) {
      toast.error("Please go back and enter guest details");
      return;
    }
    if (!isValid) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!emailRegex.test(userDetails.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

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
      toast.error("Please upload a valid file (jpg, png, gif)");
      return;
    }
    const updatedDetails = {
      ...userDetails,
      aboutUs:
        userDetails.aboutUs === "Other" ? otherSource : userDetails.aboutUs, // Set aboutUs to otherSource if "Other" is selected
    };
    dispatch(insert(updatedDetails));
    nav("/daypass/summary");
  };
  const handleFileChange = (e) => {
    setuserDetails({ ...userDetails, file: e.target.files[0] });
  };

  return (
    <div>
      <div className="xl:flex w-screen justify-between items-start bg-[white] p-[1rem] font-robotoFont flex-wrap">
        <div className="flex-1 gap-x-3">
          {/* SETPS  */}
          <div className="w-[100%] flex justify-center items-center">
            <div className="w-[100%] lg:w-[90%]">
              <DaypassSteps step={3} />
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
                  check-in is as smooth and fast as possible.
                </p>

                <div className="mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]">
                  <input
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        firstname: e.target.value,
                      });
                    }}
                    value={userDetails.firstname}
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
                    value={userDetails.lastname}
                    type="text"
                    placeholder="Last name"
                    className="lg:mt-0 mt-3 flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none"
                  />
                </div>
                <div className="mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]">
                  <input
                    onChange={(e) => {
                      setuserDetails({ ...userDetails, email: e.target.value });
                    }}
                    value={userDetails.email}
                    type="text"
                    placeholder="Email"
                    className="flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 outline-none border-2 border-[#C8D5E0]"
                  />
                  <input
                    onChange={(e) => {
                      setuserDetails({ ...userDetails, phone: e.target.value });
                    }}
                    value={userDetails.phone}
                    type="text"
                    placeholder="Phone Number"
                    className="lg:mt-0 mt-3 flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none"
                  />
                </div>
                <div className="mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]">
                  <select
                    name="gender"
                    id="gender"
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

                <p className="mt-2">
                  Upload Image [face] identification (i.e. passport, national
                  ID, driver's license)
                </p>

                <div className="mt-4 block flex-wrap lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]">
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

                  <select
                    name="aboutus"
                    value={userDetails.aboutUs}
                    className="lg:mt-0 mt-3 flex-1 h-[50px]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none"
                    id="aboutus"
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        aboutUs: e.target.value,
                      });
                      if (e.target.value === "Other") {
                        setOtherSource(""); // Reset the other source input if "Other" is selected
                      }
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
                    <option value="Billboard">Billboard</option>
                    <option value="Branded Vehicle">Branded Vehicle</option>
                    <option value="Agent / Tour Operator">
                      Agent / Tour Operator
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Conditionally render the input for "Other" */}
                {userDetails.aboutUs === "Other" && (
                  <input
                    type="text"
                    value={otherSource}
                    onChange={(e) => setOtherSource(e.target.value)} // Update the other source state
                    placeholder="Please specify"
                    className="mt-2 h-[2.4rem] lg:w-[83%] w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none"
                  />
                )}
              </div>
              <div className="mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]">
                {/* <div className="flex items-center mt-4">
                  <input
                    checked={userDetails.mailLitst}
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
                </div> */}
                <div className="flex items-center mt-4">
                  <input
                    checked={userDetails.keepInfo}
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
            </div>
          </div>
        </div>

        {/* RESERVATION  */}
        <div className="min-w-[18rem] xl:max-w-[18rem] h-auto mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md">
          <DaypassReservation />
        </div>
      </div>

      {/* FOOTER  */}
      <div className="w-screen bg-white">
        <div className="flex flex-col-reverse md:flex-row gap-y-4 justify-between items-center px-7 pt-4">
          <div className="flex gap-x-4">
            <div
              className="flex gap-x-1 items-center text-[#75A9BF] cursor-pointer"
              onClick={() => nav("/daypass/room-details")}
            >
              <MdKeyboardArrowLeft />
              <p>Back</p>
            </div>
            <div
              className="flex gap-x-1 border-2 rounded-lg border-[#75A9BF] px-2 py-2 items-center text-[#75A9BF] cursor-pointer"
              onClick={handleRestart}
            >
              <p>Restart Booking</p>
            </div>
          </div>
          <div>
            <button
              onClick={onSubmit}
              className={
                isValid &&
                emailPhoneValid &&
                calculateAge(userDetails.dateOfBirth) >= 18
                  ? "w-[10rem] h-[3rem] bg-black text-white rounded-md flex items-center justify-center font-robotoFont"
                  : "text-white rounded-md flex items-center justify-center font-robotoFont bg-[#D2D2D2] w-[10rem] h-[3rem] cursor-not-allowed"
              }
            >
              Continue
              <MdKeyboardArrowRight className="ml-2 text-lg" />
            </button>
          </div>
        </div>

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
    </div>
  );
};

export default Details;
