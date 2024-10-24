import React from "react";
import ConfirmationHeader from "../../../components/ConfirmationHeader";
import Confirmation from "../../../layouts/Client/OvernightBooking/Confirmation";
import WhatsAppChatButton from "../../../components/WhatsappSupport";
const ConfirmationScreen = () => {
  return (
    <div>
      <ConfirmationHeader />
      <WhatsAppChatButton />
      <Confirmation />
    </div>
  );
};

export default ConfirmationScreen;
