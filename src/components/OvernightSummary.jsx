import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../constants/baseurl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { PriceContext } from "../Context/PriceContext";
import Modal from "react-modal";
const OvernightSummary = () => {
  const guestCount = useSelector((state) => state.overnightGuestCount);
  const roomDetails = useSelector((state) => state.overnightRoomInfo);
  const guestDetails = useSelector((state) => state.overnightGuestDetails);
  const [disabled, setDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountDisabled, setDiscountDisabled] = useState(false);

  const [data, setData] = useState({
    heading: "",
    desc: "",
    type: "Term",
    id: "",
  });

  const getData = async () => {
    let response = await axios.get(`${baseUrl}/terms/condition/get`);
    setData({
      heading: response.data[0].heading,
      desc: response.data[0].desc,
      type: response.data[0].type,
      id: response.data[0]._id,
    });
  };

  const {
    price,
    setPrice,
    discount,
    setDiscount,
    voucher,
    setVoucher,
    multiNightDiscount,
    overnightTaxAmount,
    calPrice,
    overnightSubtotal,
    previousCost,
    previousBookingId,
    previousPaymentStatus,
    previousBookingMethod,
  } = useContext(PriceContext);
  const nav = useNavigate();

  const handleApplyVoucher = async () => {
    try {
      const response = await axios.post(`${baseUrl}/voucher/validate`, {
        code: voucherCode,
        price: price,
      });
      // console.log(response.data);
      setVoucher(response.data);
      toast.success(`Voucher applied successfully`);
      if (response.data.newPrice == 0) {
        if (!isChecked) {
          toast.error(
            "You must accept the terms and conditions first to proceed"
          );
          return;
        }
        confirmBooking("Success", "Voucher");
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Invalid Voucher Code or Expired"
      );
    }
  };
  const handleApplyDiscount = async () => {
    try {
      const response = await axios.post(`${baseUrl}/discount/validate`, {
        code: discountCode,
      });
      // console.log(response.data);
      setDiscount(response.data);
      toast.success(`Discount applied successfully`);
    } catch (error) {
      // console.log(error);
      toast.error(
        error.response.data.message || "Invalid Discount Code or Expired"
      );
    }
  };
  useEffect(() => {
    if (discount) {
      setDiscountDisabled(true);
    }
  }, [discount]);

  useEffect(() => {
    if (isChecked) {
      if (price == 0) {
        if (voucher) {
          confirmBooking("Success", "Voucher");
        } else if (discount) {
          confirmBooking("Success", "Discount");
        }
      } else if (previousCost > 0) {
        if (price - previousCost == 0) {
          confirmBooking("Success", previousBookingMethod);
        }
      }
    }
  }, [isChecked]);
  useEffect(() => {
    getData();
  }, []);
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
      let result;
      if (previousCost > 0) {
        result = await axios.put(
          `${baseUrl}/overnight/booking/update/${previousBookingId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        result = await axios.post(
          `${baseUrl}/overnight/booking/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (result.status === 200) {
        await createPayment(result.data._id, paymentStatus, method);
        success = 1;
        if (previousCost > 0) {
          toast.success("Your Booking has been Updated");
        } else {
          toast.success("Booking Created");
        }
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
      let result;
      if (previousCost > 0) {
        result = await axios.put(
          `${baseUrl}/payment/update/${previousBookingId}`,
          {
            name: guestDetails.firstname + " " + guestDetails.lastname,
            // amount: price,
            amount:
              previousPaymentStatus == "Pending"
                ? price
                : price - previousCost > 0
                ? price - previousCost
                : 0,

            status: status,
            ref: bookingId,
            method: method,
            guestDetails: JSON.stringify(guestDetails),
            roomDetails: JSON.stringify(roomDetails),
            subTotal: overnightSubtotal,
            vat: overnightTaxAmount,
            totalCost: price,
            discount: discount ? discount.percentage : 0,
            voucher: voucher ? voucher.voucher.balance : 0,
            multiNightDiscount: multiNightDiscount,
          }
        );
      } else {
        result = await axios.post(`${baseUrl}/payment/create`, {
          name: guestDetails.firstname + " " + guestDetails.lastname,
          amount: price,
          // amount:
          //   previousCost > 0
          //     ? previousPaymentStatus == "Pending"
          //       ? price
          //       : price - previousCost > 0
          //       ? price - previousCost
          //       : 0
          //     : price,
          status: status,
          ref: bookingId,
          method: method,
          guestDetails: JSON.stringify(guestDetails),
          roomDetails: JSON.stringify(roomDetails),
          subTotal: overnightSubtotal,
          vat: overnightTaxAmount,
          totalCost: price,
          discount: discount ? discount.percentage : 0,
          voucher: voucher ? voucher.voucher.balance : 0,
          multiNightDiscount: multiNightDiscount,
        });
      }
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
        console.error("Unexpected response status:");
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
          console.error("Error creating guest:");
        }
      } else {
        // Handle other errors
        console.error("Error checking guest:");
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
    // amount: price * 100,
    amount:
      previousCost > 0
        ? previousPaymentStatus == "Pending"
          ? price * 100
          : price - previousCost > 0
          ? (price - previousCost) * 100
          : 0
        : price * 100,
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
    if (!isChecked) {
      toast.error("You must accept the terms and conditions first");
      return;
    }
    confirmBooking("Pending", "Bank Transfer");
  };

  const handleCheckbox = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };
  const handlePaystackClick = () => {
    if (!isChecked) {
      toast.error("You must accept the terms and conditions first");
      return;
    }
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
          placeholder="Enter Voucher Code"
          name=""
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          className="flex-1 h-[2.3rem] border-2 border-[black] pl-3 pr-3 rounded-md outline-none"
        />
        <button
          onClick={handleApplyVoucher}
          className="w-[6rem] h-[2.3rem] bg-black text-white rounded-md"
        >
          Apply
        </button>
      </div>
      <div className="flex justify-between items-center gap-x-3 mt-4">
        <input
          type="text"
          placeholder="Enter Discount Code"
          name=""
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="flex-1 h-[2.3rem] border-2 border-[black] pl-3 pr-3 rounded-md outline-none"
        />
        <button
          onClick={handleApplyDiscount}
          disabled={discountDisabled}
          className={
            discountDisabled
              ? "w-[6rem] h-[2.3rem] bg-black text-white rounded-md opacity-50 cursor-not-allowed"
              : "w-[6rem] h-[2.3rem] bg-black text-white rounded-md"
          }
        >
          Apply
        </button>
      </div>

      <div className="flex  items-center gap-x-1 mt-4">
        <input
          type="checkbox"
          name=""
          id=""
          checked={isChecked}
          onChange={handleCheckbox}
        />
        <p>
          I accept Jara's booking{" "}
          <span
            onClick={() => setIsModalOpen(true)}
            className="underline text-blue-500 cursor-pointer"
          >
            Terms and Conditions
          </span>
        </p>
      </div>

      <div className="absolute bottom-2 w-[96%] ">
        <button
          disabled={disabled}
          className={
            !isChecked
              ? "mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive opacity-50 cursor-not-allowed"
              : "mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive"
          }
          onClick={handleHold}
        >
          Hold | Bank Trasnfer
        </button>
        {!isChecked ? (
          <div
            onClick={handlePaystackClick}
            className="mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive opacity-50 cursor-not-allowed flex items-center justify-center"
          >
            Pay with Paystack
          </div>
        ) : (
          <PaystackButton
            {...componentProps}
            className="mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive"
          />
        )}
        {/* <PaystackButton
          {...componentProps}
          onClick={handlePaystackClick}
          className="mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive"
        /> */}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Terms and Conditions"
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
            maxHeight: "80vh",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <div className="h-full w-full overflow-scroll">
          <h2 className="text-lg font-semibold mb-4 text-center">
            {data.heading}
          </h2>
          <p className="text-gray-600 text-center">{data.desc}</p>
          <button
            className="bg-blue-500 w-full text-white py-2 px-4 rounded-lg mt-4"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OvernightSummary;
