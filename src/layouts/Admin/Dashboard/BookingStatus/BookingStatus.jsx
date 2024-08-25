import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../../constants/baseurl";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import Modal from "react-modal";
import { AuthContext } from "../../../../Context/AuthContext";
const BookingStatus = ({ booking, showNav, setShowNav, id }) => {
  const { adminUser } = useContext(AuthContext);
  const location = useLocation();
  const initialPaymentId = location.state.paymentId;
  const [paymentId, setPaymentId] = useState(initialPaymentId);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedBank, setSelectedBank] = useState("");
  const iconStyle = "text-[#828893] text-lg cursor-pointer md:hidden block";
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const fetchPayment = async () => {
    try {
      const result = await axios.get(
        `${baseUrl}/payment/get/single/${paymentId}`
      );
      setPaymentInfo(result.data);
    } catch (err) {
      console.log("failed to fetch");
    }
  };
  // console.log(booking);
  // console.log(paymentInfo);

  const confirmPayment = async () => {
    try {
      const result = await axios.post(`${baseUrl}/payment/confirm/${id}`, {
        bank: selectedBank,
      });
      setIsModalOpen(false);
      toast.success("Payment confirmed");
      fetchPayment();
    } catch (error) {
      toast.error("Failed to confirm payment");
    }
  };
  const cancelBooking = async () => {
    try {
      const result = await axios.post(`${baseUrl}/payment/cancel/${id}`);
      // console.log(result);
      setIsCancelModalOpen(false);
      toast.success("Booking cancelled successfully");
      fetchPayment();
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };
  useEffect(() => {
    fetchPayment();
  }, []);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  if (!booking) return <div>Loading...</div>;
  // console.log(booking?.bookingDetails?.groups?.Nanny);
  return (
    <div className="font-robotoFont w-[100%] overflow-x-auto">
      {/* HEADER  */}
      <div className="w-[100%] bg-white h-[6rem] flex justify-between items-center p-5 border-b-2 border-solid border-[#e6e7e9]">
        <h1 className="text-2xl font-medium">Booking Status 📝</h1>
        {showNav ? (
          <ImCross onClick={() => setShowNav(!showNav)} className={iconStyle} />
        ) : (
          <GiHamburgerMenu
            onClick={() => setShowNav(!showNav)}
            className={iconStyle}
          />
        )}
      </div>
      <div className="p-5 space-y-5 w-full flex flex-col md:flex-row md:gap-x-4  md:items-start ">
        {/* Booking Information */}
        <div className="bg-white shadow-md max-h-[15rem] rounded-lg p-5">
          <h2 className="text-lg font-semibold mb-4">Booking Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between min-w-[350px]">
              <p className="text-gray-600">Booking ID</p>
              <span className="font-semibold">{booking?._id}</span>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Booking Date</p>
              <span className="font-semibold">
                {formatDate(booking?.createdAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Booking Status</p>
              <span
                className={
                  paymentInfo?.status == "Success"
                    ? "text-green-500 font-semibold"
                    : paymentInfo?.status == "Pending"
                    ? "text-yellow-500 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {paymentInfo?.status == "Success"
                  ? "Booked Paid"
                  : paymentInfo?.status == "Pending"
                  ? "Booked Unpaid"
                  : "Cancelled"}
              </span>
            </div>
            {paymentInfo?.status == "Pending" &&
              adminUser?.role === "superAdmin" && (
                <button
                  className="bg-blue-500 w-full text-white py-2 px-4 rounded-lg mt-4"
                  onClick={() => setIsModalOpen(true)}
                >
                  Confirm Payment
                </button>
              )}
          </div>
        </div>
        {/*Confirm Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Confirm Payment Modal"
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
          <h2 className="text-lg font-semibold mb-4 text-center">
            Confirm Payment
          </h2>
          <p className="text-gray-600 text-center">
            You are about to confirm this booking as paid for{" "}
            <span className="font-semibold text-blue-500">
              {booking?.guestDetails?.firstname +
                " " +
                booking?.guestDetails?.lastname}
            </span>
            . Make sure you have received payment because this action cannot be
            reversed. Are you sure?
          </p>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            <option value="">--SELECT BANK--</option>
            <option value="Access Bank">Access Bank</option>
            <option value="Guaranty Trust Bank (GTB)">
              Guaranty Trust Bank (GTB)
            </option>
          </select>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
            onClick={confirmPayment}
            disabled={!selectedBank}
          >
            Yes, I'm sure
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-lg mt-4"
            onClick={() => setIsModalOpen(false)}
          >
            No, Cancel
          </button>
        </Modal>
        <div className="w-full space-y-2">
          {/* Guest Information */}
          <div className="bg-white shadow-md rounded-lg p-5 ">
            <h2 className="text-lg font-semibold mb-4">Guest Information</h2>
            <div className="space-y-2">
              <div className="flex justify-between min-w-[350px]  ">
                <p className="text-gray-600">First Name</p>
                <span className="font-semibold text-start">
                  {booking?.guestDetails?.firstname}
                </span>
              </div>
              <div className="flex justify-between min-w-[350px] ">
                <p className="text-gray-600">Last Name</p>
                <span className="font-semibold">
                  {booking?.guestDetails?.lastname}
                </span>
              </div>
              <div className="flex justify-between min-w-[350px] ">
                <p className="text-gray-600">Email</p>
                <span className="font-semibold">
                  {booking?.guestDetails?.email}
                </span>
              </div>
              <div className="flex justify-between min-w-[350px] ">
                <p className="text-gray-600">Phone Number</p>
                <span className="font-semibold">
                  {booking?.guestDetails?.phone}
                </span>
              </div>
              <div className="flex justify-between min-w-[350px] ">
                <p className="text-gray-600">Date of Birth</p>
                <span className="font-semibold">
                  {formatDate(booking?.guestDetails?.dateOfBirth)}
                </span>
              </div>
              <div className="flex justify-between min-w-[350px] ">
                <p className="text-gray-600">Mail List</p>
                <span className="font-semibold">
                  {booking?.guestDetails?.mailLitst ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between min-w-[350px] ">
                <p className="text-gray-600">Id</p>
                <span className="font-semibold text-blue-500">
                  <a
                    href={
                      booking?.guestDetails?.photo
                        ? booking?.guestDetails?.photo
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Id
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Additional sections like Stay Information, Extras, Payment Information */}
          <div className="bg-white shadow-md rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-4">Stay Information</h2>
            <div className="space-y-2">
              <div className="flex justify-between min-w-[350px]  ">
                <p className="text-gray-600">Arrival Date</p>
                <span className="font-semibold text-start">
                  {booking?.bookingDetails?.visitDate ||
                    booking?.bookingDetails?.startDate}
                </span>
              </div>
              <div className="flex justify-between min-w-[350px] ">
                <p className="text-gray-600">Departure Date</p>
                <span className="font-semibold">
                  {booking?.bookingDetails?.endDate ||
                    booking?.bookingDetails?.startDate}
                </span>
              </div>
              <div className="flex justify-between items-start min-w-[350px] ">
                <p className="text-gray-600">Group</p>
                <span className="font-semibold space-y-2 flex flex-col items-center">
                  {
                    booking?.bookingDetails?.selectedRooms?.[0].guestCount
                      ?.adults
                  }
                  {booking?.bookingDetails?.adultsCount} Adults,{" "}
                  {
                    booking?.bookingDetails?.selectedRooms?.[0].guestCount
                      ?.children
                  }
                  {booking?.bookingDetails?.childrenCount} Children,{" "}
                  <span className="text-blue-400 font-semibold flex flex-col">
                    {booking?.bookingDetails?.selectedRooms?.[0].guestCount?.ages?.map(
                      (age, index) => (
                        <span key={index}>{age} </span>
                      )
                    )}
                    {booking?.bookingDetails?.groups?.adultsAlcoholic ? (
                      <span>
                        {booking?.bookingDetails?.groups?.adultsAlcoholic}{" "}
                        Adults Alcoholic
                      </span>
                    ) : (
                      ""
                    )}
                    {booking?.bookingDetails?.groups?.adultsNonAlcoholic ? (
                      <span>
                        {booking?.bookingDetails?.groups?.adultsNonAlcoholic}{" "}
                        Adults Non Alcoholic
                      </span>
                    ) : (
                      ""
                    )}
                    {booking?.bookingDetails?.groups?.Nanny ? (
                      <span>
                        {booking?.bookingDetails?.groups?.Nanny} Nanny
                      </span>
                    ) : (
                      ""
                    )}
                    {booking?.bookingDetails?.groups?.childTotal ? (
                      <span>
                        {booking?.bookingDetails?.groups?.childTotal} Child
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                </span>
              </div>
              <div className="flex justify-between min-w-[350px] ">
                <p className="text-gray-600">Rooms</p>
                <span className="font-semibold flex flex-col">
                  {booking?.bookingDetails?.selectedRooms?.map(
                    (room, index) => <span key={index}>{room?.title} </span>
                  ) || "Day Pass"}
                </span>
              </div>
              {booking?.bookingDetails?.selectedRooms ? (
                <div className="flex justify-between min-w-[350px] ">
                  <p className="text-gray-600">Guests</p>
                  <span className="font-semibold flex flex-col">
                    {booking?.guestDetails?.guests?.map((guest, index) => (
                      <span key={index}>
                        {guest?.firstName} {guest?.lastName} - {guest?.room}{" "}
                      </span>
                    ))}
                  </span>
                </div>
              ) : (
                ""
              )}
              <div className="flex justify-between min-w-[350px] ">
                <p className="text-gray-600">Extra Need</p>
                <span className="font-semibold">
                  {booking?.guestDetails?.para
                    ? booking?.guestDetails?.para
                    : "nothing"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-4">Extras</h2>
            {/* Add your extras fields here */}
            <div className="space-y-2">
              {booking?.bookingDetails?.finalData?.map((extra, index) => (
                <div className="flex justify-between min-w-[350px]" key={index}>
                  <p className="text-gray-600">Extra {index + 1}</p>
                  <span className="font-semibold text-start">
                    {extra.title ? extra.title : extra.type}
                  </span>
                </div>
              )) ||
                booking?.bookingDetails?.extras?.map((extra, index) => (
                  <div
                    className="flex justify-between min-w-[350px]"
                    key={index}
                  >
                    <p className="text-gray-600">Extra {index + 1}</p>
                    <span className="font-semibold text-start">
                      {extra.key}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
            {/* Add your payment information fields here */}
            <div className="space-y-2">
              <div className="flex justify-between min-w-[350px]  ">
                <p className="text-gray-600">Payment Method</p>
                <span className="font-semibold text-start">
                  {paymentInfo?.method}
                </span>
              </div>
              <div className="flex justify-between min-w-[350px] ">
                <p className="text-gray-600">Payment Status</p>
                <span className="font-semibold">{paymentInfo?.status}</span>
              </div>
              <div className="flex justify-between min-w-[350px] ">
                <p className="text-gray-600">amount</p>
                <span className="font-semibold">{paymentInfo?.amount}</span>
              </div>
              <div className="flex justify-between min-w-[350px] ">
                <p className="text-gray-600">Discount</p>
                <span className="font-semibold">None</span>
              </div>
              <div className="flex justify-between min-w-[350px] ">
                <p className="text-gray-600">Voucher</p>
                <span className="font-semibold">None</span>
              </div>
            </div>
          </div>

          {/* Cancel Modal */}
          <Modal
            isOpen={isCancelModalOpen}
            onRequestClose={() => setIsCancelModalOpen(false)}
            contentLabel="Cancel Booking Modal"
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
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">Cancel Booking</h2>
              <p className="text-gray-600 text-sm">
                Are you sure you want to cancel this booking? This action cannot
                be reversed.
              </p>
            </div>
            <button
              onClick={cancelBooking}
              className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="bg-gray-300 text-white py-2 px-4 rounded-lg mt-4"
            >
              {" "}
              No, Keep it
            </button>
          </Modal>
          <div className="flex items-center justify-end">
            {paymentInfo?.status === "Pending" &&
              adminUser?.role === "superAdmin" && (
                <button
                  onClick={() => setIsCancelModalOpen(true)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4"
                >
                  Cancel Booking
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStatus;
