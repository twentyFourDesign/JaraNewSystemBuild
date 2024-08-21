import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/baseurl";
import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";
import { PriceContext } from "../Context/PriceContext";
const DaypassSummary = () => {
  const nav = useNavigate();
  const {
    daypassPrice,
    daypassDiscount,
    daypassVoucher,
    taxamount,
    bookingInfo,
    availablity,
    guestInfo,
    setDaypassPrice,
    setDaypassDiscount,
    setDaypassVoucher,
  } = useContext(PriceContext);
  // const bookingInfo = useSelector((state) => state.daypassBookingInfo);
  // const availablity = useSelector((state) => state.daypassAvailablity);
  // const guestInfo = useSelector((state) => state.daypassUserInfo);
  const [discountCode, setDiscountCode] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [discountDisabled, setDiscountDisabled] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  console.log("guest info", guestInfo);
  // let taxamount =
  //   (12.5 / 100) * bookingInfo.adultsAlcoholic * 45000 +
  //   bookingInfo.childTotal * 17500 +
  //   bookingInfo.adultsNonAlcoholic * 35000 +
  //   bookingInfo.Nanny * 15000;

  // const totalPrice =
  //   bookingInfo.adultsAlcoholic * 45000 +
  //   bookingInfo.childTotal * 17500 +
  //   bookingInfo.adultsNonAlcoholic * 35000 +
  //   bookingInfo.Nanny * 15000 +
  //   taxamount;

  const formData = new FormData();
  formData.append("guestCount", bookingInfo);
  formData.append("roomDetails", JSON.stringify(availablity));
  formData.append("guestDetails", JSON.stringify(guestInfo));
  if (guestInfo.file) {
    formData.append("file", guestInfo.file);
  }
  const confirmBooking = async (paymentStatus, method) => {
    let success = 0;
    setDisabled(true);
    try {
      let result = await axios.post(
        `${baseUrl}/daypass/booking/create`,
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
    } catch (error) {
      setDisabled(false);
      console.log(error);
      toast.error(
        error.response.data.message || "an error occured while creating booking"
      );
    }
    await createGuest();

    if (success === 1) {
      nav(`/daypass/confirmation`);
    }
  };
  const subTotal =
    bookingInfo.adultsAlcoholic * 45000 +
    bookingInfo.childTotal * 17500 +
    bookingInfo.adultsNonAlcoholic * 35000 +
    bookingInfo.Nanny * 15000;

  const handleApplyVoucher = async () => {
    try {
      const response = await axios.post(`${baseUrl}/daypass/voucher/validate`, {
        code: voucherCode,
        price: daypassPrice,
      });
      console.log(response.data);
      setDaypassVoucher(response.data);
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
      const response = await axios.post(
        `${baseUrl}/daypass/discount/validate`,
        {
          code: discountCode,
        }
      );
      console.log(response.data);
      setDaypassDiscount(response.data);
      toast.success(`Discount applied successfully`);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message || "Invalid Discount Code or Expired"
      );
    }
  };
  useEffect(() => {
    if (daypassDiscount) {
      setDiscountDisabled(true);
    }
  }, [daypassDiscount]);

  useEffect(() => {
    if (isChecked) {
      if (daypassPrice == 0) {
        if (daypassVoucher) {
          confirmBooking("Success", "Voucher");
        } else if (discount) {
          confirmBooking("Success", "Discount");
        }
      }
    }
  }, [isChecked]);
  const createPayment = async (bookingId, status, method) => {
    try {
      let result = await axios.post(`${baseUrl}/payment/create`, {
        name: guestInfo.firstname + " " + guestInfo.lastname,
        amount: daypassPrice,
        status: status,
        ref: bookingId,
        method: method,
        guestDetails: JSON.stringify(guestInfo),
        roomDetails: JSON.stringify(availablity),
        subTotal: subTotal,
        vat: taxamount,
        totalCost: daypassPrice,
        discount: daypassDiscount ? daypassDiscount.percentage : 0,
        voucher: daypassVoucher ? daypassVoucher.voucher.balance : 0,
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
    email: guestInfo.email,
    amount: daypassPrice * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    text: "Pay with Paystack",
    metadata: {
      name: guestInfo.firstname + " " + guestInfo.lastname,
      phone: guestInfo.phone,
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
  };
  const handlePaystackClick = () => {
    if (!isChecked) {
      toast.error("You must accept the terms and conditions first");
      return;
    }
  };
  return (
    <div className="font-robotoFont py-4 px-2 h-[100%]  relative">
      <h1 className="text-xl font-bold">Booking Summary</h1>
      <div className="w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2"></div>

      <div className="flex items-start gap-x-5 mt-10">
        <input
          type="checkbox"
          name=""
          id=""
          checked={isChecked}
          onChange={handleCheckbox}
        />
        <p className="text-xs">
          Agree with the Booking Terms and Conditions and Proceed to payment.
        </p>
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
          className="mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive"
        /> */}
      </div>
    </div>
  );
};

export default DaypassSummary;
