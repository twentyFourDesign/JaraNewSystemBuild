import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import Table from "./Table";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { discountsRow } from "../../../../constants/tableData";
import Popup from "./Popup";
import { AuthContext } from "../../../../Context/AuthContext";
const Discount = ({ setShowNav, showNav, data, setData }) => {
  const { adminUser } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");
  const iconStyle = "text-[#828893] text-lg cursor-pointer md:hidden block";
  const [showPopup, setshowPopup] = useState(false);
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredData = data?.filter((g) =>
    g.code.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div className="font-robotoFont w-[100%] overflow-x-auto">
      {/* HEADER  */}
      <div className="w-[100%] bg-white h-[6rem] flex justify-between items-center p-5 border-b-2 border-solid border-[#e6e7e9]">
        <h1 className="text-2xl font-medium">Discounts 💵</h1>
        {showNav ? (
          <ImCross onClick={() => setShowNav(!showNav)} className={iconStyle} />
        ) : (
          <GiHamburgerMenu
            onClick={() => setShowNav(!showNav)}
            className={iconStyle}
          />
        )}
      </div>

      {/* TABLE  */}

      <div className="p-5">
        <div className="mb-4 block md:flex justify-between items-start">
          <Input
            placeholder={"Search discounts list ...."}
            className={
              "sm:mb-0 mb-2 w-[15rem] h-[3rem] pl-4 pr-4 rounded-md outline-none text-[#828893]"
            }
            onChangeFun={handleSearchChange}
          />
          {adminUser?.role === "superAdmin" && (
            <Button
              onClickFunc={() => setshowPopup(true)}
              buttonTitle={"Create New"}
              className={
                "w-[11rem] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800"
              }
            />
          )}
        </div>
        <div>
          <Table tr={discountsRow} data={filteredData} setData={setData} />
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50">
          <div className="flex justify-center items-center h-[100%]">
            <Popup setshowPopup={setshowPopup} setData={setData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Discount;
