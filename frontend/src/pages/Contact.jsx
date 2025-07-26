import React, { useState } from "react";
import { Send, Phone, Mail, Instagram, Linkedin, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useToast } from "../hooks/use-toast";
import WhatsAppButton from "../components/WhatsAppButton";
import { mockData } from "../components/mock";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      detail: mockData.contact.info.phone,
      action: `tel:${mockData.contact.info.phone}`,
      color: "text-green-400"
    },
    {
      icon: Mail,
      title: "Email",
      detail: mockData.contact.info.email,
      action: `mailto:${mockData.contact.info.email}`,
      color: "text-blue-400"
    },
    {
      icon: Instagram,
      title: "Instagram",
      detail: mockData.contact.info.instagram,
      action: "https://instagram.com/suryansh_yadav27",
      color: "text-pink-400"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      detail: mockData.contact.info.linkedin,
      action: "https://linkedin.com/in/suryansh-yadav",
      color: "text-blue-500"
    }
  ];

  const projectTypes = [
    "Cinematic Reels Production",
    "Event Highlight Videos",
    "Talking-Head Edits",
    "Short-Form Social Content",
    "Corporate Videos",
    "Wedding Films",
    "Music Videos",
    "Other"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Make API call to backend
      const response = await axios.post(`${API}/contact`, formData);

      if (response.data.success) {
        toast({
          title: "Message sent successfully! 🎬",
          description: response.data.message,
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: ""
        });
      } else {
        throw new Error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      
      let errorMessage = "Please try again or contact us directly via phone/email.";
      
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Oops! Something went wrong",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-cream-100 mb-6">
            Let's{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h1>
          <p className="text-xl text-cream-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your vision into visual storytelling magic? 
            Let's discuss your project and create something extraordinary together.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-cream-100 mb-4">
                Start Your Project
              </h2>
              <p className="text-cream-300">
                Fill out the form below and we'll get back to you within 24 hours to discuss your vision.
              </p>
            </div>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-orange-500/20">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-cream-200">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="bg-slate-700/50 border-orange-500/30 text-cream-100 focus:border-orange-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-cream-200">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="bg-slate-700/50 border-orange-500/30 text-cream-100 focus:border-orange-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Project Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-cream-200">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-slate-700/50 border-orange-500/30 text-cream-100 focus:border-orange-400"
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-cream-200">Project Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("projectType", value)} required>
                        <SelectTrigger className="bg-slate-700/50 border-orange-500/30 text-cream-100 focus:border-orange-400">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-orange-500/30">
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type} className="text-cream-100 focus:bg-orange-500/20">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-cream-200">Project Details *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      rows={6}
                      className="bg-slate-700/50 border-orange-500/30 text-cream-100 focus:border-orange-400 resize-none"
                      placeholder="Tell us about your project, vision, timeline, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-slate-900 font-semibold py-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900 mr-2" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-cream-100 mb-4">
                Get in Touch
              </h2>
              <p className="text-cream-300">
                Prefer to reach out directly? We're available through multiple channels and always excited to discuss new projects.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-yellow-500/20 group-hover:from-orange-500/30 group-hover:to-yellow-500/30 transition-all duration-300`}>
                          <Icon className={`h-6 w-6 ${method.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-cream-100 mb-1">
                            {method.title}
                          </h3>
                          <a
                            href={method.action}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cream-300 hover:text-orange-400 transition-colors text-sm"
                          >
                            {method.detail}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Business Hours */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-cream-100">
                  <Clock className="mr-2 h-5 w-5 text-orange-400" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-cream-300">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between text-cream-300">
                    <span>Saturday</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between text-cream-300">
                    <span>Sunday</span>
                    <span>By Appointment</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-orange-500/10 rounded-lg">
                  <p className="text-xs text-orange-400">
                    ⚡ For urgent projects, we're available 24/7 via WhatsApp
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-cream-100">
                  <MapPin className="mr-2 h-5 w-5 text-orange-400" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cream-300 text-sm mb-4">
                  Based in India, serving clients worldwide
                </p>
                <p className="text-xs text-cream-400">
                  We work remotely and can coordinate shoots across various locations as needed for your project.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default Contact;

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-cream-100 mb-6">
            Let's{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h1>
          <p className="text-xl text-cream-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your vision into visual storytelling magic? 
            Let's discuss your project and create something extraordinary together.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-cream-100 mb-4">
                Start Your Project
              </h2>
              <p className="text-cream-300">
                Fill out the form below and we'll get back to you within 24 hours to discuss your vision.
              </p>
            </div>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-orange-500/20">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-cream-200">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="bg-slate-700/50 border-orange-500/30 text-cream-100 focus:border-orange-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-cream-200">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="bg-slate-700/50 border-orange-500/30 text-cream-100 focus:border-orange-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Project Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-cream-200">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-slate-700/50 border-orange-500/30 text-cream-100 focus:border-orange-400"
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-cream-200">Project Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("projectType", value)} required>
                        <SelectTrigger className="bg-slate-700/50 border-orange-500/30 text-cream-100 focus:border-orange-400">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-orange-500/30">
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type} className="text-cream-100 focus:bg-orange-500/20">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-cream-200">Project Details *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      rows={6}
                      className="bg-slate-700/50 border-orange-500/30 text-cream-100 focus:border-orange-400 resize-none"
                      placeholder="Tell us about your project, vision, timeline, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-slate-900 font-semibold py-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900 mr-2" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-cream-100 mb-4">
                Get in Touch
              </h2>
              <p className="text-cream-300">
                Prefer to reach out directly? We're available through multiple channels and always excited to discuss new projects.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-yellow-500/20 group-hover:from-orange-500/30 group-hover:to-yellow-500/30 transition-all duration-300`}>
                          <Icon className={`h-6 w-6 ${method.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-cream-100 mb-1">
                            {method.title}
                          </h3>
                          <a
                            href={method.action}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cream-300 hover:text-orange-400 transition-colors text-sm"
                          >
                            {method.detail}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Business Hours */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-cream-100">
                  <Clock className="mr-2 h-5 w-5 text-orange-400" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-cream-300">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between text-cream-300">
                    <span>Saturday</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between text-cream-300">
                    <span>Sunday</span>
                    <span>By Appointment</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-orange-500/10 rounded-lg">
                  <p className="text-xs text-orange-400">
                    ⚡ For urgent projects, we're available 24/7 via WhatsApp
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-cream-100">
                  <MapPin className="mr-2 h-5 w-5 text-orange-400" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cream-300 text-sm mb-4">
                  Based in India, serving clients worldwide
                </p>
                <p className="text-xs text-cream-400">
                  We work remotely and can coordinate shoots across various locations as needed for your project.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default Contact;