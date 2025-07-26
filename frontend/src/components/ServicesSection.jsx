import React from "react";
import { Film, Camera, Video, Smartphone, ArrowRight, Check, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { mockData } from "./mock";

const ServicesSection = () => {
  const iconMap = {
    Film: Film,
    Camera: Camera,
    Video: Video,
    Smartphone: Smartphone
  };

  return (
    <section className="py-16 bg-slate-900">
      <div className="container mx-auto px-6">
        {/* Section Header - More Compact */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full border border-orange-500/30">
              <Zap className="h-6 w-6 text-orange-400" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-cream-100 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-lg text-cream-300 max-w-2xl mx-auto leading-relaxed">
            From cinematic storytelling to social media content, we deliver visual excellence that drives engagement.
          </p>
        </div>

        {/* Services Grid - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockData.services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Card
                key={service.id}
                className="bg-slate-800/50 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105 group h-full"
              >
                <CardHeader className="text-center pb-3">
                  <div className="mx-auto mb-3 p-3 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-xl w-fit group-hover:from-orange-500/30 group-hover:to-yellow-500/30 transition-all duration-300">
                    <Icon className="h-6 w-6 text-orange-400" />
                  </div>
                  <CardTitle className="text-lg text-cream-100 group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-cream-300 text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs text-cream-300">
                        <Check className="h-3 w-3 text-orange-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full border-orange-400/50 text-orange-400 hover:bg-orange-400 hover:text-slate-900 transition-all duration-300 group/btn"
                  >
                    <a href="/contact">
                      Get Quote
                      <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA - More Compact */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-cream-100 mb-3">
              Ready to bring your vision to life?
            </h3>
            <p className="text-cream-300 mb-4 text-sm">
              Let's discuss your project and create something extraordinary together.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-slate-900 font-semibold px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 group"
            >
              <a href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;