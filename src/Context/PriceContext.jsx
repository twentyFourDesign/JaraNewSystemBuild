import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
  const guestCount = useSelector((state) => state.overnightGuestCount);
  const roomDetails = useSelector((state) => state.overnightRoomInfo);
  const guestDetails = useSelector((state) => state.overnightGuestDetails);
  console.log(guestCount);
  const bookingInfo = useSelector((state) => state.daypassBookingInfo);
  const availablity = useSelector((state) => state.daypassAvailablity);
  const guestInfo = useSelector((state) => state.daypassUserInfo);
  const [discount, setDiscount] = useState(null);
  const [voucher, setVoucher] = useState(null);
  const [daypassDiscount, setDaypassDiscount] = useState(null);
  const [daypassVoucher, setDaypassVoucher] = useState(null);
  const [price, setPrice] = useState(0);
  const [daypassPrice, setDaypassPrice] = useState(0);
  const [multiNightDiscount, setMultiNightDiscount] = useState(0);
  console.log(voucher);
  const calPrice = () => {
    let totalRoomPrice = 0;
    const eligibleRooms = [
      "Ocean deluxe 1",
      "Ocean deluxe 2",
      "Ocean deluxe 3",
      "Ocean deluxe 4",
      "Ocean deluxe 5",
      "Family Room 6",
      "Family Cabin 7",
      "Family Cabin 8",
      "Family Cabin 9",
      "Studio 14",
      "Studio 15",
      "Studio 16",
      "Studio 17",
    ]; // Add other eligible room titles as needed
    if (roomDetails?.selectedRooms?.length > 0) {
      console.log(roomDetails);
      console.log(roomDetails.selectedRooms);
      for (const room of roomDetails?.selectedRooms) {
        const roomPrice = parseInt(room.price, 10);
        if (isNaN(roomPrice)) {
          console.error("Error: Invalid price format for room", room);
          continue;
        }

        totalRoomPrice += roomPrice;
      }
    }
    if (
      roomDetails?.visitDate &&
      roomDetails?.endDate &&
      roomDetails?.selectedRooms.length > 0
    ) {
      const visitDate = new Date(roomDetails?.visitDate);
      const endDate = new Date(roomDetails?.endDate);
      const numberOfNights = (endDate - visitDate) / (1000 * 60 * 60 * 24);

      // Apply multi-night discount
      let discountPercentage = 0;
      if (numberOfNights >= 2 && numberOfNights < 3) {
        discountPercentage = 10;
      } else if (numberOfNights >= 3 && numberOfNights < 4) {
        discountPercentage = 15;
      } else if (numberOfNights >= 4) {
        discountPercentage = 20;
      }
      console.log(discountPercentage);

      // Apply discount only to eligible rooms
      let eligibleRoomPrice = 0;
      for (const room of roomDetails?.selectedRooms) {
        if (eligibleRooms.includes(room.title)) {
          eligibleRoomPrice += parseInt(room.price, 10);
        }
      }
      if (eligibleRoomPrice !== 0) {
        setMultiNightDiscount(discountPercentage);
      }
      const discountAmount = (discountPercentage / 100) * eligibleRoomPrice; // Store the multi-night discount amount
      totalRoomPrice -= discountAmount;
    }

    // Calculate total number of guests
    const totalGuests =
      guestCount.adults +
      guestCount.children +
      guestCount.toddler +
      guestCount.infants;

    // Apply additional guest discount
    let additionalGuestDiscount = 0;
    if (totalGuests >= 40) {
      additionalGuestDiscount = 10;
    } else if (totalGuests >= 30) {
      additionalGuestDiscount = 5;
    }

    const additionalGuestDiscountAmount =
      (additionalGuestDiscount / 100) * totalRoomPrice;
    totalRoomPrice -= additionalGuestDiscountAmount;
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
    if (voucher) {
      totalRoomPrice = voucher.newPrice;
    }
    if (discount) {
      totalRoomPrice -= (discount.percentage / 100) * totalRoomPrice;
    }

    return totalRoomPrice;
  };

  useEffect(() => {
    setPrice(calPrice());
  }, [guestCount, roomDetails, guestDetails, discount, voucher]);

  let taxamount =
    (12.5 / 100) * bookingInfo.adultsAlcoholic * 45000 +
    bookingInfo.childTotal * 17500 +
    bookingInfo.adultsNonAlcoholic * 35000 +
    bookingInfo.Nanny * 15000;

  const totalPrice =
    bookingInfo.adultsAlcoholic * 45000 +
    bookingInfo.childTotal * 17500 +
    bookingInfo.adultsNonAlcoholic * 35000 +
    bookingInfo.Nanny * 15000 +
    taxamount;

  useEffect(() => {
    setDaypassPrice(totalPrice);
    if (daypassVoucher) {
      setDaypassPrice(daypassVoucher.newPrice);
    }
    if (daypassDiscount) {
      let newDaypassPrice =
        daypassPrice - (daypassDiscount.percentage / 100) * daypassPrice;
      setDaypassPrice(newDaypassPrice);
    }
  }, [
    bookingInfo,
    taxamount,
    availablity,
    guestInfo,
    daypassDiscount,
    daypassVoucher,
  ]);

  return (
    <PriceContext.Provider
      value={{
        price,
        daypassPrice,
        taxamount,
        setDaypassPrice,
        daypassDiscount,
        setDaypassDiscount,
        daypassVoucher,
        setDaypassVoucher,
        setPrice,
        discount,
        setDiscount,
        voucher,
        setVoucher,
        bookingInfo,
        availablity,
        guestInfo,
        multiNightDiscount,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};
