import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { baseUrl } from "../../../../../constants/baseurl";
import toast from "react-hot-toast";

const Daypass = ({ setShowPopups, showPopups }) => {
  const [data, setData] = useState({
    adultsAlcoholic: {
      weekDayPrice: "",
      weekendPrice: "",
      seasonalPrice: "",
    },
    adultsNonAlcoholic: {
      weekDayPrice: "",
      weekendPrice: "",
      seasonalPrice: "",
    },
    nanny: {
      weekDayPrice: "",
      weekendPrice: "",
      seasonalPrice: "",
    },
    childTotal: {
      weekDayPrice: "",
      weekendPrice: "",
      seasonalPrice: "",
    },
  });

  const [apiData, setApiData] = useState([]);

  const getData = async () => {
    let response = await axios.get(`${baseUrl}/option/get`);
    setApiData(response.data);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const [category, field] = name.split("."); // Split the name to get category and field

    setData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value, // Update the specific field
      },
    }));
  };

  useEffect(() => {
    getData();
  }, []);

  const create = async () => {
    let response = await axios.post(`${baseUrl}/option/create`, data);
    if (response.status) {
      getData();
      toast.success("Option Added");
    }
  };

  const update = async (id) => {
    let response = await axios.put(`${baseUrl}/option/update/${id}`, data);
    if (response.status) {
      getData();
      toast.success("Option Updated");
    }
  };

  const del = async (id) => {
    let response = await axios.delete(`${baseUrl}/option/delete/${id}`);
    if (response.status) {
      getData();
      toast.success("Option Deleted");
    }
  };

  return (
    <div className="bg-white p-3 w-[90%] md:w-[80%] rounded-md overflow-auto h-[40rem]">
      <div className="flex justify-between items-center w-[100%]">
        <p>Daypass Options</p>
        <ImCross
          className="cursor-pointer"
          onClick={() => {
            setShowPopups({ ...showPopups, daypass: false });
          }}
        />
      </div>

      <div>
        {apiData?.map((i) => (
          <div className="flex flex-col items-center sm:items-stretch">
            <div
              key={i._id}
              className="mt-4 flex flex-col sm:flex-row gap-y-2 justify-between overflow-auto items-center mb-2"
            >
              <h1 className="font-bold">Adults Alcoholic</h1>
              <input
                onChange={onChange}
                name="adultsAlcoholic.weekDayPrice"
                className="w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300"
                type="number"
                defaultValue={i.adultsAlcoholic.weekDayPrice}
                placeholder="Enter Week Day Price"
                required
              />
              <input
                onChange={onChange}
                name="adultsAlcoholic.weekendPrice"
                className="w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300"
                type="number"
                defaultValue={i.adultsAlcoholic.weekendPrice}
                placeholder="Enter Weekend Price"
                required
              />
              <input
                onChange={onChange}
                name="adultsAlcoholic.seasonalPrice"
                className="w-[10rem] h-[2.3rem] rounded-md px-3 outline-none mr-2 border border-gray-300"
                type="number"
                defaultValue={i.adultsAlcoholic.seasonalPrice}
                placeholder="Enter Season Price"
                required
              />
              <button
                className="w-[7rem] h-[2rem] font-bold rounded-md text-white font-cursive bg-blue-800"
                onClick={() => update(i._id)}
              >
                Update
              </button>
            </div>
            <div
              key={i._id}
              className="mt-4 flex flex-col sm:flex-row gap-y-2 justify-between overflow-auto items-center mb-2"
            >
              <h1 className="font-bold">Adults Non-Alcoholic</h1>
              <input
                onChange={onChange}
                name="adultsNonAlcoholic.weekDayPrice"
                className="w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300"
                type="number"
                defaultValue={i.adultsNonAlcoholic.weekDayPrice}
                placeholder="Enter Week Day Price"
                required
              />
              <input
                onChange={onChange}
                name="adultsNonAlcoholic.weekendPrice"
                className="w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300"
                type="number"
                defaultValue={i.adultsNonAlcoholic.weekendPrice}
                placeholder="Enter Weekend Price"
                required
              />
              <input
                onChange={onChange}
                name="adultsNonAlcoholic.seasonalPrice"
                className="w-[10rem] h-[2.3rem] rounded-md px-3 outline-none mr-2 border border-gray-300"
                type="number"
                defaultValue={i.adultsNonAlcoholic.seasonalPrice}
                placeholder="Enter Season Price"
                required
              />
              <button
                className="w-[7rem] h-[2rem] font-bold rounded-md text-white font-cursive bg-blue-800"
                onClick={() => update(i._id)}
              >
                Update
              </button>
            </div>
            <div
              key={i._id}
              className="mt-4 flex flex-col sm:flex-row gap-y-2 justify-between overflow-auto items-center mb-2"
            >
              <h1 className="font-bold">Nanny</h1>
              <input
                onChange={onChange}
                name="nanny.weekDayPrice"
                className="w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300"
                type="number"
                defaultValue={i.nanny.weekDayPrice}
                placeholder="Enter Week Day Price"
                required
              />
              <input
                onChange={onChange}
                name="nanny.weekendPrice"
                className="w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300"
                type="number"
                defaultValue={i.nanny.weekendPrice}
                placeholder="Enter Weekend Price"
                required
              />
              <input
                onChange={onChange}
                name="nanny.seasonalPrice"
                className="w-[10rem] h-[2.3rem] rounded-md px-3 outline-none mr-2 border border-gray-300"
                type="number"
                defaultValue={i.nanny.seasonalPrice}
                placeholder="Enter Season Price"
                required
              />
              <button
                className="w-[7rem] h-[2rem] font-bold rounded-md text-white font-cursive bg-blue-800"
                onClick={() => update(i._id)}
              >
                Update
              </button>
            </div>
            <div
              key={i._id}
              className="mt-4 flex flex-col sm:flex-row gap-y-2 justify-between overflow-auto items-center mb-2"
            >
              <h1 className="font-bold">Children</h1>
              <input
                onChange={onChange}
                name="childTotal.weekDayPrice"
                className="w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300"
                type="number"
                defaultValue={i.childTotal.weekDayPrice}
                placeholder="Enter Week Day Price"
                required
              />
              <input
                onChange={onChange}
                name="childTotal.weekendPrice"
                className="w-[10rem] h-[2.3rem] mr-2 rounded-md px-3 outline-none border border-gray-300"
                type="number"
                defaultValue={i.childTotal.weekendPrice}
                placeholder="Enter Weekend Price"
                required
              />
              <input
                onChange={onChange}
                name="childTotal.seasonalPrice"
                className="w-[10rem] h-[2.3rem] rounded-md px-3 outline-none mr-2 border border-gray-300"
                type="number"
                defaultValue={i.childTotal.seasonalPrice}
                placeholder="Enter Season Price"
                required
              />
              <button
                className="w-[7rem] h-[2rem] font-bold rounded-md text-white font-cursive bg-blue-800"
                onClick={() => update(i._id)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Daypass;
