import React from "react";
import Header from "../../../components/DayPassHeader";
import Confirmation from "../../../layouts/Client/DaypassBooking/Confirmation";
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
