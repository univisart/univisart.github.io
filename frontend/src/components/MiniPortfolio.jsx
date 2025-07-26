import React, { useState } from "react";
import { Play, ExternalLink, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { mockData } from "./mock";

const MiniPortfolio = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <section id="mini-portfolio" className="py-24 bg-slate-800/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cream-100 mb-6">
            Recent{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="text-xl text-cream-300 max-w-3xl mx-auto leading-relaxed">
            A glimpse into our latest visual storytelling projects. Each piece
            crafted with passion, precision, and cinematic excellence.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockData.portfolioPreview.map((item, index) => (
            <Card
              key={item.id}
              className="bg-slate-900/50 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 overflow-hidden group"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    size="lg"
                    className="bg-orange-500/90 hover:bg-orange-600 text-white rounded-full h-16 w-16 p-0 backdrop-blur-sm"
                    onClick={() => window.open(item.videoUrl, '_blank')}
                  >
                    <Play className="h-8 w-8 ml-1" fill="currentColor" />
                  </Button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-orange-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                {/* External Link */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                    onClick={() => window.open(item.videoUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-cream-100 mb-2 group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-cream-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-slate-900 px-8 py-4 text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-slate-900/30 group"
          >
            <a href="/portfolio">
              View Full Portfolio
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MiniPortfolio;