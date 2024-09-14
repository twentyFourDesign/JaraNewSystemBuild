import React from "react";
import Header from "../../../components/Header";
import Confirmation from "../../../layouts/Client/OvernightBooking/Confirmation";
import WhatsAppChatButton from "../../../components/WhatsappSupport";
const ConfirmationScreen = () => {
  return (
    <div>
      <Header />
      <WhatsAppChatButton />
      <Confirmation />
    </div>
  );
};

export default ConfirmationScreen;
