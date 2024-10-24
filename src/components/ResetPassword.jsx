import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { baseUrl } from "../constants/baseurl";
import { ClipLoader } from "react-spinners";
const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.put(`${baseUrl}/admin/reset-password/${token}`, {
        password,
      });
      if (res.status === 200) {
        toast.success("Password reset successful");
        setLoading(false);
        nav("/admin/jara/login");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Invalid or expired token");
        setLoading(false);
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            {loading ? (
              <ClipLoader color="white" loading={loading} size={20} />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
      {/* <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div> */}
    </div>
  );
};

export default ResetPassword;
