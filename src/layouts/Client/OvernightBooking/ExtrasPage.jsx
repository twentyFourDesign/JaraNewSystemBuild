import React, { useContext, useEffect } from "react";
import OvernightSteps from "../../../components/OvernightSteps";
import OvernightReservation from "../../../components/OvernightReservation";
import { useState } from "react";
import Extras from "../../../components/Extras";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { insert } from "../../../store/slices/overnight/roomDetails.slice";
import { FiRefreshCcw } from "react-icons/fi";
import arrow from "../../../assets/arrowLeft.png";
import arrowR from "../../../assets/arrowRIght.png";

import { reset as resetGuestInfo } from "../../../store/slices/overnight/guestInfo.slice";
import { reset as resetGuestCount } from "../../../store/slices/overnight/overnightGuest.slice";
import { reset as resetRoomDetails } from "../../../store/slices/overnight/roomDetails.slice";

import { PriceContext } from "../../../Context/PriceContext";
import toast from "react-hot-toast";
function ExtrasPage() {
  // const [finalData, setFinalData] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    setPrice,
    setPreviousCost,
    setDiscount,
    setVoucher,
    finalData,
    setFinalData,
  } = useContext(PriceContext);
  console.log(finalData);
  const guestCount = useSelector((state) => state.overnightGuestCount);
  const handleRestart = () => {
    // dispatch(resetGuestInfo());
    // dispatch(resetGuestCount());
    // dispatch(resetRoomDetails());
    // setPrice(0);
    // setDiscount(null);
    // setVoucher(null);
    // setPreviousCost(0);
    nav("/");
    window.location.reload();
  };
  useEffect(() => {
    dispatch(insert({ ...location.state, finalData }));
  }, [finalData]);
  const handleNext = () => {
    if (!guestCount.adults) {
      toast.error(
        "Please Return to Guest Details Page and Select Number of Adults"
      );
      return;
    }
    dispatch(insert({ ...location.state, finalData }));
    nav("/overnight/details");
  };
  return (
    <div>
      <div className="xl:flex w-screen justify-between items-start bg-[white] p-[1rem] font-robotoFont flex-wrap overflow-x-auto">
        <div className="w-[100%] lg:w-[70%]  gap-x-3">
          {/* SETPS  */}
          <div className="w-[100%] overflow-x-auto flex justify-center items-center">
            <div className="w-[100%] lg:w-[90%]">
              <OvernightSteps step={3} />
            </div>
          </div>

          {/* MAIN CONTENT  */}
          <div className="mt-6  lg:mt-10 w-[100%] flex justify-start items-center pl-0 md:pl-[5%]">
            <div className="">
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
        <div className="w-auto mt-4 xl:mt-0 mx-4 md:mx-0 px-4 md:pr-4 md:px-2">
          <div className="w-full xl:max-w-[18rem] h-auto mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md">
            <OvernightReservation />
          </div>
          <div className="min-w-[18rem] ">
            <div className="flex flex-col  items-center gap-y-2 pt-4">
              <div className="w-full">
                <button
                  onClick={handleNext}
                  className={`w-full p-2 gap-x-4 
                   cursor-pointer bg-black
                      
                  text-white rounded-xl flex items-center justify-center font-robotoFont`}
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
}

export default ExtrasPage;
