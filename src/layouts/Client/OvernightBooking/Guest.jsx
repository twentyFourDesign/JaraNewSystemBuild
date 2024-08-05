import React, { useState } from "react";
import OvernightSteps from "../../../components/OvernightSteps";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import OvernightReservation from "../../../components/OvernightReservation";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { insert } from "../../../store/slices/overnight/overnightGuest.slice";
import CustomSelect from "../../../components/CustomSelect";
import Edit from "../../../assets/editBlack.png";
import arrowR from "../../../assets/arrowRIght.png";
const Guest = () => {
  const [guestNumber, setguestNumber] = useState({
    adults: 0,
    children: 0,
    toddler: 0,
    infants: 0,
    ages: [],
  });
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [numChildren, setNumChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const hasAtLeastOneAdult = guestNumber.adults > 0;
  const allChildrenHaveAges = childrenAges.every((age) => age.trim() !== "");
  const isValid =
    hasAtLeastOneAdult &&
    (guestNumber.children === 0 ||
      (guestNumber.children > 0 && allChildrenHaveAges));

  const handleNumChildrenChange = (increment) => {
    const newNumChildren = increment
      ? numChildren + 1
      : Math.max(0, numChildren - 1);
    setNumChildren(newNumChildren);

    const newAges = new Array(newNumChildren).fill("");

    setChildrenAges(newAges);
  };

  const handleAgeChange = (index, value) => {
    const newAges = [...childrenAges];
    newAges[index] = value;

    setChildrenAges(newAges);
  };
  const onNext = () => {
    const updatedGuestNumber = {
      ...guestNumber,
      ages: childrenAges,
    };
    dispatch(insert(updatedGuestNumber));
    nav("/overnight/room-details");
  };
  const ageOptions = [
    { value: "12months-infant", label: "12 months - Infant" },
    { value: "3years-toddler", label: "3 years - Toddler" },
    { value: "4-17years-child", label: "4-17 years - Child or Nanny" },
  ];
  return (
    <div>
      <div className="xl:flex w-screen justify-between items-start bg-[#eff6ff] pt-4  font-robotoFont flex-wrap">
        <div className="flex-1 gap-x-3">
          {/* className="flex-1 gap-x-3  */}
          {/* SETPS  */}
          <div className="w-[100%] overflow-x-auto flex justify-center items-center">
            <div className="w-[100%] lg:w-[90%]">
              <OvernightSteps step={1} />
            </div>
          </div>

          {/* MAIN CONTENT  */}
          <div className="mt-6 lg:ml-3 lg:mt-10 w-[100%] flex justify-center items-center">
            <div className="w-[100%] lg:w-[90%] ml-4">
              <h1 className="text-3xl md:text-xl font-bold ">
                Guest(s) Details
              </h1>
              <p className="text-[#606970] text-lg md:text-sm mt-2 w-[100%] lg:w-[70%]">
                Please select the number of guests you want to book for (infants
                and toddlers included).
              </p>

              <div className="mt-4 flex flex-col gap-y-4 md:flex-row gap-x-[153px] items-center lg:w-[80%]">
                <div className="w-[100%] ">
                  <h1 className="text-lg font-bold  ">Adult(s)</h1>
                  <div className="flex justify-between items-center w-[100%] lg:w-[80%]">
                    <div className="flex w-[100%] mr-4 md:mr-0 items-center">
                      <input
                        type="text"
                        disabled={true}
                        value={
                          guestNumber.adults === 0
                            ? "No of adult(s)"
                            : guestNumber.adults
                        }
                        onChange={(e) =>
                          setguestNumber({
                            ...guestNumber,
                            adults: e.target.value,
                          })
                        }
                        className="w-[100%]  py-4 md:py-0 md:w-[9rem] h-[3rem] md:h-[2rem] px-3 border-2 border-gray-300  rounded-md outline-none"
                      />
                      <div
                        className="w-[2rem] h-[3rem] md:h-[2rem] bg-[#75A9BF] flex border-r-2 border-[#b2d7e7] justify-center items-center rounded-md cursor-pointer"
                        style={{
                          borderRadius: "10px 0 0 10px",
                          marginLeft: "-8px",
                        }}
                      >
                        <AiOutlinePlus
                          onClick={() =>
                            setguestNumber({
                              ...guestNumber,
                              adults: guestNumber.adults + 1,
                            })
                          }
                          className="text-white h-[3rem] md:h-[2rem] text-2xl"
                        />
                      </div>

                      <div
                        className="w-[2rem] h-[3rem] md:h-[2rem] bg-[#75A9BF] flex justify-center items-center rounded-md cursor-pointer"
                        style={{ borderRadius: "0 10px 10px 0" }}
                      >
                        <AiOutlineMinus
                          onClick={() =>
                            setguestNumber({
                              ...guestNumber,
                              adults:
                                guestNumber.adults > 0
                                  ? guestNumber.adults - 1
                                  : guestNumber.adults,
                            })
                          }
                          className="text-white h-[3rem] md:h-[2rem] text-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[100%]">
                  <h1 className="text-lg font-bold ">Children/Nanny</h1>
                  <div className="flex justify-between items-center w-[100%] lg:w-[80%]">
                    <div className="flex w-[100%] items-center mr-4 md:mr-0">
                      <input
                        type="text"
                        disabled={true}
                        value={
                          guestNumber.children === 0
                            ? "No of child(ren)"
                            : guestNumber.children
                        }
                        onChange={(e) =>
                          setguestNumber({
                            ...guestNumber,
                            children: e.target.value,
                          })
                        }
                        className="w-[100%]  py-4 md:py-0 md:w-[9rem] h-[3rem] md:h-[2rem] px-3 border-2 border-gray-300  rounded-md outline-none"
                      />
                      <div
                        className="w-[2rem] h-[3rem] md:h-[2rem] bg-[#75A9BF]  border-r-2 border-[#b2d7e7] flex justify-center items-center rounded-md cursor-pointer"
                        style={{
                          borderRadius: "10px 0 0 10px",
                          marginLeft: "-8px",
                        }}
                      >
                        <AiOutlinePlus
                          onClick={() => {
                            setguestNumber({
                              ...guestNumber,
                              children: guestNumber.children + 1,
                            });
                            handleNumChildrenChange(true);
                          }}
                          className="text-white  text-2xl"
                        />
                      </div>

                      <div
                        className="w-[2rem] h-[3rem] md:h-[2rem] bg-[#75A9BF] flex justify-center items-center rounded-md cursor-pointer"
                        style={{ borderRadius: "0 10px 10px 0" }}
                      >
                        <AiOutlineMinus
                          onClick={() => {
                            setguestNumber({
                              ...guestNumber,
                              children:
                                guestNumber.children > 0
                                  ? guestNumber.children - 1
                                  : guestNumber.children,
                            });
                            handleNumChildrenChange(false);
                          }}
                          className="text-white h-[3rem] md:h-[2rem] text-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="mt-4"
                style={{
                  display: "grid",
                  width: "80%",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1rem",
                  alignContent: "center",
                }}
              >
                {childrenAges.map((age, index) => (
                  <CustomSelect
                    key={index}
                    label={`Age of the child ${index + 1}`}
                    value={age}
                    onChange={(value) => handleAgeChange(index, value)}
                    options={ageOptions}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RESERVATION  */}
        <div className="min-w-[18rem] mx-4 md:mx-0 pr-4">
          <div className="min-w-[18rem] h-[30rem] mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md">
            <OvernightReservation />
          </div>
          <div className="min-w-[18rem] ">
            <div className="flex flex-col  items-center gap-y-2 pt-4">
              <div
                className="flex  w-full p-2 border-2 border-black bg-[#F1F5F8] rounded-md gap-x-2 justify-center items-center text-black cursor-pointer"
                onClick={() => nav("/")}
              >
                <img src={Edit} alt="icon" className="w-[1rem]" />
                <p className="font-[500] text-xl">Manage Booking</p>
              </div>
              <div className="w-full">
                <button
                  onClick={onNext}
                  disabled={!isValid}
                  className={`w-full p-2 gap-x-4 ${
                    isValid
                      ? "cursor-pointer bg-black"
                      : "bg-[#D2D2D2] cursor-not-allowed"
                  } text-white rounded-md flex items-center justify-center font-robotoFont`}
                >
                  <p className={"font-[500] text-xl"}>Continue</p>
                  <img src={arrowR} alt="icon" className="w-[1rem]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 gap-4 md:gap-0 flex justify-between items-center w-screen bg-[#000000] text-white font-cursive py-3 md:px-5  px-2 text-sm z-10">
          <div>
            <p>© 2023 JARA BEACH RESORT</p>
          </div>
          <div>
            <p className="text-right max-w-[300px] md:max-w-full">
              owned and operated by Little Company Nigeria Limited
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guest;
