// src/components/WhatsAppChatButton.jsx
import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
const WhatsAppChatButton = () => {
  return (
    <div className="fixed z-99 top-5 right-4 animate-bounce">
      <a
        href="https://wa.me/+2347044544455" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-2 rounded-full shadow-lg"
      >
        <IoLogoWhatsapp size={24} className="text-white inline-block mr-2" />
        Chat with us
      </a>
    </div>
  );
};

export default WhatsAppChatButton;
