import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/suryansh_yadav27",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/suryansh-yadav",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:sy958920@gmail.com",
      label: "Email",
    },
    {
      icon: Phone,
      href: "tel:+919406586610",
      label: "Phone",
    },
  ];

  return (
    <footer className="bg-slate-800 border-t border-orange-500/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://customer-assets.emergentagent.com/job_bc3ae199-c03b-4cdc-ba3b-044e5ff5aff9/artifacts/yhzt9eo0_uniqueart-logo.png"
                alt="Unique Art Vision"
                className="h-10 w-auto"
              />
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  UNIQUE ART VISION
                </h3>
                <p className="text-xs text-cream-300">Studios</p>
              </div>
            </div>
            <p className="text-cream-300 text-sm max-w-md">
              Crafting visual stories that speak. We specialize in cinematic
              reels, event highlights, talking-head edits, and short-form social
              content that captivates and converts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-orange-400 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-cream-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="text-cream-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-cream-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-orange-400 font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-cream-300">
                <span className="text-orange-400">Email:</span>{" "}
                sy958920@gmail.com
              </li>
              <li className="text-cream-300">
                <span className="text-orange-400">Phone:</span> +91 9406586610
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-orange-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-300 hover:text-orange-400 transition-all duration-300 hover:scale-110"
                  aria-label={link.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>

          <div className="text-cream-400 text-sm">
            © {currentYear} Unique Art Vision Studios. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;