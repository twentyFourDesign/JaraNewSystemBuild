import React, { useEffect, useRef, useState, useContext } from "react";
import OvernightFooter from "../../../components/OvernightFooter";
import DaypassReservation from "../../../components/DaypassReservation";
import DaypassSummary from "../../../components/DaypassSummary";

import { FiRefreshCcw } from "react-icons/fi";
import arrow from "../../../assets/arrowLeft.png";
import { useNavigate } from "react-router-dom";

import { reset as resetGuestInfo } from "../../../store/slices/daypass.slice";
import { reset as resetGuestCount } from "../../../store/slices/daypassAvailablity.slice";
import { reset as resetRoomDetails } from "../../../store/slices/daypassUserInfo.slice";
import { PriceContext } from "../../../Context/PriceContext";
const Summary = () => {
  const nav = useNavigate();
  const { setDaypassPrice, setDaypassDiscount, setDaypassVoucher } =
    useContext(PriceContext);
  const reservationRef = useRef(null);
  const summaryRef = useRef(null);
  const [reservationHeight, setReservationHeight] = useState(0);
  const [buttonsWidth, setButtonsWidth] = useState(0);
  useEffect(() => {
    if (reservationRef.current) {
      setReservationHeight(reservationRef.current.offsetHeight);
      setButtonsWidth(reservationRef.current.offsetWidth);
    }
  }, [reservationRef.current]);
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
  return (
    <div className="flex flex-col">
      <div className="flex w-screen justify-center items-start bg-[white] p-[1rem] font-robotoFont flex-wrap gap-x-4">
        {/* RESERVATION  */}
        <div
          ref={reservationRef}
          className="min-w-[100%] sm:min-w-[24rem] sm:w-[24rem] h-auto mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-lg"
        >
          <DaypassReservation />
        </div>

        {/* RESERVATION  */}
        <div
          ref={summaryRef}
          style={{ height: reservationHeight }}
          className="min-w-[100%] sm:min-w-[24rem] sm:w-[24rem]  mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md"
        >
          <DaypassSummary />
        </div>
      </div>

      {/* FOOTER  */}
      <div className="flex flex-col px-4 sm:px-0 md:px-8 lg:px-0 mb-4 gap-y-4 lg:flex-row w-screen justify-center items-center lg:gap-x-4 pt-4">
        <div
          onClick={() => nav("/daypass/details")}
          style={{ maxWidth: buttonsWidth }}
          className=" flex w-full  p-2 border-2 border-black bg-[#C8D5E0] rounded-xl gap-x-2 justify-center items-center text-black cursor-pointer"
        >
          <img src={arrow} alt="icon" className="w-[1rem]" />
          <p className="font-[500] text-xl">Back</p>
        </div>
        <div
          style={{ maxWidth: buttonsWidth }}
          className="flex w-full   p-2 border-2 border-black bg-[#F1F5F8] rounded-xl gap-x-2 justify-center items-center text-black cursor-pointer"
          onClick={handleRestart}
        >
          <FiRefreshCcw />
          <p className="font-[500] text-xl">Restart Booking</p>
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
  );
};

export default Summary;
