import React, { useContext } from "react";
import OvernightFooter from "../../../components/OvernightFooter";
import Thumbs from "../../../assets/confirm.png";
import Insta from "../../../assets/Instagram.svg";
import Fb from "../../../assets/fb.svg";
import arrow from "../../../assets/arrowLeft.png";
import arrowR from "../../../assets/arrowLeft.png";
import { useDispatch, useSelector } from "react-redux";
import { reset as resetGuestInfo } from "../../../store/slices/daypass.slice";
import { reset as resetGuestCount } from "../../../store/slices/daypassAvailablity.slice";
import { reset as resetRoomDetails } from "../../../store/slices/daypassUserInfo.slice";
import { PriceContext } from "../../../Context/PriceContext";
import { useNavigate } from "react-router-dom";
const Confirmation = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { setDaypassPrice, setDaypassDiscount, setDaypassVoucher } =
    useContext(PriceContext);
  const guestInfo = useSelector((state) => state.daypassUserInfo);
  const handleAnotherBooking = () => {
    dispatch(resetGuestInfo());
    dispatch(resetGuestCount());
    dispatch(resetRoomDetails());
    setDaypassPrice(0);
    setDaypassDiscount(null);
    setDaypassVoucher(null);
    nav("/daypass/guest");
  };
  const handleRestart = () => {
    dispatch(resetGuestInfo());
    dispatch(resetGuestCount());
    dispatch(resetRoomDetails());
    setDaypassPrice(0);
    setDaypassDiscount(null);
    setDaypassVoucher(null);
    nav("/");
  };
  return (
    <>
      <div className=" bg-[white] font-robotoFont">
        <div className="flex justify-center items-center">
          <div className=" w-[97%] sm:w-[70%] h-fit bg-white mt-4 mb-4 rounded-lg pb-4">
            <div className="flex justify-center items-center">
              <img src={Thumbs} alt="" className="h-[12rem]" />
            </div>

            <h1 className="text-2xl font-bold text-center mt-2">
              Thanks {guestInfo.firstname ? guestInfo.firstname : ""}!
            </h1>
            <p className="text-[#606970] text-center mt-2">
              Your booking is done successfully. We’ve sent an email with all
              booking details and invoice.
            </p>

            <div className="flex justify-center items-center gap-x-4 mt-4">
              <a
                href="https://www.jarabeachresort.com/faq-s"
                className="text-[#0F93F8] border-b-2 border-[#0F9EF8] sm:text-base text-sm"
              >
                GENERAL FAQS
              </a>
              <a
                href="https://menu.jarabeachresort.com/"
                className="text-[#0F93F8] border-b-2 border-[#0F9EF8] sm:text-base text-sm"
              >
                MENUS
              </a>
              <a
                href=" https://www.jarabeachresort.com/children"
                className="text-[#0F93F8] border-b-2 border-[#0F9EF8] sm:text-base text-sm"
              >
                VISITING WITH CHILDREN
              </a>
            </div>
            <h1 className="text-xl font-bold text-center mt-5">
              Connect Socially
            </h1>

            <div className="flex justify-center items-center gap-x-4 mt-4">
              <img src={Insta} alt="" className="h-[2rem]" />
              <img src={Fb} alt="" className="h-[2rem]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 md:gap-y-0 md:flex-row justify-center items-center gap-x-4 mb-4 ml-2 mr-2">
          <button
            onClick={handleAnotherBooking}
            className="w-[100%] sm:w-[13rem] h-[2.4rem] bg-[#C8D5E0] text-black font-bold flex justify-center items-center gap-x-2 rounded-md cursor-pointer font-robotoFont"
          >
            <img src={arrow} alt="icon" className="w-[1rem]" />
            Make another booking
          </button>
          <button
            onClick={handleRestart}
            className="w-[100%] sm:mt-0 mt-3 sm:w-[13rem] h-[2.4rem] bg-black flex gap-x-2 justify-center items-center font-bold text-white rounded-md cursor-pointer font-robotoFont"
          >
            Go to Website
            <img src={arrowR} alt="icon" className="w-[1rem]" />
          </button>
        </div>
      </div>
      <div className="w-screen bg-[#9DD4D3] text-black font-rubic">
        <div className="flex justify-between items-center px-7 mt-3 py-2">
          <p>© {new Date().getFullYear()} JARA BEACH RESORT</p>
          <p>Owned and Operated By Little Company Nigeria Limited</p>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
