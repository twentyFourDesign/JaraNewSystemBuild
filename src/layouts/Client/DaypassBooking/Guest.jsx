import React, { useContext, useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import OvernightFooter from "../../../components/OvernightFooter";
import DaypassSteps from "../../../components/DaypassSteps";
import DaypassReservation from "../../../components/DaypassReservation";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { insert } from "../../../store/slices/daypass.slice";
import { reset as resetGuestInfo } from "../../../store/slices/daypass.slice";
import { reset as resetGuestCount } from "../../../store/slices/daypassAvailablity.slice";
import { reset as resetRoomDetails } from "../../../store/slices/daypassUserInfo.slice";
import { PriceContext } from "../../../Context/PriceContext";
import { Tooltip } from "react-tooltip";
const Guest = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [showTooltip, setShowTooltip] = useState(false);
  const {
    setDaypassPrice,
    setDaypassDiscount,
    setDaypassVoucher,
    guestInfo2: guestInfo,
    setGuestInfo2: setGuestInfo,
  } = useContext(PriceContext);
  // const [guestInfo, setGuestInfo] = useState({
  //   adultsAlcoholic: 0,
  //   adultsNonAlcoholic: 0,
  //   Nanny: 0,
  //   childTotal: 0,
  // });
  const isValid =
    guestInfo.adultsAlcoholic > 0 || guestInfo.adultsNonAlcoholic > 0;

  const onSubmit = () => {
    dispatch(insert(guestInfo));
    nav("/daypass/room-details");
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
  useEffect(() => {
    if (isValid) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  }, [isValid]);
  return (
    <div>
      <div className="xl:flex w-screen justify-between items-start bg-[white] p-[1rem] font-robotoFont flex-wrap">
        <div className="flex-1 gap-x-3">
          {/* SETPS  */}
          <div className="w-[100%] flex justify-center items-center">
            <div className="w-[100%] lg:w-[90%]">
              <DaypassSteps step={1} />
            </div>
          </div>

          {/* MAIN CONTENT  */}
          <div className="mt-6 lg:mt-10 w-[100%] flex justify-center items-center">
            <div className="w-[100%] lg:w-[90%]">
              <h1 className="text-xl font-bold ">How Many Guest(s)</h1>
              <p className="text-[#606970] text-sm mt-2 w-[100%] lg:w-[70%]">
                {`Please select the number of guests you would like to book for, i.e. Adult Alcohol, Adult Non-Alcohol, Children, Infants or Nannies. By proceeding you understand your payment is transferable but non-refundable in line with our ${`<> Terms and Conditions <>.`}`}
              </p>

              <div className="mt-4">
                <h1 className="text-lg font-bold ">Adult Alcohol Pass(es)</h1>
                <div className="flex justify-between items-center w-[100%] lg:w-[80%]">
                  <div className="sm:mr-4">
                    <p className="text-[#606970] mt-2">
                      Adult Day Pass including Alcoholic Drinks
                    </p>
                    <p className="text-[#606970] mt-2">
                      {/* ₦{guestInfo.adultsAlcoholic * 45000} */}
                    </p>
                  </div>

                  <div className="flex gap-x-2 sm:gap-x-4  items-center">
                    <div className="w-[2rem] h-[2rem] bg-[#75A9BF]  flex justify-center items-center rounded-md cursor-pointer">
                      <AiOutlineMinus
                        onClick={() => {
                          setGuestInfo((prevState) => ({
                            ...prevState,
                            adultsAlcoholic:
                              prevState.adultsAlcoholic > 0
                                ? prevState.adultsAlcoholic - 1
                                : prevState.adultsAlcoholic,
                          }));
                        }}
                        className="text-white"
                      />
                    </div>
                    <div className="w-[5rem] h-[2rem] bg-white flex justify-center items-center rounded-md text-[#9BA6B0]">
                      {guestInfo.adultsAlcoholic}
                    </div>
                    <div className="w-[2rem] h-[2rem] bg-[#75A9BF]  flex justify-center items-center rounded-md cursor-pointer">
                      <AiOutlinePlus
                        onClick={() => {
                          setGuestInfo({
                            ...guestInfo,
                            adultsAlcoholic: guestInfo.adultsAlcoholic + 1,
                          });
                        }}
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-lg font-bold ">
                  Adult Non-Alcohol Pass(es)
                </h1>
                <div className="flex justify-between items-center w-[100%] lg:w-[80%]">
                  <div className="sm:mr-4">
                    <p className="text-[#606970] mt-2">
                      Adult Day Pass with Soft Drinks
                    </p>
                    <p className="text-[#606970] mt-2">
                      {/* ₦{guestInfo.adultsNonAlcoholic * 35000} */}
                    </p>
                  </div>
                  <div className="flex gap-x-2 sm:gap-x-4 items-center">
                    <div className="w-[2rem] h-[2rem] bg-[#75A9BF]  flex justify-center items-center rounded-md cursor-pointer">
                      <AiOutlineMinus
                        onClick={() => {
                          setGuestInfo((prevState) => ({
                            ...prevState,
                            adultsNonAlcoholic:
                              prevState.adultsNonAlcoholic > 0
                                ? prevState.adultsNonAlcoholic - 1
                                : prevState.adultsNonAlcoholic,
                          }));
                        }}
                        className="text-white"
                      />
                    </div>
                    <div className="w-[5rem] h-[2rem] bg-white flex justify-center items-center rounded-md text-[#9BA6B0]">
                      {guestInfo.adultsNonAlcoholic}
                    </div>
                    <div className="w-[2rem] h-[2rem] bg-[#75A9BF]  flex justify-center items-center rounded-md cursor-pointer">
                      <AiOutlinePlus
                        onClick={() => {
                          setGuestInfo({
                            ...guestInfo,
                            adultsNonAlcoholic:
                              guestInfo.adultsNonAlcoholic + 1,
                          });
                        }}
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-lg font-bold ">Nanny Pass(es)</h1>
                <div className="flex justify-between items-center w-[100%] lg:w-[80%]">
                  <div className="sm:mr-4">
                    <p className="text-[#606970] mt-2">
                      Nanny passes limited to 1 per child, maximum 3 nannies per
                      booking.
                    </p>
                    <p className="text-[#606970] mt-2">
                      {/* ₦{guestInfo.Nanny * 15000} */}
                    </p>
                  </div>
                  <div className="flex gap-x-2 sm:gap-x-4 items-center">
                    <div className="w-[2rem] h-[2rem] bg-[#75A9BF]  flex justify-center items-center rounded-md cursor-pointer">
                      <AiOutlineMinus
                        onClick={() => {
                          setGuestInfo((prevState) => ({
                            ...prevState,
                            Nanny:
                              prevState.Nanny > 0
                                ? prevState.Nanny - 1
                                : prevState.Nanny,
                          }));
                        }}
                        className="text-white"
                      />
                    </div>
                    <div className="w-[5rem] h-[2rem] bg-white flex justify-center items-center rounded-md text-[#9BA6B0]">
                      {guestInfo.Nanny}
                    </div>
                    <div className="w-[2rem] h-[2rem] bg-[#75A9BF]  flex justify-center items-center rounded-md cursor-pointer">
                      <AiOutlinePlus
                        onClick={() => {
                          setGuestInfo({
                            ...guestInfo,
                            Nanny: guestInfo.Nanny + 1,
                          });
                        }}
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-lg font-bold ">Child Pass(es)</h1>
                <div className="flex justify-between items-center w-[100%] lg:w-[80%]">
                  <div className="sm:mr-4">
                    <p className="text-[#606970] mt-2">
                      Aged 2-17 years (or 3 years+ after first FREE Toddler)
                    </p>
                    <p className="text-[#606970] mt-2">
                      {/* ₦{guestInfo.childTotal * 17500} */}
                    </p>
                  </div>

                  <div className="flex gap-x-2 sm:gap-x-4 items-center">
                    <div className="w-[2rem] h-[2rem] bg-[#75A9BF]  flex justify-center items-center rounded-md cursor-pointer">
                      <AiOutlineMinus
                        onClick={() => {
                          setGuestInfo((prevState) => ({
                            ...prevState,
                            childTotal:
                              prevState.childTotal > 0
                                ? prevState.childTotal - 1
                                : prevState.childTotal,
                          }));
                        }}
                        className="text-white"
                      />
                    </div>
                    <div className="w-[5rem] h-[2rem] bg-white flex justify-center items-center rounded-md text-[#9BA6B0]">
                      {guestInfo.childTotal}
                    </div>
                    <div className="w-[2rem] h-[2rem] bg-[#75A9BF]  flex justify-center items-center rounded-md cursor-pointer">
                      <AiOutlinePlus
                        onClick={() => {
                          setGuestInfo({
                            ...guestInfo,
                            childTotal: guestInfo.childTotal + 1,
                          });
                        }}
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RESERVATION  */}
        <div className="min-w-[18rem] xl:max-w-[18rem] h-[fit] mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md">
          <DaypassReservation />
        </div>
      </div>

      {/* FOOTER  */}

      <div className="w-screen bg-white">
        <div className="flex flex-col-reverse md:flex-row gap-y-4 justify-between items-center px-7 pt-4">
          <div className="flex gap-x-4">
            <div
              className="flex gap-x-1 items-center text-[#75A9BF] cursor-pointer"
              onClick={() => nav("/")}
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
              disabled={!isValid}
              data-tooltip-id="continueTooltip"
              className={
                isValid
                  ? "w-[10rem] h-[3rem] bg-black  text-white rounded-md flex items-center justify-center font-robotoFont"
                  : "text-white rounded-md flex items-center justify-center font-robotoFont bg-[#D2D2D2] w-[10rem] h-[3rem] cursor-not-allowed"
              }
            >
              Continue
              <MdKeyboardArrowRight className="ml-2 text-lg" />
            </button>
            <Tooltip
              id="continueTooltip"
              place="top"
              content="Happy with your number of Guests? Please continue"
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

export default Guest;
