import React from "react";
import { Toaster } from "react-hot-toast";

const Toast = () => {
  return <Toaster position="top-right" toastOptions={{ duration: 4000 }} />;
};

export default Toast;
