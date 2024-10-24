import React from "react";
import Header from "../../../components/Header";
import Summary from "../../../layouts/Client/OvernightBooking/Summary";
import WhatsAppChatButton from "../../../components/WhatsappSupport";
const SummaryScreen = () => {
  return (
    <div>
      <Header />
      <WhatsAppChatButton />
      <Summary />
    </div>
  );
};

export default SummaryScreen;
