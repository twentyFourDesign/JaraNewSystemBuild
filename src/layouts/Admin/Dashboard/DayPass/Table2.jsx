import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const Table2 = ({ tr, data }) => {
  const [photo, setPhoto] = useState("");
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }
  const [isModal2Open, setIsModal2Open] = useState(false);
  const handleOpenModal2 = (item) => {
    setPhoto(item);
    setIsModal2Open(true);
  };
  const trStyle =
    "pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider";
  const tdStyle =
    "p-4 text-sm text-gray-600 whitespace-nowrap text-start border-2 border-[#E9EBED] tracking-wider";
  return (
    <>
      <Modal
        isOpen={isModal2Open}
        onRequestClose={() => setIsModal2Open(false)}
        contentLabel="ID"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            minWidth: "300px",
            maxWidth: "400px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">Guest ID</h2>
        <img
          src={photo}
          alt="guest id"
          className="w-full h-auto object-cover"
        />
      </Modal>
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
                <tr key={item._id}>
                  <td className={tdStyle}>{item?._id}</td>
                  <td className={tdStyle}>
                    {item?.guestDetails?.firstname +
                      item?.guestDetails?.lastname}
                  </td>
                  <td className={tdStyle}>{item?.guestDetails?.email}</td>
                  <td className={tdStyle}>{item?.guestDetails?.phone}</td>
                  <td className={tdStyle}>{item?.guestDetails?.gender}</td>
                  <td className={tdStyle}>
                    {item?.totalGuest?.adultsAlcoholic}
                  </td>
                  <td className={tdStyle}>
                    {item?.totalGuest?.adultsNonAlcoholic}
                  </td>
                  <td className={tdStyle}>{item?.totalGuest?.Nanny}</td>
                  <td className={tdStyle}>{item?.totalGuest?.childTotal}</td>

                  <td className={tdStyle}>
                    {item?.bookingDetails?.startDate
                      ? formatDate(item?.bookingDetails?.startDate)
                      : ""}
                  </td>
                  <td className={tdStyle}>{item?.bookingDetails?.dayType}</td>

                  <td className={tdStyle}>
                    {item?.bookingDetails?.extras?.map((i, index) => (
                      <span key={index}>
                        <span>{i?.key || i?.type || i?.title}</span>
                        <span className="ml-1 mr-1">-</span>
                      </span>
                    ))}
                  </td>
                  <td className={tdStyle}>
                    {/* <a
                    href={
                      item?.guestDetails?.photo
                        ? item?.guestDetails?.photo
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a> */}
                    <button
                      className="text-blue-500"
                      onClick={() =>
                        handleOpenModal2(item?.guestDetails?.photo)
                      }
                    >
                      View Id
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 className="flex justify-center items-center h-[100%] text-lg">
            NO BOOKING FOUND
          </h1>
        )}
      </div>
    </>
  );
};

export default Table2;
