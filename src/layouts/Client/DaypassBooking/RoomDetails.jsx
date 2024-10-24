import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { baseUrl } from "../../../constants/baseurl";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Extras from "../../../components/Extras";
import DaypassSteps from "../../../components/DaypassSteps";
import DaypassReservation from "../../../components/DaypassReservation";
import { insert } from "../../../store/slices/daypassAvailablity.slice";
import { PriceContext } from "../../../Context/PriceContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import ExtraModal from "../../../components/ExtraModal";

const RoomDetails = () => {
  const bookingInfo = useSelector((state) => state.daypassBookingInfo);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [seasonalDates, setSeasonalDates] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalsToShow, setModalsToShow] = useState([]);
  const [completedCategories, setCompletedCategories] = useState({});
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }
  const {
    setDaypassPrice,
    setDaypassSubtotal,
    calculateDaypassPrice,
    setDaypassDiscount,
    setDaypassVoucher,
    availablityInfo,
    setavailablityInfo,
    dayType,
    setdayType,
    finalData2: finalData,
    setFinalData2: setFinalData,
    extraFormData,
    setExtraFormData,
  } = useContext(PriceContext);

  useEffect(() => {
    const fetchSeasonalDates = async () => {
      const response = await axios.get(`${baseUrl}/seasonal/get`);
      setSeasonalDates(response.data.map((date) => new Date(date.date)));
    };
    const fetchBlockedDates = async () => {
      const response = await axios.get(`${baseUrl}/block/booking/get`);
      setBlockedDates(response.data.map((date) => new Date(date.date)));
    };
    fetchSeasonalDates();
    fetchBlockedDates();
  }, []);
  const checkIfDateIsNotPast = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(dateString);
    return selectedDate >= today;
  };

  const isValid = checkIfDateIsNotPast(availablityInfo.startDate);
  useEffect(() => {
    setavailablityInfo({
      ...availablityInfo,
      dayType: dayType,
      extras: finalData,
    });
    dispatch(
      insert({ ...availablityInfo, dayType: dayType, extras: [...finalData] })
    );
  }, [dayType, finalData, availablityInfo.startDate]);
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
    if (!availablityInfo.startDate) {
      toast.error("please select date");
      return;
    }
    if (!isValid) {
      toast.error("Select a date not in the past");
      return;
    }
    // console.log(availablityInfo);
    setavailablityInfo({
      ...availablityInfo,
      dayType: dayType,
      extras: finalData,
    });
    dispatch(
      insert({ ...availablityInfo, dayType: dayType, extras: [...finalData] })
    );
    // nav("/daypass/summary")
    nav("/daypass/details");
  };

  const onDateChange = (date) => {
    const selectedDate = new Date(date);
    // console.log(selectedDate);
    const dayOfWeek = selectedDate.getDay();
    // console.log(dayOfWeek);

    if (
      dayType === "weekdays" &&
      (dayOfWeek === 0 || dayOfWeek === 6 || dayOfWeek === 5)
    ) {
      // If the user selects a weekend day (0 = Sunday, 6 = Saturday)
      toast.error("Please select a weekday (Monday to Thursday).");
      return;
    } else if (dayType === "weekends" && dayOfWeek >= 1 && dayOfWeek <= 4) {
      // If the user selects a weekday
      toast.error("Please select a weekend day (Friday to Sunday).");
      return;
    } else if (
      dayType === "Seasonal" &&
      !seasonalDates.some(
        (date) => date.toDateString() === selectedDate.toDateString()
      )
    ) {
      toast.error("Please select a valid seasonal date.");
      return;
    }

    // Update availability info if the date is valid
    const formattedDate = formatDate(date);
    setavailablityInfo({
      ...availablityInfo,
      startDate: formattedDate,
    });

    // Dispatch an action to update the Redux store with the new date
    dispatch(insert({ ...availablityInfo, startDate: formattedDate }));

    // Trigger price recalculation
    setDaypassPrice(calculateDaypassPrice()); // Set to 0 to trigger recalculation
  };

  const handleDataType = (data) => {
    setavailablityInfo({ ...availablityInfo, startDate: "" });
    setDaypassSubtotal(0);
    setdayType(data);
  };

  // Add this useEffect to update the Redux store when availablityInfo changes
  useEffect(() => {
    dispatch(insert(availablityInfo));
  }, [availablityInfo, dispatch]);

  useEffect(() => {
    if (isValid) {
      // console.log("being shown");
      setShowTooltip(true);
      // const timer = setTimeout(() => setShowTooltip(false), 5000); // Hide tooltip after 4 seconds
      // return () => clearTimeout(timer);
    }
  }, [isValid]);
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

  const handleNext = () => {
    if (
      !bookingInfo.adultsAlcoholic &&
      !bookingInfo.adultsNonAlcoholic &&
      !bookingInfo.Nanny &&
      !bookingInfo.childTotal
    ) {
      toast.error("Please go back and enter guest details");
      return;
    }
    if (!availablityInfo.startDate) {
      toast.error("please select date");
      return;
    }
    if (!isValid) {
      toast.error("Select a date not in the past");
      return;
    }

    const uniqueTypes = [...new Set(finalData.map((item) => item.type))];
    if (uniqueTypes.length > 0) {
      setModalsToShow(uniqueTypes);
      setShowModal(true);
    } else {
      proceedToNextPage();
    }
  };

  const handleModalClose = (completedData, formData) => {
    if (completedData === null && formData === null) {
      // Modal was cancelled
      setShowModal(false);
      return;
    }

    setCompletedCategories((prev) => ({ ...prev, ...completedData }));
    setExtraFormData(formData);
    setShowModal(false);

    const updatedFinalData = finalData.map((item) => ({
      ...item,
      details: formData[item.type]?.[item._id] || {},
    }));

    setFinalData(updatedFinalData);

    const allCategoriesCompleted = Object.values(completedData).every(
      (value) => value === true
    );

    if (allCategoriesCompleted) {
      proceedToNextPage(updatedFinalData);
    } else {
      toast.error("Please complete all extra details before proceeding.");
    }
  };

  const proceedToNextPage = (updatedFinalData = finalData) => {
    setavailablityInfo({
      ...availablityInfo,
      dayType: dayType,
      extras: updatedFinalData,
    });
    dispatch(
      insert({
        ...availablityInfo,
        dayType: dayType,
        extras: [...updatedFinalData],
      })
    );
    nav("/daypass/details");
  };

  return (
    <div>
      <div className="xl:flex w-screen justify-between items-start bg-[white] p-[1rem] font-robotoFont flex-wrap overflow-x-auto">
        <div className="w-[100%] lg:w-[70%]  gap-x-3">
          {/* SETPS  */}
          <div className="w-[100%] overflow-x-auto flex justify-center items-center">
            <div className="w-[100%] lg:w-[90%]">
              <DaypassSteps step={2} />
            </div>
          </div>

          {/* MAIN CONTENT  */}
          <div className="mt-6 lg:mt-10 w-[100%] flex justify-start items-center pl-0 lg:pl-[5%]">
            <div className="">
              <div>
                <h1 className="text-xl font-bold ">Availability</h1>
                <p className="text-[#606970] text-sm mt-1">
                  Are you booking on a weekday (MON-THUR), weekend (FRI-SUN) or
                  Seasonal?
                </p>
              </div>
              {/* FOR CALENDER  */}
              <div className="mt-4">
                <div className="flex gap-x-4 items-center">
                  <div
                    onClick={() => handleDataType("weekdays")}
                    className="cursor-pointer"
                  >
                    <p
                      className={`${
                        dayType === "weekdays"
                          ? "text-black border-b-2 border-[#75A9BF]"
                          : "text-[#8F95B2]"
                      }`}
                    >
                      Weekdays
                    </p>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleDataType("weekends")}
                  >
                    <p
                      className={`${
                        dayType === "weekends"
                          ? "text-black border-b-2 border-[#75A9BF]"
                          : "text-[#8F95B2]"
                      }`}
                    >
                      Weekends
                    </p>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleDataType("Seasonal")}
                  >
                    <p
                      className={`${
                        dayType === "Seasonal"
                          ? "text-black border-b-2 border-[#75A9BF]"
                          : "text-[#8F95B2]"
                      }`}
                    >
                      Seasonal
                    </p>
                  </div>
                </div>

                <div className="mt-3 max-w-[300px]">
                  {/* <input
                    type="date"
                    className="mr-10 w-[100%] lg:mb-0 mb-2 lg:w-[20rem] h-[2.3rem] px-3 rounded-md"
                    onChange={onDateChange} // Use the new onDateChange function
                    min={new Date().toISOString().split("T")[0]}
                    value={availablityInfo.startDate}
                  /> */}
                  <DatePicker
                    selected={availablityInfo.startDate}
                    onChange={onDateChange}
                    minDate={new Date()}
                    filterDate={(date) => {
                      const dayOfWeek = date.getDay();
                      if (dayType === "weekdays") {
                        return dayOfWeek >= 1 && dayOfWeek <= 4; // Monday to Thursday
                      } else if (dayType === "weekends") {
                        return (
                          dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6
                        ); // Friday to Sunday
                      } else if (dayType === "Seasonal") {
                        return seasonalDates.some(
                          (seasonalDate) =>
                            seasonalDate.toDateString() === date.toDateString()
                        );
                      }
                      return true;
                    }}
                    excludeDates={blockedDates}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select a date"
                    className="mr-10 w-[100%] border-2 lg:mb-0 mb-2 lg:w-[20rem] h-[2.3rem] px-3 rounded-md"
                  />
                </div>
              </div>

              {/* EXTRAS  */}
              <div>
                <Extras
                  setFinalData={setFinalData}
                  finalData={finalData}
                  type={"daypass"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RESERVATION  */}
        <div className="min-w-[18rem] xl:max-w-[18rem] h-auto mt-10 xl:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md">
          <DaypassReservation />
        </div>
      </div>

      <div className="w-screen bg-white">
        <div className="flex flex-col-reverse md:flex-row gap-y-4 justify-between  items-center px-7 pt-4">
          <div className="flex gap-x-4">
            <div
              className="flex gap-x-1 items-center text-[#75A9BF] cursor-pointer"
              onClick={() => nav("/daypass/guest")}
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
              onClick={handleNext}
              data-tooltip-id="continueTooltip"
              className={
                isValid
                  ? "w-[10rem] h-[3rem] bg-black text-white rounded-md flex items-center justify-center font-robotoFont"
                  : "text-white rounded-md flex items-center justify-center font-robotoFont bg-[#D2D2D2] w-[10rem] h-[3rem] cursor-not-allowed"
              }
            >
              Continue
              <MdKeyboardArrowRight className="ml-2 text-lg" />
            </button>
            <Tooltip
              id="continueTooltip"
              place="top"
              content="Happy with your dates? Please continue"
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
      {showModal && (
        <ExtraModal
          categories={modalsToShow}
          extras={finalData}
          onClose={handleModalClose}
          initialFormData={extraFormData}
        />
      )}
    </div>
  );
};

export default RoomDetails;
