import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Account from "./Account";
import axios from "axios";
import { baseUrl } from "../../../../constants/baseurl";

const Main = () => {
  const token = localStorage.getItem("token");
  const [showNav, setShowNav] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/admin/role/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res?.data);
      });
  }, []);

  return (
    <div>
      <Layout
        setShowNav={setShowNav}
        showNav={showNav}
        component={
          <Account
            setData={setData}
            data={data}
            setShowNav={setShowNav}
            showNav={showNav}
          />
        }
      />
    </div>
  );
};

export default Main;
