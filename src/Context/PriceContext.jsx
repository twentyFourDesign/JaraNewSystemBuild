import React, { createContext, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../constants/baseurl";

const roundUpToNearestWhole = (number) => Math.ceil(number);

export const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
  const guestCount = useSelector((state) => state.overnightGuestCount);
  // console.log(guestCount);
  const guestCount2 = useSelector(
    (state) => state.overnightGuestCount.adults || 0
  );
  // console.log(guestCount2);
  // console.log(guestCount);
  const roomDetails = useSelector((state) => state.overnightRoomInfo);
  const guestDetails = useSelector((state) => state.overnightGuestDetails);
  // console.log(guestCount);
  const bookingInfo = useSelector((state) => state.daypassBookingInfo);
  // console.log(bookingInfo);
  const availablity = useSelector((state) => state.daypassAvailablity);
  // console.log(availablity);
  const [selectedDate, setSelectedDate] = useState({
    visitDate: null,
    endDate: null,
  });
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedRoomIds, setSelectedRoomIds] = useState([]);

  const [numChildren, setNumChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [guestNumber, setguestNumber] = useState({
    adults: 0,
    children: 0,
    toddler: 0,
    infants: 0,
    ages: [],
  });
  const [finalData, setFinalData] = useState([]);
  const [userDetails, setuserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
    para: "",
    dateOfBirth: "",
    mailLitst: false,
    keepInfo: false,
    file: "",
    aboutUs: "",
    guests: [],
  });

  // Add this useEffect to update the guests array when guestCount2 changes
  useEffect(() => {
    setuserDetails((prevDetails) => ({
      ...prevDetails,
      guests: Array.from({ length: guestCount2 }, (_, i) => ({
        id: i + 1,
        firstName: "",
        lastName: "",
        room: "",
      })),
    }));
  }, [guestCount2]);

  const guestInfo = useSelector((state) => state.daypassUserInfo);
  const [guestInfo2, setGuestInfo2] = useState({
    adultsAlcoholic: 0,
    adultsNonAlcoholic: 0,
    Nanny: 0,
    childTotal: 0,
  });
  const [finalData2, setFinalData2] = useState([]);
  const [dayType, setdayType] = useState("weekdays");
  const [availablityInfo, setavailablityInfo] = useState({
    dayType: "",
    startDate: "",
    extras: finalData,
    groups: bookingInfo,
    adultsCount: bookingInfo.adultsAlcoholic + bookingInfo.adultsNonAlcoholic,
    childrenCount: bookingInfo.Nanny + bookingInfo.childTotal,
  });
  const [userDetails2, setuserDetails2] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
    para: "",
    aboutUs: "",
    dateOfBirth: "",
    file: "",
    mailLitst: false,
    keepInfo: false,
  });
  const [extraFormData, setExtraFormData] = useState({});
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
  const [additionalGuestDiscount, setAdditionalGuestDiscount] = useState(0);
  const [previousCost, setPreviousCost] = useState(0);
  const [previousPaymentStatus, setPreviousPaymentStatus] = useState("");
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [previousBookingId, setPreviousBookingId] = useState(null);
  const [previousBookingMethod, setPreviousBookingMethod] = useState(null);
  const [roomGuestDistribution, setRoomGuestDistribution] = useState({});
  const [dateChoosed, setDateChoosed] = useState(false);
  // console.log(previousCost);
  // let roomsname = "";
  const [peakOffPriceSetting, setPeakOffPriceSetting] = useState({
    isEnabled: false,
    percentage: 0,
  });
  const [daypassGuestPriceData, setDaypassGuestPriceData] = useState(null);

  const fetchDaypassGuestPriceData = async () => {
    try {
      let response = await axios.get(`${baseUrl}/option/get`);
      setDaypassGuestPriceData(response.data);
    } catch (error) {
      console.error("Error fetching peak-off price");
    }
  };
  const fetchPeakOffPriceSetting = async () => {
    try {
      const response = await axios.get(`${baseUrl}/peak/peak-off-price`);
      setPeakOffPriceSetting(response.data);
    } catch (error) {
      console.error("Error fetching peak-off price");
    }
  };
  useEffect(() => {
    fetchPeakOffPriceSetting();
    fetchDaypassGuestPriceData();
  }, []);

  const calPrice = useCallback(() => {
    const pricingPercentages = {
      "Ocean Deluxe 1": { child: 0.3472222, toddler: 0.1736111, infant: 0 },
      "Ocean Deluxe 2": { child: 0.3472222, toddler: 0.1736111, infant: 0 },
      "Ocean Deluxe 3": { child: 0.3472222, toddler: 0.1736111, infant: 0 },
      "Ocean Deluxe 4": { child: 0.3472222, toddler: 0.1736111, infant: 0 },
      "Ocean Deluxe 5": { child: 0.3472222, toddler: 0.1736111, infant: 0 },
      "Family Room 6": {
        child: 0.3703703704,
        toddler: 0.1851851852,
        infant: 0,
      },
      "Family Cabin 7": {
        child: 0.3703703704,
        toddler: 0.1851851852,
        infant: 0,
      },
      "Family Cabin 8": {
        child: 0.3703703704,
        toddler: 0.1851851852,
        infant: 0,
      },
      "Family Cabin 9": {
        child: 0.3703703704,
        toddler: 0.1851851852,
        infant: 0,
      },
      "Sunrise 10": { child: 0.3148148148, toddler: 0.1574074074, infant: 0 },
      "Sunset 11": { child: 0.3148148148, toddler: 0.1574074074, infant: 0 },
      "Loft 12A": { child: 0.3385416667, toddler: 0.169270833, infant: 0 },
      "Loft 12B": { child: 0.3385416667, toddler: 0.169270833, infant: 0 },
      "Studio 14": { child: 0.3703703704, toddler: 0.1851851852, infant: 0 },
      "Studio 15": { child: 0.3703703704, toddler: 0.1851851852, infant: 0 },
      "Studio 16": { child: 0.3703703704, toddler: 0.1851851852, infant: 0 },
      "Studio 17": { child: 0.3703703704, toddler: 0.1851851852, infant: 0 },
    };

    let totalRoomPrice = 0;
    let eligibleRoomPrice = 0;
    const eligibleRooms = [
      "Ocean Deluxe 1",
      "Ocean Deluxe 2",
      "Ocean Deluxe 3",
      "Ocean Deluxe 4",
      "Ocean Deluxe 5",
      "Family Room 6",
      "Family Cabin 7",
      "Family Cabin 8",
      "Family Cabin 9",
      "Studio 14",
      "Studio 15",
      "Studio 16",
      "Studio 17",
    ]; // Add other eligible room titles as needed
    // if (roomDetails?.selectedRooms?.length > 0) {
    //   for (const room of roomDetails?.selectedRooms) {
    //     let roomPrice = parseInt(room.price, 10);
    //     if (isNaN(roomPrice)) {
    //       console.error("Error: Invalid price format for room", room);
    //       continue;
    //     }
    //     const roomType = room.title;
    //     const roomPricing = pricingPercentages[roomType];

    //     if (!roomPricing) {
    //       console.error(
    //         "Error: Pricing percentages not defined for room type",
    //         roomType
    //       );
    //       continue;
    //     }

    //     const numAdults = guestCount?.adults;
    //     const numChildren = guestCount?.ages?.filter((age) =>
    //       age.includes("child")
    //     ).length;
    //     const numToddlers = guestCount?.ages?.filter((age) =>
    //       age.includes("toddler")
    //     ).length;
    //     const numInfants = guestCount?.ages?.filter((age) =>
    //       age.includes("infant")
    //     ).length;

    //     const adultPrice = roomPrice;
    //     const childPrice = Math.ceil(adultPrice * roomPricing.child);
    //     const toddlerPrice = Math.ceil(adultPrice * roomPricing.toddler);
    //     const infantPrice = Math.ceil(adultPrice * roomPricing.infant);

    //     roomPrice =
    //       numAdults * adultPrice +
    //       numChildren * childPrice +
    //       numToddlers * toddlerPrice +
    //       numInfants * infantPrice;

    //     totalRoomPrice += roomPrice;
    //   }
    // }

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

      const numAdults = guestCount?.adults;
      const numChildren = guestCount?.ages?.filter((age) =>
        age.includes("child")
      ).length;
      const numToddlers = guestCount?.ages?.filter((age) =>
        age.includes("toddler")
      ).length;
      const numInfants = guestCount?.ages?.filter((age) =>
        age.includes("infant")
      ).length;

      // console.log(roomsname);
      for (const room of roomDetails?.selectedRooms) {
        const roomDistribution =
          roomDetails.roomGuestDistribution[room.id] || {};
        const numAdults = roomDistribution.adults || 0;
        const numChildren = roomDistribution.children || 0;
        const numToddlers = roomDistribution.toddlers || 0;
        const numInfants = roomDistribution.infants || 0;

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
          let adultPrice;
          if (peakOffPriceSetting.isEnabled) {
            adultPrice =
              parseInt(room.price, 10) +
              parseInt(room.price, 10) * (peakOffPriceSetting.percentage / 100);
          } else {
            adultPrice = parseInt(room.price, 10);
          }

          const childPrice = Math.ceil(adultPrice * roomPricing.child);
          const toddlerPrice = Math.ceil(adultPrice * roomPricing.toddler);
          const infantPrice = Math.ceil(adultPrice * roomPricing.infant);
          let roomPrice;
          if (numInfants > 1) {
            roomPrice =
              numAdults * adultPrice +
              numChildren * childPrice +
              numToddlers * toddlerPrice +
              numInfants * toddlerPrice;
          } else {
            roomPrice =
              numAdults * adultPrice +
              numChildren * childPrice +
              numToddlers * toddlerPrice +
              numInfants * infantPrice;
          }

          eligibleRoomPrice += roomPrice;
        } else {
          const roomType = room.title;
          const roomPricing = pricingPercentages[roomType];

          if (!roomPricing) {
            console.error(
              "Error: Pricing percentages not defined for room type",
              roomType
            );
            continue;
          }

          let adultPrice;
          if (peakOffPriceSetting.isEnabled) {
            adultPrice =
              parseInt(room.price, 10) +
              parseInt(room.price, 10) * (peakOffPriceSetting.percentage / 100);
          } else {
            adultPrice = parseInt(room.price, 10);
          }
          const childPrice = Math.ceil(adultPrice * roomPricing.child);
          const toddlerPrice = Math.ceil(adultPrice * roomPricing.toddler);
          const infantPrice = Math.ceil(adultPrice * roomPricing.infant);

          let roomPrice;
          if (numInfants > 1) {
            roomPrice =
              numAdults * adultPrice +
              numChildren * childPrice +
              numToddlers * toddlerPrice +
              numInfants * toddlerPrice;
          } else {
            roomPrice =
              numAdults * adultPrice +
              numChildren * childPrice +
              numToddlers * toddlerPrice +
              numInfants * infantPrice;
          }

          totalRoomPrice += roomPrice;
        }
      }
      if (eligibleRoomPrice !== 0) {
        setMultiNightDiscount(discountPercentage);
      }
      totalRoomPrice += eligibleRoomPrice;
      totalRoomPrice *= numberOfNights;
      const discountAmount =
        (discountPercentage / 100) * (eligibleRoomPrice * numberOfNights);
      totalRoomPrice -= discountAmount;
    }

    // Calculate total number of guests
    const totalGuests =
      guestCount.adults +
      guestCount.children +
      guestCount.toddler +
      guestCount.infants;

    // Apply additional guest discount
    // let additionalGuestDiscount = 0;
    if (totalGuests >= 40) {
      setAdditionalGuestDiscount(10);
    } else if (totalGuests >= 30) {
      setAdditionalGuestDiscount(5);
    } else {
      setAdditionalGuestDiscount(0);
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
  }, [calPrice, guestCount, roomDetails, discount, voucher]);

  const calculateDaypassPrice = () => {
    if (!availablity.startDate) {
      setDaypassSubtotal(0);
      setDaypassTaxAmount(0);
      return 0;
    }
    const prices = {
      adultsAlcoholic:
        availablity?.dayType === "weekdays"
          ? parseFloat(daypassGuestPriceData?.[0].adultsAlcoholic?.weekDayPrice)
          : availablity?.dayType === "weekends"
          ? parseFloat(daypassGuestPriceData?.[0].adultsAlcoholic?.weekendPrice)
          : availablity?.dayType === "Seasonal"
          ? parseFloat(
              daypassGuestPriceData?.[0].adultsAlcoholic?.seasonalPrice
            )
          : 0,
      adultsNonAlcoholic:
        availablity?.dayType === "weekdays"
          ? parseFloat(
              daypassGuestPriceData?.[0].adultsNonAlcoholic?.weekDayPrice
            )
          : availablity?.dayType === "weekends"
          ? parseFloat(
              daypassGuestPriceData?.[0].adultsNonAlcoholic?.weekendPrice
            )
          : availablity?.dayType === "Seasonal"
          ? parseFloat(
              daypassGuestPriceData?.[0].adultsNonAlcoholic?.seasonalPrice
            )
          : 0,
      child:
        availablity?.dayType === "weekdays"
          ? parseFloat(daypassGuestPriceData?.[0].childTotal?.weekDayPrice)
          : availablity?.dayType === "weekends"
          ? parseFloat(daypassGuestPriceData?.[0].childTotal?.weekendPrice)
          : availablity?.dayType === "Seasonal"
          ? parseFloat(daypassGuestPriceData?.[0].childTotal?.seasonalPrice)
          : 0,
      Nanny:
        availablity?.dayType === "weekdays"
          ? parseFloat(daypassGuestPriceData?.[0].nanny?.weekDayPrice)
          : availablity?.dayType === "weekends"
          ? parseFloat(daypassGuestPriceData?.[0].nanny?.weekendPrice)
          : availablity?.dayType === "Seasonal"
          ? parseFloat(daypassGuestPriceData?.[0].nanny?.seasonalPrice)
          : 0,
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
  useEffect(() => {
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
        setMultiNightDiscount,
        calPrice,
        calculateDaypassPrice,
        previousCost,
        setPreviousCost,
        previousPaymentStatus,
        setPreviousPaymentStatus,
        numberOfNights,
        setNumberOfNights,
        previousBookingId,
        setPreviousBookingId,
        previousBookingMethod,
        setPreviousBookingMethod,
        selectedDate,
        setSelectedDate,
        selectedRoomIds,
        setSelectedRoomIds,
        selectedRooms,
        setSelectedRooms,
        numChildren,
        setNumChildren,
        childrenAges,
        setChildrenAges,
        guestNumber,
        setguestNumber,
        finalData,
        setFinalData,
        userDetails,
        setuserDetails,
        guestInfo2,
        setGuestInfo2,
        finalData2,
        setFinalData2,
        dayType,
        setdayType,
        availablityInfo,
        setavailablityInfo,
        userDetails2,
        setuserDetails2,
        extraFormData,
        setExtraFormData,
        roomGuestDistribution,
        setRoomGuestDistribution,
        dateChoosed,
        setDateChoosed,
        additionalGuestDiscount,
        setAdditionalGuestDiscount,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};
