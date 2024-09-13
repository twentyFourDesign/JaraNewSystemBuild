import React, { useState } from "react";
import OvernightReservation from "../../../components/OvernightReservation";
import OvernightFooter from "../../../components/OvernightFooter";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import OvernightSteps from "../../../components/OvernightSteps";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DaypassSteps from "../../../components/DaypassSteps";
import DaypassReservation from "../../../components/DaypassReservation";
import { insert } from "../../../store/slices/daypassUserInfo.slice";
import toast from "react-hot-toast";
const Details = () => {
  const bookingInfo = useSelector((state) => state.daypassBookingInfo);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [userDetails, setuserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
    para: "",
    aboutUs: "",
    dateOfBirth: "",
    file: "",
  });
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

  const acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
  ];
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
      toast.error("Please upload a valid file (jpg, png, gif, pdf)");
      return;
    }
    dispatch(insert(userDetails));
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
                      setuserDetails({ ...userDetails, email: e.target.value });
                    }}
                    type="text"
                    placeholder="Email"
                    className="flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 outline-none border-2 border-[#C8D5E0]"
                  />
                  <input
                    onChange={(e) => {
                      setuserDetails({ ...userDetails, phone: e.target.value });
                    }}
                    type="text"
                    placeholder="Phone Number"
                    className="lg:mt-0 mt-3 flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none"
                  />
                </div>
                <div className="mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]">
                  {/* <input
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        gender: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder="Gender"
                    className="flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 outline-none border-2 border-[#C8D5E0]"
                  /> */}
                  <select
                    name="gender"
                    id="gender"
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
                  <input
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
                    placeholder=""
                    className="lg:mt-0 mt-3 flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none"
                  />
                </div>
                {/* <textarea
                  type="text"
                  placeholder="State any dietary or setup requirements (i.e baby bathtub or children’s cot)"
                  name=""
                  className=" lg:w-[83%] w-[100%] h-[5rem] rounded-md bg-white outline-none border-2 border-[#C8D5E0] mt-4 resize-none p-4"
                /> */}
                <p className="mt-2">
                  Upload Image [face] identification (i.e. passport, national
                  ID, driver's license) - Max: 5 MB
                </p>

                <div className="mt-4 block lg:flex justify-between items-center gap-x-4 lg:w-[83%] w-[100%]">
                  <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    className=""
                  />
                  {/* <input
                    onChange={(e) => {
                      setuserDetails({ ...userDetails, para: e.target.value });
                    }}
                    type="text"
                    placeholder="How did you hear about us?"
                    className="lg:mt-0 mt-3 flex-1 h-[2.4rem]  w-[100%] rounded-md bg-white pl-3 pr-3 border-2 border-[#C8D5E0] outline-none"
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
                    <option value="Other">Google</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* <div className='w-[100%] lg:w-[90%] mt-4'>
                                <h1 className='text-xl font-bold '>Names of guests</h1>

                                <div className='flex justify-between items-center lg:w-[83%] flex-wrap'>
                                    <p className='text-[#606970] text-sm mt-2'>Please give us some information about your guests.</p>
                                    <button className='min-w-[10rem] sm:mt-0 mt-2 h-[2.4rem] bg-black text-white rounded-md'>Add Guests Info</button>
                                </div>
                            </div> */}
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
        <div className="flex flex-col md:flex-row gap-y-4 justify-between items-center px-7 pt-4">
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
              onClick={() => nav("/")}
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

        <div className="flex justify-between items-center bg-[#9DD4D3] text-black font-rubic px-7 mt-3 py-2">
          <p>© {new Date().getFullYear()} JARA BEACH RESORT</p>
          <p>Owned and Operated By Little Company Nigeria Limited</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
