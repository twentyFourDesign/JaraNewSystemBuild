import React from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "../../../../constants/baseurl";
import toast from "react-hot-toast";
const Card = ({ taskGroup, setData }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const handleDelete = async () => {
    try {
      await axios
        .delete(`${baseUrl}/task/delete/${taskGroup?._id}`)
        .then((response) => {
          if (response.status) {
            toast.success("Task Deleted");
            axios.get(`${baseUrl}/task/get`).then((res) => {
              setData(res?.data);
            });
          } else {
            toast.error("Something went wrong");
          }
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="bg-white pt-4 pb-4 h-[25rem] overflow-y-auto min-w-[15rem] rounded-md shadow-shadow2 font-robotoFont">
      <div className="flex justify-between items-center pl-2 pr-2 border-b-2 border-solid border-[#e6e7e9] pb-2">
        <h1 className="truncate w-[9rem]">{taskGroup?.heading}</h1>
        <FaTrash
          className="text-red-700 cursor-pointer"
          onClick={handleDelete}
        />
      </div>

      <div className="flex justify-between items-center mt-2 pl-2 pr-2 border-b-2 border-solid border-[#e6e7e9] pb-2">
        <h1 className="truncate w-[100%]">
          Created Date: {taskGroup?.date && formatDate(taskGroup?.date)}
        </h1>
      </div>

      {/* EACH SINGLE TASK  */}
      <div>
        {taskGroup?.tasks?.map((item, i) => (
          <div
            key={item + i}
            className="flex justify-between items-center mt-2 pl-2 pr-2 border-b-2 border-solid border-[#e6e7e9] pb-2"
          >
            <h1 className="truncate w-[100%] text-[#828893]">
              {i + 1}. {item?.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
