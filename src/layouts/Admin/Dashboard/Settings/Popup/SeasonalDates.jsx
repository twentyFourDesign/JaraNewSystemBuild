import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { baseUrl } from "../../../../../constants/baseurl";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const SeasonalDates = ({ setShowPopups, showPopups }) => {
  const [data, setData] = useState({ date: "", description: "" });
  const [apiData, setApiData] = useState([]);

  const getData = async () => {
    let response = await axios.get(`${baseUrl}/seasonal/get`);
    setApiData(response.data);
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getData();
  }, []);

  const create = async () => {
    let response = await axios.post(`${baseUrl}/seasonal/create`, data);
    if (response.status === 201) {
      getData();
      toast.success("Seasonal Date Added");
    }
  };

  const del = async (id) => {
    let response = await axios.delete(`${baseUrl}/seasonal/delete/${id}`);
    if (response.status === 200) {
      getData();
      toast.success("Seasonal Date Deleted");
    }
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <div className="bg-white p-3 w-[90%] md:w-[50%] rounded-md overflow-auto h-[20rem]">
      <div className="flex justify-between items-center w-[100%]">
        <p>Seasonal Dates</p>
        <ImCross
          className="cursor-pointer"
          onClick={() => {
            setShowPopups({ ...showPopups, seasonal: false });
          }}
        />
      </div>

      <div className="flex justify-center items-center gap-3 flex-wrap">
        {apiData?.map((i) => (
          <div
            key={i._id}
            className="mt-4 flex justify-between overflow-auto items-center border border-gray-300 p-1 rounded-md"
          >
            <FaTrash
              onClick={() => del(i._id)}
              className="text-red-900 cursor-pointer mr-2"
            />
            <p> {`${formatDate(i?.date)} -  `} </p>

            <p>{i?.description}</p>
          </div>
        ))}
      </div>

      <div className="lg:flex justify-between items-center mt-3 gap-x-3">
        <input
          type="date"
          name="date"
          placeholder="Enter Date"
          className="block w-[100%] lg:mt-0 mt-2 lg:flex-1 h-[2.3rem] rounded-md px-3 outline-none border border-gray-300"
          onChange={onChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          className="block w-[100%] lg:mt-0 mt-2 lg:flex-1 h-[2.3rem] rounded-md px-3 outline-none border border-gray-300"
          onChange={onChange}
        />
        <button
          className="w-[100%] lg:w-[7rem] lg:mt-0 mt-2 h-[2rem] font-bold rounded-md text-white font-cursive bg-blue-800"
          onClick={create}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default SeasonalDates;
