import Details from "../../../layouts/Client/DaypassBooking/Details";
import DayPassHeader from "../../../components/DayPassHeader";
import React from "react";
import WhatsAppChatButton from "../../../components/WhatsappSupport";
const DetailsScreem = () => {
  return (
    <>
      <DayPassHeader />
      <WhatsAppChatButton />
      <Details />
    </>
  );
};

export default DetailsScreem;
