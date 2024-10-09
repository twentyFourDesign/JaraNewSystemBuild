import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { baseUrl } from "../../../../constants/baseurl";
import axios from "axios";
import Card from "./Card";
import Popup from "./Popup";

const Task = ({ setShowNav, showNav }) => {
  const [searchValue, setSearchValue] = useState("");
  const iconStyle = "text-[#828893] text-lg cursor-pointer md:hidden block";
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/task/get`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredTasks = data.filter((g) =>
    g.heading.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div className="font-robotoFont w-[100%] overflow-x-auto">
      {/* HEADER  */}
      <div className="w-[100%] bg-white h-[6rem] flex justify-between items-center p-5 border-b-2 border-solid border-[#e6e7e9]">
        <h1 className="text-2xl font-medium">Tasks ✅</h1>
        {showNav ? (
          <ImCross onClick={() => setShowNav(!showNav)} className={iconStyle} />
        ) : (
          <GiHamburgerMenu
            onClick={() => setShowNav(!showNav)}
            className={iconStyle}
          />
        )}
      </div>

      {/* TASK CARD  */}

      <div className="p-5">
        <div className="mb-4 block md:flex justify-between items-start">
          <Input
            placeholder={"Search task list ...."}
            className={
              "sm:mb-0 mb-2 w-[15rem] h-[3rem] pl-4 pr-4 rounded-md outline-none text-[#828893]"
            }
            onChangeFun={handleSearchChange}
          />
          <Button
            buttonTitle={"Create New Task"}
            onClickFunc={() => setShowPopup(true)}
            className={
              "w-[11rem] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800"
            }
          />
        </div>

        <div className="flex flex-wrap gap-x-3 items-start gap-y-3 p-2">
          {filteredTasks.map((taskGroup) => (
            <div key={taskGroup._id}>
              <Card taskGroup={taskGroup} setData={setData} />
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50">
          <div className="flex justify-center items-center h-[100%]">
            <Popup setShowPopup={setShowPopup} setData={setData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
