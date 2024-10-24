import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../constants/baseurl";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  return (
    <AuthContext.Provider value={{ adminUser, setAdminUser }}>
      {children}
    </AuthContext.Provider>
  );
};
