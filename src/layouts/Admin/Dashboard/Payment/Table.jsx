import axios from "axios";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { baseUrl } from "../../../../constants/baseurl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Table = ({ tr, data }) => {
  const nav = useNavigate();
  const handleRefClick = (ref, id) => {
    nav(`/admin/jara/booking-status/${ref}`, { state: { paymentId: id } });
  };
  const trStyle =
    "pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider";
  const tdStyle =
    "p-4 text-sm text-gray-600 whitespace-nowrap text-center border-2 border-[#E9EBED] tracking-wider";

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const shortenRef = (ref) => {
    // Check if ref is defined and is a string
    if (ref && typeof ref === "string") {
      // MongoDB ObjectIds are 24 characters long
      // We'll show the first 6 and last 4 characters
      if (ref.length === 24) {
        return `${ref.slice(0, 6)}`;
      }
      return ref;
    }
    // Return a placeholder or empty string if ref is undefined or not a string
    return "";
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
                <td className={tdStyle}>{item?.name}</td>
                <td className={tdStyle}>{item?.amount}</td>
                <td
                  className={`${tdStyle}
                    ${
                      item?.status == "Success"
                        ? "text-green-500"
                        : item?.status == "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                >
                  {item?.status}
                </td>
                <td className={tdStyle}>
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => handleRefClick(item?.ref, item?._id)}
                    title={item?.ref}
                  >
                    {shortenRef(item?.ref)}
                  </span>
                </td>
                <td className={tdStyle}>{formatDate(item?.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="flex justify-center items-center h-[100%] text-lg">
          NO PAYMENT FOUND
        </h1>
      )}
    </div>
  );
};

export default Table;
