import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Award, Users, Zap, Heart, Star } from "lucide-react";
import { mockData } from "./mock";

const AboutSection = () => {
  const stats = [
    { icon: Award, label: "Years Experience", value: "5+" },
    { icon: Users, label: "Happy Clients", value: "200+" },
    { icon: Zap, label: "Projects Completed", value: "500+" },
    { icon: Heart, label: "Stories Told", value: "1000+" }
  ];

  return (
    <section className="py-16 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image & Stats */}
          <div className="space-y-6">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-6">
                <img
                  src={mockData.about.photo}
                  alt="Suryansh Yadav"
                  className="w-full h-80 object-cover rounded-xl"
                />
                {/* Creative overlay */}
                <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl p-3">
                  <div className="text-slate-900 font-bold text-center">
                    <div className="text-xl">🎬</div>
                    <div className="text-xs">Director</div>
                  </div>
                </div>
              </div>
              
              {/* Name below photo */}
              <div className="text-center mt-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Suryansh Yadav
                </h3>
                <p className="text-cream-300 text-sm">Founder & Creative Director</p>
              </div>
            </div>

            {/* Compact Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-3 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 text-center"
                  >
                    <Icon className="h-5 w-5 text-orange-400 mb-1 mx-auto" />
                    <div className="text-lg font-bold text-cream-100">{stat.value}</div>
                    <div className="text-xs text-cream-300">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Content - More Compact */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-cream-100 mb-4">
                Meet{" "}
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  {mockData.about.name}
                </span>
              </h2>
              <p className="text-lg text-cream-300 leading-relaxed mb-6">
                {mockData.about.bio}
              </p>
            </div>

            {/* Expertise Tags - More Compact */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-orange-400">
                Core Expertise
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {mockData.about.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-lg text-cream-200 text-sm font-medium hover:from-orange-500/30 hover:to-yellow-500/30 transition-all duration-300 text-center"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-slate-900 font-semibold px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 group"
              >
                <a href="/contact">
                  Let's Work Together
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Venkatesh Naikar Section - After Meet Suryansh Section */}
        <div className="mt-16 pt-12 border-t border-orange-500/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-cream-100 mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Team
              </span>
            </h3>
            <p className="text-cream-300 max-w-2xl mx-auto">
              Behind every great project is a dedicated team committed to excellence
            </p>
          </div>

          {/* Team Member Card */}
          <div className="max-w-md mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-orange-400" />
                </div>
                <h4 className="text-xl font-bold text-cream-100 mb-2">
                  {mockData.about.team.operationHead}
                </h4>
                <p className="text-orange-400 font-semibold mb-3">
                  {mockData.about.team.operationHeadTitle}
                </p>
                <p className="text-cream-300 text-sm leading-relaxed">
                  Ensuring seamless operations and exceptional project delivery with attention to every detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;