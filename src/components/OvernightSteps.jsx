import React from "react";
import { FaCheck } from "react-icons/fa";

const OvernightSteps = ({ step }) => {
  const activeStyle = "bg-[#75A9BF] text-white";
  const nonActiveStyle = "bg-[#C8D5E0] text-black";
  const passStyle = "bg-[#000000] text-white";
  const getStepClass = (currentStep) => {
    if (step > currentStep) {
      return passStyle;
    } else {
      return step === currentStep ? activeStyle : nonActiveStyle;
    }
  };

  const getStepContent = (currentStep) => {
    return step > currentStep ? <FaCheck /> : currentStep;
  };

  return (
    <div className="flex items-center justify-center lg:justify-start lg:ml-3 font-robotoFont w-[100%] px-4">
      <div className="flex flex-col justify-center  gap-2">
        <div className="flex items-center">
          <div
            className={` w-[35px] h-[35px] sm:w-[60px] sm:h-[60px] flex items-center justify-center rounded-full ${getStepClass(
              1
            )}`}
          >
            {getStepContent(1)}
          </div>
          <div className=" w-[9rem] h-[4px] bg-[#C8D5E0] lg:block hidden"></div>
        </div>
        <span className="text-xs sm:text-base md: w-3/4 ">
          Guest(s) Details
        </span>
      </div>
      <div className="flex flex-col justify-center  gap-2  ">
        <div className="flex items-center ">
          <div
            className={` w-[35px] h-[35px] sm:w-[60px] sm:h-[60px] flex items-center justify-center rounded-full ${getStepClass(
              2
            )}`}
          >
            {getStepContent(2)}
          </div>
          <div className="w-[11rem] h-[4px] bg-[#C8D5E0] lg:block hidden"></div>
        </div>
        <span className="text-xs sm:text-base md: w-5/6 ">
          Select Date(s) & Room(s)
        </span>
      </div>
      <div className="flex flex-col justify-center  gap-2">
        <div className="flex items-center">
          <div
            className={` w-[35px] h-[35px] sm:w-[60px] sm:h-[60px] flex items-center justify-center rounded-full ${getStepClass(
              3
            )}`}
          >
            {getStepContent(3)}
          </div>
          <div className="w-[9rem] h-[4px] bg-[#C8D5E0] lg:block hidden"></div>
        </div>
        <span className="text-xs sm:text-base md: w-3/4 ">
          Extras & Experiences
        </span>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center">
          <div
            className={` w-[35px] h-[35px] sm:w-[60px] sm:h-[60px] flex items-center justify-center rounded-full ${getStepClass(
              4
            )}`}
          >
            {getStepContent(4)}
          </div>
        </div>
        <span className="text-xs sm:text-base w-3/4  lg:w-full">
          Guest(s) info
        </span>
      </div>
    </div>
  );
};

export default OvernightSteps;
