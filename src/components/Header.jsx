import React from "react";
import HeaderImage from "../assets/overnightDesign.png";
import logo from "../assets/jaralogo.png";

import JaraLogo from "../assets/jarabeachlogo.png";
const Header = () => {
  return (
    <div>
      <div className="flex w-screen justify-center items-center h-[13vh] bg-[rgba(0,0,0,0.8)] ">
        <img
          src={JaraLogo}
          loading="true"
          alt="jaralogo"
          className="h-[100%] p-2 z-10"
        />
      </div>
      <img src={HeaderImage} alt="overnight" className="h-[fit] w-full" />
    </div>
  );
};

export default Header;
