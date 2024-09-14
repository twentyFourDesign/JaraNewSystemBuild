import React from "react";
import DayPassHeader from "../../../components/DayPassHeader";
import Summary from "../../../layouts/Client/DaypassBooking/Summary";
import WhatsAppChatButton from "../../../components/WhatsappSupport";
const SummaryScreen = () => {
  return (
    <div>
      <DayPassHeader />
      <WhatsAppChatButton />
      <Summary />
    </div>
  );
};

export default SummaryScreen;
