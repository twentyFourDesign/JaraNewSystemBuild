import React from "react";
import Header from "../../../components/Header";
import ManageBooking from "../../../layouts/Client/OvernightBooking/ManageBooking";
import WhatsAppChatButton from "../../../components/WhatsappSupport";
const ManageBookingScreen = () => {
  return (
    <div>
      <Header />
      <WhatsAppChatButton />
      <ManageBooking />
    </div>
  );
};

export default ManageBookingScreen;
