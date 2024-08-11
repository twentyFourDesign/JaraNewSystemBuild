import React, { useEffect, useRef, useState } from "react";
import OvernightSteps from "../../../components/OvernightSteps";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import OvernightFooter from "../../../components/OvernightFooter";
import OvernightReservation from "../../../components/OvernightReservation";
import OvernightSummary from "../../../components/OvernightSummary";
import { FiRefreshCcw } from "react-icons/fi";
import arrow from "../../../assets/arrowLeft.png";
import { useNavigate } from "react-router-dom";
import { reset as resetGuestInfo } from "../../../store/slices/overnight/guestInfo.slice";
import { reset as resetGuestCount } from "../../../store/slices/overnight/overnightGuest.slice";
import { reset as resetRoomDetails } from "../../../store/slices/overnight/roomDetails.slice";
import { useDispatch } from "react-redux";
const Summary = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const reservationRef = useRef(null);
  const summaryRef = useRef(null);
  const [reservationHeight, setReservationHeight] = useState(0);
  const handleRestart = () => {
    dispatch(resetGuestInfo());
    dispatch(resetGuestCount());
    dispatch(resetRoomDetails());
    nav("/");
  };
  useEffect(() => {
    if (reservationRef.current) {
      setReservationHeight(reservationRef.current.offsetHeight);
    }
  }, [reservationRef.current]);
  return (
    <div className="flex flex-col  justify-center items-center ">
      <div className="flex w-screen  justify-center items-start bg-[#eff6ff] p-[1rem] font-robotoFont flex-wrap gap-x-4">
        {/* RESERVATION  */}
        <div
          ref={reservationRef}
          className="min-w-[100%] sm:min-w-[24rem] sm:w-[24rem] h-auto mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-lg"
        >
          <OvernightReservation />
        </div>

        {/* RESERVATION  */}
        <div
          ref={summaryRef}
          style={{ height: reservationHeight }}
          className="min-w-[100%] sm:min-w-[24rem] sm:w-[24rem]  mt-6 lg:mt-0 shadow-shadow1 gap-y-4 bg-white border-2 border-[#C8D5E0] rounded-lg"
        >
          <OvernightSummary />
        </div>
      </div>

      {/* FOOTER  */}
      <div className="flex flex-col px-4 md:px-8 lg:px-0 mb-4 gap-y-4 lg:flex-row w-screen justify-center items-center lg:gap-x-4 pt-4">
        <div
          onClick={() => nav("/overnight/room-details")}
          className=" flex w-full lg:w-[30%] p-2 border-2 border-black bg-[#C8D5E0] rounded-xl gap-x-2 justify-center items-center text-black cursor-pointer"
        >
          <img src={arrow} alt="icon" className="w-[1rem]" />
          <p className="font-[500] text-xl">Back</p>
        </div>
        <div
          className="flex w-full lg:w-[30%]  p-2 border-2 border-black bg-[#F1F5F8] rounded-xl gap-x-2 justify-center items-center text-black cursor-pointer"
          onClick={handleRestart}
        >
          <FiRefreshCcw />
          <p className="font-[500] text-xl">Restart Booking</p>
        </div>
      </div>
      <div className="w-screen bg-[#9DD4D3] text-black">
        <div className="flex justify-between items-center px-7 mt-3 pb-3">
          <p>© 2023 JARA BEACH RESORT</p>
          <p>owned and operated by Little Company Nigeria Limited</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
