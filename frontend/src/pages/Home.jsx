import React from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import MiniPortfolio from "../components/MiniPortfolio";
import WhatsAppButton from "../components/WhatsAppButton";

const Home = () => {
  return (
    <div className="relative">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <MiniPortfolio />
      <WhatsAppButton />
    </div>
  );
};

export default Home;