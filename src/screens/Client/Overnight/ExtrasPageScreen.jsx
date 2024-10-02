import React from "react";
import ExtrasPage from "../../../layouts/Client/OvernightBooking/ExtrasPage";
import Header from "../../../components/Header";
import WhatsAppChatButton from "../../../components/WhatsappSupport";
const ExtrasPageScreen = () => {
  return (
    <div>
      <Header />
      <WhatsAppChatButton />
      <ExtrasPage />
    </div>
  );
};

export default ExtrasPageScreen;
