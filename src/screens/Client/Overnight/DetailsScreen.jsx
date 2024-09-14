import React from "react";
import Header from "../../../components/Header";
import Details from "../../../layouts/Client/OvernightBooking/Details";
import WhatsAppChatButton from "../../../components/WhatsappSupport";
const DetailsScreen = () => {
  return (
    <div>
      <Header />
      <WhatsAppChatButton />
      <Details />
    </div>
  );
};

export default DetailsScreen;
