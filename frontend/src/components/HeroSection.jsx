import React, { useState, useEffect } from "react";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { mockData } from "./mock";

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {isVideoLoaded ? (
          <div className="relative w-full h-full bg-slate-800">
            {/* Enhanced cinematic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-orange-900/30" />
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-50" 
              style={{
                backgroundImage: `url('${mockData.hero.backgroundImage}')`
              }}
            />
            
            {/* Enhanced floating particles */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-70" />
              <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse opacity-60" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-40" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Enhanced cinematic film grain effect */}
            <div className="absolute inset-0 bg-black opacity-3 mix-blend-multiply" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")'
            }} />
            
            {/* Cinematic vignette effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-900/20" />
          </div>
        ) : (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400" />
          </div>
        )}
      </div>

      {/* Content Overlay - More Compact */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Sparkle Icon */}
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full border border-orange-500/30">
              <Sparkles className="h-8 w-8 text-orange-400" />
            </div>
          </div>

          {/* Main Headline - More Compact */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-cream-100 to-cream-200 bg-clip-text text-transparent block animate-fade-in">
              {mockData.hero.headline}
            </span>
          </h1>

          {/* Subtitle - More Concise */}
          <p className="text-lg md:text-xl text-cream-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            Cinematic excellence meets creative storytelling. Transform your moments into visual masterpieces.
          </p>

          {/* CTA Buttons - More Compact */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
            <Button
              onClick={scrollToPortfolio}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-slate-900 font-semibold px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {mockData.hero.ctas.primary}
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-slate-900 px-6 py-3 transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-slate-900/30 group"
            >
              <a href="/contact">
                {mockData.hero.ctas.secondary}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center bg-orange-400/10 backdrop-blur-sm">
          <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;