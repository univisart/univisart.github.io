import React, { useState, useEffect } from "react";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { mockData } from "./mock";

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    // Simulate video loading
    const timer = setTimeout(() => setIsVideoLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('mini-portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {isVideoLoaded ? (
          <div className="relative w-full h-full bg-slate-800">
            {/* Video placeholder with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-orange-900/40" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-30" />
            
            {/* Animated particles */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-60" />
              <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-orange-500 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400" />
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cream-100 to-cream-200 bg-clip-text text-transparent block animate-fade-in">
              {mockData.hero.headline}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-cream-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            {mockData.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-delay-2">
            <Button
              onClick={scrollToPortfolio}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-slate-900 font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {mockData.hero.ctas.primary}
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-slate-900 px-8 py-4 text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-slate-900/30 group"
            >
              <a href="/contact">
                {mockData.hero.ctas.secondary}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;