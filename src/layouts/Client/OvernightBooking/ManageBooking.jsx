import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../../constants/baseurl";
import { insert as insertGuest } from "../../../store/slices/overnight/overnightGuest.slice";
import { insert as insertRoomDetail } from "../../../store/slices/overnight/roomDetails.slice";
import { insert as insertDetails } from "../../../store/slices/overnight/guestInfo.slice";
import axios from "axios"; // Adjust the path as needed
import toast from "react-hot-toast";
import { PriceContext } from "../../../Context/PriceContext";
const ManageBooking = () => {
  const [bookingRef, setBookingRef] = useState("");
  const [lastName, setLastName] = useState("");
  const [bookingData, setBookingData] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [disableUpdate, setDisableUpdate] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  console.log(bookingData);
  const {
    setPreviousCost,
    setPreviousPaymentStatus,
    setPreviousBookingId,
    setPreviousBookingMethod,
  } = useContext(PriceContext);
  const handleFindBooking = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/overnight/booking/get/${bookingRef}`
      );

      if (
        response?.data?.guestDetails?.lastname.toLowerCase() ==
        lastName.toLowerCase()
      ) {
        const paymentResponse = await axios.get(
          `${baseUrl}/payment/get/byBookingId/${response.data._id}`
        );

        if (paymentResponse?.data?.[0].status === "Cancelled") {
          throw new Error("Booking has been cancelled");
        }
        const visitDate = new Date(response?.data?.bookingDetails?.visitDate);
        if (visitDate < new Date()) {
          setDisableUpdate(true);
        } else {
          setDisableUpdate(false);
        }

        setPaymentInfo(paymentResponse.data[0]);
        setBookingData(response.data);
        toast.success("Booking retrieved successfully");
      } else {
        throw new Error("Booking not found");
      }
    } catch (error) {
      console.log("not Daypass Booking");
      toast.error("We could not find your booking");
      setBookingData(null);
      setPaymentInfo(null);
    }
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const handleUpdateBooking = () => {
    setPreviousCost(paymentInfo.totalCost);
    setPreviousPaymentStatus(paymentInfo.status);
    setPreviousBookingMethod(paymentInfo.method);
    setPreviousBookingId(bookingData._id);
    nav("/overnight/guest");
  };
  const handleBack = () => {
    setBookingData(null);
    setPaymentInfo(null);
    setPreviousCost(0);
    setPreviousPaymentStatus("");
    setPreviousBookingMethod(null);
    setPreviousBookingId(null);
    nav("/");
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-screen p-8 bg-gray-100 gap-5">
        <div className="flex flex-col items-center justify-center bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Manage your booking</h1>
          <div className="bg-white shadow-md rounded-lg p-6 w-96">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Booking Reference
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="66bh8bhy987hhs4bcyu67843"
                value={bookingRef}
                onChange={(e) => setBookingRef(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Okpala"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md"
              >
                Back
              </button>
              <button
                onClick={handleFindBooking}
                className="bg-black text-white font-medium py-2 px-4 rounded-md"
              >
                Find Booking
              </button>
            </div>
          </div>
        </div>
        {bookingData && (
          <div className="lg:mt-12 border-2 border-[#7EC4F6] bg-[#E6F5FF] rounded-md py-4">
            <table className="table-auto w-full text-left ">
              <tr className="border-b-2 border-[#7EC4F6]">
                <th className="text-lg font-bold pl-4 pb-2 ">
                  Booking Details
                </th>
              </tr>

              <tbody>
                <tr>
                  <td className="px-4 py-2">Booking Reference</td>
                  <td className="px-4 py-2 font-bold">{bookingData?._id}</td>
                </tr>

                <tr>
                  <td className="px-4 py-2">Visit Date</td>
                  <td className="px-4 py-2 font-bold">
                    {formatDate(bookingData?.bookingDetails?.visitDate)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">End Date</td>
                  <td className="px-4 py-2 font-bold">
                    {formatDate(bookingData?.bookingDetails?.endDate)}
                  </td>
                </tr>

                {bookingData?.bookingDetails?.selectedRooms && (
                  <tr>
                    <td className="px-4 py-2">Rooms</td>
                    <td className="px-4 py-2 font-bold">
                      {bookingData?.bookingDetails?.selectedRooms.map(
                        (room) => (
                          <>
                            <span key={room.id}>{room.title} </span>
                            <br />
                          </>
                        )
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              disabled={disableUpdate}
              className={
                disableUpdate
                  ? "bg-gray-300 text-white ml-4 font-medium py-2 px-4 rounded-md"
                  : "bg-black text-white font-medium ml-4 py-2 px-4 rounded-md"
              }
              onClick={handleUpdateBooking}
            >
              Update Booking
            </button>
          </div>
        )}
      </div>
      <div className="mt-3 gap-4 md:gap-0 flex justify-between items-center w-screen bg-[#9DD4D3] text-black font-rubic py-3 md:px-5  px-2 text-sm ">
        <div>
          <p>© {new Date().getFullYear()} JARA BEACH RESORT</p>
        </div>
        <div>
          <p className="text-right max-w-[300px] md:max-w-full">
            Owned and Operated By Little Company Nigeria Limited
          </p>
        </div>
      </div>
    </>
  );
};

export default ManageBooking;
