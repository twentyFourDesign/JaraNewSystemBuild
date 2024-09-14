import React from "react";
import Header from "../../../components/Header";
import RoomDetails from "../../../layouts/Client/OvernightBooking/RoomDetails";
import WhatsAppChatButton from "../../../components/WhatsappSupport";
const RoomDetailsScreen = () => {
  return (
    <div>
      <Header />
      <WhatsAppChatButton />
      <RoomDetails />
    </div>
  );
};

export default RoomDetailsScreen;
