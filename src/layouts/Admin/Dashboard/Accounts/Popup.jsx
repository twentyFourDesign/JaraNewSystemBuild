import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { baseUrl } from "../../../../constants/baseurl";

const Popup = ({ setshowPopup, setData }) => {
  const token = localStorage.getItem("token");
  const [accountData, setaccountData] = useState({
    username: "",
    email: "",
    role: "admin",
    password: "",
  });

  const submitData = () => {
    if (
      !accountData.username ||
      !accountData.email ||
      !accountData.role ||
      !accountData.password
    ) {
      toast.error("All Fields Are Required");
    } else {
      axios.post(`${baseUrl}/admin/register`, accountData).then((res) => {
        if (res.status) {
          toast.success("Admin Created");
          axios
            .get(`${baseUrl}/admin/role/admin`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
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
        <h1 className="text-lg font-robotoFont">Create Admin</h1>
        <ImCross onClick={() => setshowPopup(false)} />
      </div>
      <input
        onChange={(e) =>
          setaccountData({ ...accountData, username: e.target.value })
        }
        type="text"
        name="username"
        id=""
        placeholder="User Name"
        className="w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none"
      />
      <input
        onChange={(e) =>
          setaccountData({ ...accountData, email: e.target.value })
        }
        type="text"
        name="email"
        id=""
        placeholder="Email"
        className="w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none"
      />
      <input
        onChange={(e) =>
          setaccountData({ ...accountData, role: e.target.value })
        }
        type="text"
        name="role"
        id=""
        placeholder="Role"
        defaultValue="admin"
        disabled
        className="w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none"
      />
      <input
        onChange={(e) =>
          setaccountData({ ...accountData, password: e.target.value })
        }
        type="text"
        name="password"
        id=""
        placeholder="Password"
        className="w-[100%] h-[2.3rem] px-3 border-2 border-gray-300 mt-4 rounded-md outline-none"
      />
      <button
        onClick={submitData}
        className="mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800"
      >
        Create Admin
      </button>
    </div>
  );
};

export default Popup;
