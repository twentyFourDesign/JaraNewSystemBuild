import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { baseUrl } from "../../../../constants/baseurl";

const Popup = ({ setshowPopup, setData }) => {
  const [data, setstaffData] = useState({
    code: "",
    amount: 0,
    balance: 0,
    startsAt: "",
    expireAt: "",
    status: "active",
  });

  const submitData = () => {
    if (
      !data.code ||
      !data.amount ||
      !data.balance ||
      !data.startsAt ||
      !data.expireAt ||
      !data.status
    ) {
      toast.error("All Fields Are Required");
    } else {
      axios.post(`${baseUrl}/voucher/create`, data).then((res) => {
        if (res.status) {
          toast.success("Voucher Created");
          axios.get(`${baseUrl}/voucher/get`).then((res) => {
            setData(res?.data);
          });
          setTimeout(() => {
            setshowPopup(false);
          }, 3000);
        }
      });
    }
  };
  return (
    <div className="p-5 bg-white w-[20rem] rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-robotoFont">Create Voucher</h1>
        <ImCross onClick={() => setshowPopup(false)} />
      </div>
      <input
        onChange={(e) => setstaffData({ ...data, code: e.target.value })}
        type="text"
        name="code"
        id=""
        placeholder="Code"
        className="w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none"
      />
      <input
        onChange={(e) => setstaffData({ ...data, amount: e.target.value })}
        type="number"
        name="amount"
        id=""
        placeholder="Amount"
        className="w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none"
      />
      <input
        onChange={(e) => setstaffData({ ...data, balance: e.target.value })}
        type="number"
        name="balance"
        id=""
        placeholder="Balance"
        className="w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none"
      />
      <div className="flex flex-col mt-4">
        <label htmlFor="startsAt">Starts At</label>
        <input
          onChange={(e) => setstaffData({ ...data, startsAt: e.target.value })}
          type="date"
          name="startsAt"
          id="startsAt"
          placeholder="Starts At"
          className="w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 rounded-md outline-none"
        />
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="expireAt">Expired At</label>
        <input
          onChange={(e) => setstaffData({ ...data, expireAt: e.target.value })}
          type="date"
          name="expireAt"
          id="expireAt"
          placeholder="Expired At"
          className="w-[100%] h-[2.3rem] px-3 border-2 border-gray-300  rounded-md outline-none"
        />
      </div>

      <input
        onChange={(e) => setstaffData({ ...data, status: e.target.value })}
        type="text"
        name="status"
        id=""
        placeholder="Status (active or Active)"
        defaultValue={"active"}
        className="w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none"
      />
      <button
        onClick={submitData}
        className="mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800"
      >
        Create Voucher
      </button>
    </div>
  );
};

export default Popup;
