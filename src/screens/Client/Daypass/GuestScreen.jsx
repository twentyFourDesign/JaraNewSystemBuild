import React from "react";
import DayPassHeader from "../../../components/DayPassHeader";
import Guest from "../../../layouts/Client/DaypassBooking/Guest";
import WhatsAppChatButton from "../../../components/WhatsappSupport";
const GuestScreen = () => {
  return (
    <div>
      <DayPassHeader />
      <WhatsAppChatButton />
      <Guest />
    </div>
  );
};

export default GuestScreen;
