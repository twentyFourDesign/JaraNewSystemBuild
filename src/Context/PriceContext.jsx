import React, { createContext, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

const roundUpToNearestWhole = (number) => Math.ceil(number);

export const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
  const guestCount = useSelector((state) => state.overnightGuestCount);
  const roomDetails = useSelector((state) => state.overnightRoomInfo);
  const guestDetails = useSelector((state) => state.overnightGuestDetails);
  // console.log(guestCount);
  const bookingInfo = useSelector((state) => state.daypassBookingInfo);
  // console.log(bookingInfo);
  const availablity = useSelector((state) => state.daypassAvailablity);
  // console.log(availablity);
  const guestInfo = useSelector((state) => state.daypassUserInfo);
  const [discount, setDiscount] = useState(null);
  const [voucher, setVoucher] = useState(null);
  const [daypassDiscount, setDaypassDiscount] = useState(null);
  const [daypassVoucher, setDaypassVoucher] = useState(null);
  const [price, setPrice] = useState(0);
  const [daypassPrice, setDaypassPrice] = useState(0);
  const [overnightTaxAmount, setOvernightTaxAmount] = useState(0);
  const [overnightSubtotal, setOvernightSubtotal] = useState(0);
  const [daypassSubtotal, setDaypassSubtotal] = useState(0);
  const [daypassTaxAmount, setDaypassTaxAmount] = useState(0);
  const [multiNightDiscount, setMultiNightDiscount] = useState(0);
  // console.log(voucher);
  const calPrice = useCallback(() => {
    const pricingPercentages = {
      "Ocean deluxe 1": { child: 0.3472222, toddler: 0.1736111, infant: 0 },
      "Ocean deluxe 2": { child: 0.3472222, toddler: 0.1736111, infant: 0 },
      "Ocean deluxe 3": { child: 0.3472222, toddler: 0.1736111, infant: 0 },
      "Ocean deluxe 4": { child: 0.3472222, toddler: 0.1736111, infant: 0 },
      "Ocean deluxe 5": { child: 0.3472222, toddler: 0.1736111, infant: 0 },
      "Family Room 6": { child: 0.3704, toddler: 0.1852, infant: 0 },
      "Family Cabin 7": { child: 0.3704, toddler: 0.1852, infant: 0 },
      "Family Cabin 8": { child: 0.3704, toddler: 0.1852, infant: 0 },
      "Family Cabin 9": { child: 0.3704, toddler: 0.1852, infant: 0 },
      "Sunrise 10": { child: 0.3148, toddler: 0.1574, infant: 0 },
      "Sunset 11": { child: 0.3148, toddler: 0.1574, infant: 0 },
      "Loft 12A": { child: 0.3385, toddler: 0.1693, infant: 0 },
      "Loft 12B": { child: 0.3385, toddler: 0.1693, infant: 0 },
      "Studio 14": { child: 0.3704, toddler: 0.1852, infant: 0 },
      "Studio 15": { child: 0.3704, toddler: 0.1852, infant: 0 },
      "Studio 16": { child: 0.3704, toddler: 0.1852, infant: 0 },
      "Studio 17": { child: 0.3704, toddler: 0.1852, infant: 0 },
    };

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
      // console.log(roomDetails);
      // console.log(roomDetails.selectedRooms);
      for (const room of roomDetails?.selectedRooms) {
        let roomPrice = parseInt(room.price, 10);
        if (isNaN(roomPrice)) {
          console.error("Error: Invalid price format for room", room);
          continue;
        }
        const roomType = room.title;
        const roomPricing = pricingPercentages[roomType];

        if (!roomPricing) {
          console.error(
            "Error: Pricing percentages not defined for room type",
            roomType
          );
          continue;
        }

        const numAdults = guestCount.adults;
        const numChildren = guestCount.ages.filter((age) =>
          age.includes("child")
        ).length;
        const numToddlers = guestCount.ages.filter((age) =>
          age.includes("toddler")
        ).length;
        const numInfants = guestCount.ages.filter((age) =>
          age.includes("infant")
        ).length;

        const adultPrice = roomPrice;
        const childPrice = adultPrice * roomPricing.child;
        const toddlerPrice = adultPrice * roomPricing.toddler;
        const infantPrice = adultPrice * roomPricing.infant;

        roomPrice =
          numAdults * adultPrice +
          numChildren * childPrice +
          numToddlers * toddlerPrice +
          numInfants * infantPrice;

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

      // Apply discount only to eligible rooms
      let eligibleRoomPrice = 0;
      for (const room of roomDetails?.selectedRooms) {
        if (eligibleRooms.includes(room.title)) {
          const roomType = room.title;
          const roomPricing = pricingPercentages[roomType];

          if (!roomPricing) {
            console.error(
              "Error: Pricing percentages not defined for room type",
              roomType
            );
            continue;
          }

          const numAdults = guestCount.adults;
          const numChildren = guestCount.ages.filter((age) =>
            age.includes("child")
          ).length;
          const numToddlers = guestCount.ages.filter((age) =>
            age.includes("toddler")
          ).length;
          const numInfants = guestCount.ages.filter((age) =>
            age.includes("infant")
          ).length;

          const adultPrice = parseInt(room.price, 10);
          const childPrice = adultPrice * roomPricing.child;
          const toddlerPrice = adultPrice * roomPricing.toddler;
          const infantPrice = adultPrice * roomPricing.infant;

          const roomPrice =
            numAdults * adultPrice +
            numChildren * childPrice +
            numToddlers * toddlerPrice +
            numInfants * infantPrice;

          eligibleRoomPrice += roomPrice;
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
    setOvernightSubtotal(totalRoomPrice);
    let taxamount = (12.5 / 100) * totalRoomPrice;
    totalRoomPrice += taxamount;
    setOvernightTaxAmount(taxamount);
    // Round up the total price
    return roundUpToNearestWhole(totalRoomPrice);
  }, [guestCount, roomDetails, discount, voucher]);

  useEffect(() => {
    setPrice(calPrice());
  }, [calPrice]);

  useEffect(() => {
    const calculateDaypassPrice = () => {
      if (!availablity.startDate) {
        setDaypassSubtotal(0);
        return 0;
      }

      const selectedDate = new Date(availablity.startDate);
      const dayOfWeek = selectedDate.getDay();
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0; // Friday, Saturday, or Sunday

      const prices = {
        adultsAlcoholic: isWeekend ? 45000 : 40000,
        adultsNonAlcoholic: isWeekend ? 35000 : 30000,
        child: isWeekend ? 17500 : 15000,
        Nanny: 15000,
      };

      let subtotal =
        bookingInfo.adultsAlcoholic * prices.adultsAlcoholic +
        bookingInfo.adultsNonAlcoholic * prices.adultsNonAlcoholic +
        bookingInfo.childTotal * prices.child +
        bookingInfo.Nanny * prices.Nanny;
      if (availablity?.extras?.length > 0) {
        for (const extra of availablity?.extras) {
          const extraPrice = parseInt(extra.price, 10);
          if (isNaN(extraPrice)) {
            console.error("Error: Invalid price format for extra", extra);
            continue;
          }
          subtotal += extraPrice;
        }
      }
      const taxAmount = subtotal * 0.125; // 12.5% tax
      let total = subtotal + taxAmount;

      if (daypassVoucher) {
        total = daypassVoucher.newPrice;
      }
      if (daypassDiscount) {
        total -= (daypassDiscount.percentage / 100) * total;
      }

      setDaypassSubtotal(roundUpToNearestWhole(subtotal));
      setDaypassTaxAmount(roundUpToNearestWhole(taxAmount));
      return roundUpToNearestWhole(total);
    };

    setDaypassPrice(calculateDaypassPrice());
  }, [bookingInfo, availablity, daypassDiscount, daypassVoucher]);

  return (
    <PriceContext.Provider
      value={{
        price,
        daypassPrice,
        overnightTaxAmount,
        overnightSubtotal,
        daypassSubtotal,
        setDaypassSubtotal,
        daypassTaxAmount,
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
        calPrice, // Add this line to expose calPrice function
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};
