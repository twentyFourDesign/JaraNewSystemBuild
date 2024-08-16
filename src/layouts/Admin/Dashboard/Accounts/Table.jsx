import axios from "axios";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { baseUrl } from "../../../../constants/baseurl";
import toast from "react-hot-toast";
const Table = ({ tr, data, setData }) => {
  const token = localStorage.getItem("token");
  const trStyle =
    "pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider";
  const tdStyle =
    "p-4 text-sm text-gray-600 whitespace-nowrap text-center border-2 border-[#E9EBED] tracking-wider";

  const deleteAdmin = (id) => {
    axios
      .delete(`${baseUrl}/admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status) {
          axios
            .get(`${baseUrl}/admin/role/admin`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setData(res?.data);
            });
          toast.success("Admin Deleted");
        }
      });
  };
  return (
    <div className="w-full overflow-x-scroll md:overflow-x-auto bg-white h-[25rem] ">
      {data?.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="">
              {tr?.map((item, index) => (
                <th key={index + 100} className={trStyle}>
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td className={tdStyle}>{item?._id}</td>
                <td className={tdStyle}>{item?.username}</td>
                <td className={tdStyle}>{item?.email}</td>
                <td className={tdStyle}>{item?.role}</td>
                <td className={tdStyle}>
                  <AiFillDelete
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteAdmin(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="flex justify-center items-center h-[100%] text-lg">
          NO Admin FOUND
        </h1>
      )}
    </div>
  );
};

export default Table;
