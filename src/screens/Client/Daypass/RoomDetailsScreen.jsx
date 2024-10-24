import React from "react";
import DayPassHeader from "../../../components/DayPassHeader";
import RoomDetails from "../../../layouts/Client/DaypassBooking/RoomDetails";
import WhatsAppChatButton from "../../../components/WhatsappSupport";
const RoomDetailsScreen = () => {
  return (
    <div>
      <DayPassHeader />
      <WhatsAppChatButton />
      <RoomDetails />
    </div>
  );
};

export default RoomDetailsScreen;
