// src/components/WhatsAppChatButton.jsx
import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
const WhatsAppChatButton = () => {
  return (
    <div className="fixed z-11 bottom-5 right-4 animate-bounce">
      <a
        href="https://wa.me/2349025243360?text=Hi%20Jara%20Beach%20Resort!%20I%20would%20like%20to" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-2 rounded-full shadow-lg"
      >
        <IoLogoWhatsapp size={24} className="text-white inline-block mr-2" />
        Need Help?
      </a>
    </div>
  );
};

export default WhatsAppChatButton;
