import React from "react";
import HeaderImage from "../assets/overnightDesign.png";
import JaraLogo from "../assets/jaralogo.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <div className="flex w-screen justify-center items-center h-[8vh] bg-[#9DD4D3] ">
        <Link to="/">
          <img
            src={JaraLogo}
            loading="true"
            alt="jaralogo"
            className="h-[4rem] w-[6rem] p-3 z-10 hover:cursor-pointer"
          />
        </Link>
      </div>
      <img src={HeaderImage} alt="overnight" className="h-full w-full" />
    </div>
  );
};

export default Header;
