import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../constants/baseurl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";

const OvernightSummary = () => {
  const guestCount = useSelector((state) => state.overnightGuestCount);
  const roomDetails = useSelector((state) => state.overnightRoomInfo);
  const guestDetails = useSelector((state) => state.overnightGuestDetails);
  const [disabled, setDisabled] = useState(false);
  const nav = useNavigate();

  const calPrice = () => {
    let totalRoomPrice = 0;
    if (roomDetails?.selectedRooms?.length > 0) {
      for (const room of roomDetails?.selectedRooms) {
        const roomPrice = parseInt(room.price, 10);
        if (isNaN(roomPrice)) {
          console.error("Error: Invalid price format for room", room);
          continue;
        }
        totalRoomPrice += roomPrice;
      }
    }
    if (roomDetails?.finalData?.length > 0) {
      for (const extra of roomDetails?.finalData) {
        const extraPrice = parseInt(extra.price, 10);
        if (isNaN(extraPrice)) {
          console.error("Error: Invalid price format for extra", extra);
          continue;
        }
        totalRoomPrice += extraPrice;
      }
    }
    return totalRoomPrice;
  };
  const formData = new FormData();
  formData.append("guestCount", guestCount);
  formData.append("roomDetails", JSON.stringify(roomDetails));
  formData.append("guestDetails", JSON.stringify(guestDetails));
  if (guestDetails.file) {
    formData.append("file", guestDetails.file);
  }

  const confirmBooking = async (paymentStatus, method) => {
    let success = 0;
    setDisabled(true);
    try {
      let result = await axios.post(
        `${baseUrl}/overnight/booking/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (result.status === 200) {
        await createPayment(result.data._id, paymentStatus, method);
        success = 1;
        toast.success("Booking Created");
      } else {
        toast.error(result.data.message || "Failed to create booking");
        setDisabled(false);
      }
    } catch (err) {
      setDisabled(false);
      toast.error(
        err.response.data.message || "an error occured while creating booking"
      );
    }

    await createGuest();
    if (success === 1) {
      nav("/overnight/confirmation");
    }
  };
  const createPayment = async (bookingId, status, method) => {
    try {
      let result = await axios.post(`${baseUrl}/payment/create`, {
        name: guestDetails.firstname + " " + guestDetails.lastname,
        amount: (12.5 / 100) * calPrice() + calPrice(),
        status: status,
        ref: bookingId,
        method: method,
        guestDetails: JSON.stringify(guestDetails),
        roomDetails: JSON.stringify(roomDetails),
        subTotal: calPrice(),
        vat: (12.5 / 100) * calPrice(),
        totalCost: (12.5 / 100) * calPrice() + calPrice(),
      });
    } catch (err) {
      toast.error("An error occurred while creating payment");
    }
  };
  const createGuest = async () => {
    try {
      // Check if guest exists
      let guestResponse = await axios.get(
        `${baseUrl}/guest/get/email/${guestInfo.email}`
      );

      if (guestResponse.status === 202) {
        // Guest exists, proceed with booking or other logic
        console.log("Guest already exists");
      } else {
        // Handle unexpected status codes
        console.error("Unexpected response status:", guestResponse.status);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Guest not found, create guest
        try {
          await axios.post(`${baseUrl}/guest/create`, {
            name: guestInfo.firstname + " " + guestInfo.lastname,
            gender: guestInfo.gender,
            email: guestInfo.email,
            mobile: guestInfo.phone,
            member: false,
            birthdayReminded: false,
          });
          console.log("Guest created successfully");
        } catch (createErr) {
          console.error("Error creating guest:", createErr);
        }
      } else {
        // Handle other errors
        console.error("Error checking guest:", err);
      }
    }
  };

  const onSuccess = async (reference) => {
    setDisabled(true);
    try {
      const verificationResponse = await axios.get(
        `${baseUrl}/payment/paystack/verify/${reference.reference}`
      );
      if (verificationResponse.data.status === true) {
        toast.success("Payment successful!");
        confirmBooking("Success", "Paystack");
      } else {
        setDisabled(false);
        toast.error("Payment verification failed.");
      }
    } catch (error) {
      setDisabled(false);
      toast.error("Error verifying payment.");
    }
  };

  const onClose = () => {
    console.log("Transaction was not completed.");
    toast.error("Transaction was not completed..");
  };

  const componentProps = {
    email: guestDetails.email,
    amount: ((12.5 / 100) * calPrice() + calPrice()) * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    text: "Pay with Paystack",
    metadata: {
      name: guestDetails.firstname + " " + guestDetails.lastname,
      phone: guestDetails.phone,
    },
    onSuccess: (reference) => onSuccess(reference),
    onClose: onClose,
  };
  const handleHold = () => {
    confirmBooking("Pending", "Bank Transfer");
  };
  return (
    <div className="font-robotoFont py-4 px-2 h-[100%] relative">
      <h1 className="text-xl font-bold">Booking Summary</h1>
      <div className="w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2"></div>

      <div className="mt-3">
        <h1 className="text-lg font-bold">Staying Dates</h1>

        <div className="flex justify-between items-center mt-2">
          <p className="text-[#606970]">Check-in</p>
          <p>{roomDetails?.visitDate}</p>
        </div>

        <div className="flex justify-between items-center mt-1">
          <p className="text-[#606970]">Check-out</p>
          <p>{roomDetails?.endDate}</p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-x-3 mt-4">
        <input
          type="text"
          placeholder="Enter Discount Code / Voucher"
          name=""
          className="flex-1 h-[2.3rem] border-2 border-[black] pl-3 pr-3 rounded-md outline-none"
        />
        <button className="w-[6rem] h-[2.3rem] bg-black text-white rounded-md">
          Apply
        </button>
      </div>

      <div className="flex  items-center gap-x-1 mt-4">
        <input type="checkbox" />
        <p>I accept Jara’s booking terms and conditions</p>
      </div>

      <div className="absolute bottom-2 w-[96%] ">
        <button
          disabled={disabled}
          className="mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive"
          onClick={handleHold}
        >
          Hold | Bank Trasnfer
        </button>

        <PaystackButton
          {...componentProps}
          className="mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive"
        />
      </div>
    </div>
  );
};

export default OvernightSummary;
