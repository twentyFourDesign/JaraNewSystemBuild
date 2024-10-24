import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { baseUrl } from "../../../../../constants/baseurl";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const Riding = ({ setShowPopups, showPopups }) => {
  const [data, setData] = useState({ title: "", price: "", duration: "" });
  const [apiData, setapiData] = useState([]);

  const getData = async () => {
    let response = await axios.get(`${baseUrl}/riding/get`);
    setapiData(response.data);
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getData();
  }, []);

  const create = async () => {
    let response = await axios.post(`${baseUrl}/riding/create`, data);
    if (response.status) {
      getData();
      toast.success("Riding Added");
    }
  };

  const update = async (id) => {
    let response = await axios.put(`${baseUrl}/riding/update/${id}`, data);
    if (response.status) {
      getData();
      toast.success("Riding Updated");
    }
  };

  const del = async (id) => {
    let response = await axios.delete(`${baseUrl}/riding/delete/${id}`);
    if (response.status) {
      // getData()
      toast.success("Riding Deleted");
    }
  };

  return (
    <div className="bg-white p-3 w-[90%] md:w-[80%] rounded-md overflow-auto h-[40rem]">
      <div className="flex justify-between items-center w-[100%]">
        <p>Go-Kart and Horse Riding</p>
        <ImCross
          className="cursor-pointer"
          onClick={() => {
            setShowPopups({ ...showPopups, riding: false });
          }}
        />
      </div>

      <div>
        {apiData?.map((i) => (
          <>
            <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-y-2 justify-between overflow-auto items-center mb-2">
              <input
                onChange={(e) => onChange(e)}
                placeholder="Name"
                name="title"
                className="w-[15rem] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300"
                type="text"
                defaultValue={i.title}
              />
              <input
                onChange={(e) => onChange(e)}
                placeholder="Duration"
                name="duration"
                className="w-[10rem h-[2.3rem] rounded-md px-3 outline-none border border-gray-300"
                type="text"
                defaultValue={i.duration}
              />
              <input
                onChange={(e) => onChange(e)}
                placeholder="Price"
                name="price"
                className="w-[10rem] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300"
                type="number"
                defaultValue={i.price}
              />
              <div className="flex gap-x-2 w-[10rem] justify-center ">
                <TiTick
                  className="text-xl text-green-800 cursor-pointer"
                  onClick={() => update(i._id)}
                />

                <FaTrash
                  onClick={() => del(i._id)}
                  className="text-red-900 cursor-pointer"
                />
              </div>
            </div>

            <div className="h-[1px] bg-gray-200 w-[100%]"></div>
          </>
        ))}
      </div>

      <div className="lg:flex justify-between items-center mt-3 gap-x-3">
        <input
          type="text"
          name="title"
          placeholder=" Title"
          className="block w-[100%] lg:mt-0 mt-2 lg:flex-1 h-[2.3rem] rounded-md px-3 outline-none border border-gray-300"
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="duration"
          placeholder=" Duration"
          className="w-[100%] lg:w-[10rem] lg:mt-0 mt-2 block h-[2.3rem] rounded-md px-3 outline-none border border-gray-300"
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="price"
          placeholder=" Price"
          className="w-[100%] lg:w-[10rem] lg:mt-0 mb-2 mt-2 lg:mb-0 block h-[2.3rem] rounded-md px-3 outline-none border border-gray-300"
          onChange={(e) => onChange(e)}
        />
        <button
          className="w-[7rem] h-[2rem] font-bold rounded-md text-white font-cursive bg-blue-800"
          onClick={create}
        >
          Create
        </button>
      </div>

      {/* <input type="text" name='heading' placeholder='Enter Heading' className='w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-4' onChange={(e)=>onChange(e)}/> */}
    </div>
  );
};

export default Riding;
