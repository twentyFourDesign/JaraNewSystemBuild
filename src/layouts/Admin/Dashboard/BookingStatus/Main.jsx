import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import BookingStatus from "./BookingStatus";
import { baseUrl } from "../../../../constants/baseurl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const Main = () => {
  const { ref: bookingRef } = useParams();
  const [showNav, setShowNav] = useState(false);
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/overnight/booking/get/${bookingRef}`
        );
        setBooking(response.data);
      } catch (error) {
        try {
          const response = await axios.get(
            `${baseUrl}/daypass/booking/get/${bookingRef.toString()}`
          );
          setBooking(response.data);
        } catch (error) {
          console.log("not Daypass Booking");
        }
        console.log("not Overnight Booking");
      }
    };

    fetchBooking();
  }, [bookingRef]);

  return (
    <div>
      <Layout
        setShowNav={setShowNav}
        showNav={showNav}
        component={
          <BookingStatus
            booking={booking}
            setShowNav={setShowNav}
            showNav={showNav}
            id={bookingRef}
          />
        }
      />
    </div>
  );
};

export default Main;
