import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { baseUrl } from "../../../../../constants/baseurl";
import toast from "react-hot-toast";

const Personalize = ({ setShowPopups, showPopups }) => {
  const [data, setData] = useState({
    welcomeNote: "",
    flowerPetals: "",
    baloons: "",
    floatingBreakFast: "",
    sunsetPicnic: "",
    DIYPainting: "",
    id: "",
  });

  const getData = async () => {
    let response = await axios.get(`${baseUrl}/personal/get`);
    console.log(response);
    setData({
      welcomeNote: response.data[0].welcomeNote,
      flowerPetals: response.data[0].flowerPetals,
      baloons: response.data[0].baloons,
      floatingBreakFast: response.data[0].floatingBreakFast,
      sunsetPicnic: response.data[0].sunsetPicnic,
      DIYPainting: response.data[0].DIYPainting,
      id: response.data[0]._id,
    });
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getData();
  }, []);

  const create = async () => {
    let response = await axios.post(`${baseUrl}/personal/create`, data);
    if (response.status) {
      getData();
      toast.success("Personal Experience Added");
    }
  };

  return (
    <div className="bg-white p-3 w-[80%] sm:w-[60%] md:w-[30%] rounded-md">
      <div className="flex justify-between items-center w-[100%]">
        <p>Personalized Experience</p>
        <ImCross
          className="cursor-pointer"
          onClick={() => {
            setShowPopups({ ...showPopups, personalize: false });
          }}
        />
      </div>

      <input
        type="price"
        defaultValue={data.welcomeNote}
        name="welcomeNote"
        placeholder="Adire"
        className="w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2"
        onChange={(e) => onChange(e)}
      />
      <input
        type="price"
        defaultValue={data.flowerPetals}
        name="flowerPetals"
        placeholder="Conference"
        className="w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2"
        onChange={(e) => onChange(e)}
      />
      <input
        type="price"
        defaultValue={data.baloons}
        name="baloons"
        placeholder="Dining Experience"
        className="w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2"
        onChange={(e) => onChange(e)}
      />

      <input
        type="price"
        defaultValue={data.floatingBreakFast}
        name="floatingBreakFast"
        placeholder="Daypass Extension"
        className="w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2"
        onChange={(e) => onChange(e)}
      />
      <input
        type="price"
        defaultValue={data.sunsetPicnic}
        name="sunsetPicnic"
        placeholder="Organized Team"
        className="w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2"
        onChange={(e) => onChange(e)}
      />
      <input
        type="price"
        defaultValue={data.DIYPainting}
        name="DIYPainting"
        placeholder="Photo Shoot"
        className="w-[100%] h-[2.3rem] rounded-md px-3 outline-none border border-gray-300 mt-2"
        onChange={(e) => onChange(e)}
      />

      <button
        className="mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800"
        onClick={create}
      >
        Submit
      </button>
    </div>
  );
};

export default Personalize;
