import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
  const guestCount = useSelector((state) => state.overnightGuestCount);
  const roomDetails = useSelector((state) => state.overnightRoomInfo);
  const guestDetails = useSelector((state) => state.overnightGuestDetails);
  const [discount, setDiscount] = useState(null);
  const [voucher, setVoucher] = useState(null);
  const [price, setPrice] = useState(0);
  console.log(voucher);
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

  return (
    <PriceContext.Provider
      value={{ price, setPrice, discount, setDiscount, voucher, setVoucher }}
    >
      {children}
    </PriceContext.Provider>
  );
};
