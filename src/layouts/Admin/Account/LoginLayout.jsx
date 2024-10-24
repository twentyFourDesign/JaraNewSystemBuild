import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import JaraLogo from "../../../assets/jaralogo.png";
import AuthImage from "../../../assets/loginImage.png";
import Input from "../../../components/Input";
import { baseUrl } from "../../../constants/baseurl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { ClipLoader } from "react-spinners";

const LoginLayout = () => {
  const [spinner, setSpinner] = useState(false);
  const { setAdminUser } = useContext(AuthContext);
  const [loginInfo, setloginInfo] = useState({ email: "", password: "" });
  const nav = useNavigate("");

  const onChangeInput = (e) => {
    setloginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const loginFunc = (e) => {
    e.preventDefault();
    setSpinner(true);
    if (!loginInfo.email || !loginInfo.password) {
      toast.error("All Fields Are Required");
      setSpinner(false);
    } else {
      axios
        .post(`${baseUrl}/admin/login`, loginInfo)
        .then((res) => {
          if (res.status) {
            toast.success("Login Succesfull");
            localStorage.setItem("adminId", res.data.adminInfo._id);
            localStorage.setItem("token", res.data.token);
            setAdminUser(res.data.adminInfo);
            setSpinner(false);
            nav("/admin/jara/booking");
          }
        })
        .catch((e) => {
          if (e.response.status === 404) {
            toast.error("Invalid Email Or Password");
            setSpinner(false);
          } else if (e.response.status === 406) {
            toast.error("Invalid Email Or Password");
            setSpinner(false);
          } else {
            toast.error("Check Your Internet Connection");
            setSpinner(false);
          }
        });
    }
  };
  const handleForgotPassword = () => {
    if (!loginInfo.email) {
      toast.error("Please Enter Email Address");
    } else {
      axios
        .post(`${baseUrl}/admin/forgot-password`, { email: loginInfo.email })
        .then((res) => {
          if (res.status) {
            toast.success("Reset Link Sent To Your Email");
          }
        })
        .catch((e) => {
          if (e.response.status === 404) {
            toast.error("Email Not Found");
          } else if (e.response.status === 500) {
            toast.error("Internal Server Error");
          } else {
            toast.error("something went wrong");
          }
        });
    }
  };
  return (
    <div className="bg-[#f9fafb] w-screen h-screen overflow-y-auto p-[2rem] flex items-center font-robotoFont">
      {/* RIGHT IMAGE  */}
      <div className="h-[28rem] xl:h-[35rem] hidden md:block">
        <div className="h-[100%] relative">
          <img
            src={AuthImage}
            alt="Jara Booking"
            className="h-[100%] rounded-xl w-[20rem] xl:w-[30rem]"
          />
        </div>

        <div className="absolute bottom-[7rem] left-[3.5rem]">
          <h1 className="text-white font-bold text-2xl tracking-wider mb-2">
            Book a stay with us.
          </h1>
          <p className="text-white font-bold font-cursive text-md tracking-wider text-wrap w-[70%]">
            Share special moments with family and friends
          </p>
        </div>
      </div>

      {/* LEFT CONTENT MAIN FORM  */}
      <div className="flex-1 h-[35rem] flex justify-center items-center flex-col">
        <div className="flex justify-center items-center flex-col">
          <img src={JaraLogo} alt="" />
          {/*JARA LOGO */}
          <h1 className="text-[#131a28] text-2xl font-semibold mt-7 font-cursive text-center">
            Welcome To Jara Beach Resort
          </h1>
          <p className="text-[#73696c] mt-2 text-lg text-center">
            Sign in to your admin account
          </p>
        </div>

        <form
          className="mt-10 md:w-[50%] w-[100%]"
          onSubmit={loginFunc}
          method="POST"
        >
          <h1 className="text-[#73696c]">Email</h1>
          <Input
            style={{ border: "1px solid lightgray" }}
            placeholder={"Enter Email Address"}
            type={"email"}
            name={"email"}
            className={
              "w-[100%] h-[2.8rem] mt-2 rounded-md pl-4 pr-4 outline-none border-none placeholder:text-gray-500"
            }
            onChangeFun={(e) => {
              onChangeInput(e);
            }}
          />

          <h1 className="text-[#73696c] mt-4">Password</h1>
          <Input
            style={{ border: "1px solid lightgray" }}
            placeholder={"Enter Your Password"}
            type={"password"}
            name={"password"}
            className={
              "w-[100%] h-[2.8rem] mt-2 rounded-md pl-4 pr-4 outline-none border-none placeholder:text-gray-500"
            }
            onChangeFun={(e) => {
              onChangeInput(e);
            }}
          />

          <button
            onClick={loginFunc}
            className="bg-[#46a1cd] w-[100%] h-[3rem] text-white mt-10 rounded-md"
          >
            {spinner ? <ClipLoader size={15} color="white" /> : "Login"}
          </button>

          <p
            onClick={handleForgotPassword}
            className="text-center text-[#73696c] mt-8 underline cursor-pointer"
          >
            Forgot your password?
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginLayout;
