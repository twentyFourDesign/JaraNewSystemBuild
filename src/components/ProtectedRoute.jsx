import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { adminUser } = useContext(AuthContext);
  console.log(adminUser);
  const nav = useNavigate();

  useEffect(() => {
    if (!adminUser) {
      toast.error("Please Login First");
      nav("/admin/jara/login");
    }
  }, [adminUser]);

  if (!adminUser) {
    return null; // or a loading spinner
  }

  return children;
};

export default ProtectedRoute;
