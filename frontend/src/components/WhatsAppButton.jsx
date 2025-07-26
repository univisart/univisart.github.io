import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { mockData } from "./mock";

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const { number, message } = mockData.contact.whatsapp;
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full h-14 w-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
      </Button>
      
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-16 right-0 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
          💬 Chat Instantly
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-900" />
        </div>
      )}

      {/* Pulse Animation */}
      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
    </div>
  );
};

export default WhatsAppButton;