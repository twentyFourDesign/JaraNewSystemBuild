import React from "react";
import HeaderImage from "../assets/daypassHeader.png";
import logo from "../assets/jaralogo.png";
import { Link } from "react-router-dom";

const DayPassHeader = () => {
  return (
    <div>
      <div className="w-screen h-[4rem] bg-[#9DD4D3] flex justify-center items-center">
        <Link to="/">
          <img
            src={logo}
            loading="true"
            alt="jaralogo"
            className="h-[4rem] w-[6rem] p-2 z-10 hover:cursor-pointer"
          />
        </Link>
        {/* <img src={logo} alt="" className='h-[2rem]' /> */}
      </div>
      <img src={HeaderImage} alt="" className="h-[fit]" />
    </div>
  );
};

export default DayPassHeader;
