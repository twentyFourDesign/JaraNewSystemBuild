import React from "react";
import Guest from "../../../layouts/Client/OvernightBooking/Guest";
import Header from "../../../components/Header";
import WhatsAppChatButton from "../../../components/WhatsappSupport";
const GuestScreen = () => {
  return (
    <div>
      <Header />
      <WhatsAppChatButton />
      <Guest />
    </div>
  );
};

export default GuestScreen;
