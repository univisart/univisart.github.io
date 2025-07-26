import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Award, Users, Zap, Heart } from "lucide-react";
import { mockData } from "./mock";

const AboutSection = () => {
  const stats = [
    { icon: Award, label: "Years Experience", value: "5+" },
    { icon: Users, label: "Happy Clients", value: "200+" },
    { icon: Zap, label: "Projects Completed", value: "500+" },
    { icon: Heart, label: "Stories Told", value: "1000+" }
  ];

  return (
    <section className="py-24 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image & Stats */}
          <div className="space-y-8">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-8">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face"
                  alt="Suryansh Yadav"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl p-4">
                <div className="text-slate-900 font-bold text-center">
                  <div className="text-2xl">🎬</div>
                  <div className="text-xs">Storyteller</div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
                  >
                    <Icon className="h-6 w-6 text-orange-400 mb-2" />
                    <div className="text-2xl font-bold text-cream-100 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-cream-300">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-cream-100 mb-6">
                Meet{" "}
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  {mockData.about.name}
                </span>
              </h2>
              <p className="text-lg text-cream-300 leading-relaxed mb-8">
                {mockData.about.bio}
              </p>
            </div>

            {/* Expertise Tags */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-400">
                Core Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {mockData.about.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-full text-cream-200 text-sm font-medium hover:from-orange-500/30 hover:to-yellow-500/30 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-slate-900 font-semibold px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 group"
              >
                <a href="/contact">
                  Let's Work Together
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;