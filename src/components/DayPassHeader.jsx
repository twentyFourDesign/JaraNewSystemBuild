import React from "react";
import HeaderImage from "../assets/daypassNew.jpg";
import logo from "../assets/jaralogo.png";
import { Link } from "react-router-dom";

const DayPassHeader = () => {
  return (
    <div>
      <div className="w-screen h-[8vh] bg-[#9DD4D3] flex justify-center items-center">
        <Link to="/">
          <img
            src={logo}
            loading="true"
            alt="jaralogo"
            className="h-[4rem] w-[6rem] p-3 z-10 hover:cursor-pointer"
          />
        </Link>
        {/* <img src={logo} alt="" className='h-[2rem]' /> */}
      </div>
      <img src={HeaderImage} alt="" className="h-full w-full object-cover" />
    </div>
  );
};

export default DayPassHeader;
