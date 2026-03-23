"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  AlertTriangle,
  Send,
  CheckCircle,
  X,
} from "lucide-react";
import PhoneField from "@/components/phone-field";
import { isValidPhoneNumber } from "react-phone-number-input";

export default function ContactPage() {
  const [requestType, setRequestType] = useState<"inquiry" | "quote">(
    "inquiry"
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
    preferredContact: "email",
    // Quote-specific fields
    propertyType: "",
    propertySize: "",
    urgency: "",
    additionalServices: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mapLoading, setMapLoading] = useState(true);

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleRequestTypeChange = (type: "inquiry" | "quote") => {
    setRequestType(type);
    // Clear quote-specific errors when switching to inquiry
    if (type === "inquiry") {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.propertyType;
        delete newErrors.propertySize;
        delete newErrors.urgency;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    // Quote-specific validation
    if (requestType === "quote") {
      if (!formData.propertyType)
        newErrors.propertyType = "Property type is required for quotes";
      if (!formData.propertySize)
        newErrors.propertySize = "Property size is required for quotes";
      if (!formData.urgency)
        newErrors.urgency = "Timeline is required for quotes";
      if (!formData.budget)
        newErrors.budget = "Budget range is required for quotes";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.ok) {
        setShowSuccessModal(true);
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
          preferredContact: "email",
          propertyType: "",
          propertySize: "",
          urgency: "",
          additionalServices: [],
        });
      } else {
        alert(`Error: ${result.error || "Failed to send message"}`);
      }
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-black mb-6 uppercase tracking-tighter leading-none">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
              Ready to upgrade your electrical systems? Get in touch with our
              experts for a free consultation and customized quote.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-black mb-6 uppercase tracking-tighter">
                  {requestType === "quote"
                    ? "Get Your Quote"
                    : "Send a Message"}
                </h2>
                <p className="text-gray-500 mb-8 font-medium">
                  {requestType === "quote"
                    ? "Fill out the form below and our team will get back to you within 24 hours with a detailed quote."
                    : "Have a question or need assistance? Fill out the form below and our team will get back to you within 24 hours."}
                </p>

                {/* Request Type Toggle */}
                <div className="mb-10">
                  <div className="flex items-center space-x-1 bg-gray-50 rounded-2xl p-1.5 w-fit border border-gray-100">
                    <button
                      type="button"
                      onClick={() => handleRequestTypeChange("inquiry")}
                      className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                        requestType === "inquiry"
                          ? "bg-black text-white shadow-xl shadow-black/20"
                          : "text-gray-400 hover:text-black"
                      }`}
                    >
                      General Inquiry
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRequestTypeChange("quote")}
                      className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                        requestType === "quote"
                          ? "bg-black text-white shadow-xl shadow-black/20"
                          : "text-gray-400 hover:text-black"
                      }`}
                    >
                      Quote Request
                    </button>
                  </div>
                </div>
                <Card className="bg-gray-50 border-transparent rounded-[2rem] overflow-hidden">
                  <CardContent className="p-8 sm:p-12">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="firstName"
                            className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
                          >
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            className={`h-14 sm:h-16 rounded-2xl bg-white border-none shadow-sm placeholder:text-gray-300 focus:ring-black/5 ${
                              errors.firstName ? "ring-2 ring-red-500" : ""
                            }`}
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            required
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1 ml-1">
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="lastName"
                            className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
                          >
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Doe"
                            className={`h-14 sm:h-16 rounded-2xl bg-white border-none shadow-sm placeholder:text-gray-300 focus:ring-black/5 ${
                              errors.lastName ? "ring-2 ring-red-500" : ""
                            }`}
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            required
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1 ml-1">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
                        >
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className={`h-14 sm:h-16 rounded-2xl bg-white border-none shadow-sm placeholder:text-gray-300 focus:ring-black/5 ${
                            errors.email ? "ring-2 ring-red-500" : ""
                          }`}
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
                        />
                        {errors.email && (
                          <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1 ml-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
                        >
                          Phone Number *
                        </Label>
                        <div className="mt-1">
                          <PhoneField
                            id="phone"
                            value={formData.phone || undefined}
                            defaultCountry="CM"
                            onChange={(val) => {
                              const next = val || "";
                              handleInputChange("phone", next);
                              if (
                                next &&
                                typeof next === "string" &&
                                !isValidPhoneNumber(next)
                              ) {
                                setErrors((prev) => ({
                                  ...prev,
                                  phone: "Invalid phone number",
                                }));
                              } else {
                                setErrors((prev) => ({ ...prev, phone: "" }));
                              }
                            }}
                            placeholder="e.g. +237 6XX XXX XXX"
                            error={!!errors.phone}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1 ml-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="service"
                          className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
                        >
                          Service Interest *
                        </Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            handleInputChange("service", value)
                          }
                        >
                          <SelectTrigger
                            className={`h-14 sm:h-16 rounded-2xl bg-white border-none shadow-sm focus:ring-black/5 cursor-pointer ${
                              errors.service ? "ring-2 ring-red-500" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-none shadow-2xl p-2 font-bold uppercase tracking-widest text-[10px]">
                            <SelectItem value="wireless-controllers" className="rounded-xl">WiCon Wireless Controllers</SelectItem>
                            <SelectItem value="software" className="rounded-xl">Software Solutions</SelectItem>
                            <SelectItem value="electrical-wiring" className="rounded-xl">Electrical Wiring</SelectItem>
                            <SelectItem value="cctv-security" className="rounded-xl">CCTV Security Systems</SelectItem>
                            <SelectItem value="maintenance" className="rounded-xl">Maintenance & Support</SelectItem>
                            <SelectItem value="consultation" className="rounded-xl">Consultation & Design</SelectItem>
                            <SelectItem value="emergency" className="rounded-xl">Emergency Services</SelectItem>
                            <SelectItem value="other" className="rounded-xl">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.service && (
                          <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1 ml-1">
                            {errors.service}
                          </p>
                        )}
                      </div>

                      {/* Quote-Specific Fields */}
                      {requestType === "quote" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label
                                htmlFor="propertyType"
                                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
                              >
                                Property Type *
                              </Label>
                              <Select
                                value={formData.propertyType}
                                onValueChange={(value) =>
                                  handleInputChange("propertyType", value)
                                }
                              >
                                <SelectTrigger
                                  className={`h-14 sm:h-16 rounded-2xl bg-white border-none shadow-sm focus:ring-black/5 cursor-pointer ${
                                    errors.propertyType ? "ring-2 ring-red-500" : ""
                                  }`}
                                >
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl p-2 font-bold uppercase tracking-widest text-[10px]">
                                  <SelectItem value="residential-home" className="rounded-xl">Residential Home</SelectItem>
                                  <SelectItem value="residential-apartment" className="rounded-xl">Apartment/Condo</SelectItem>
                                  <SelectItem value="commercial-office" className="rounded-xl">Commercial Office</SelectItem>
                                  <SelectItem value="commercial-retail" className="rounded-xl">Retail Store</SelectItem>
                                  <SelectItem value="commercial-warehouse" className="rounded-xl">Warehouse/Industrial</SelectItem>
                                  <SelectItem value="commercial-restaurant" className="rounded-xl">Restaurant/Hotel</SelectItem>
                                  <SelectItem value="other" className="rounded-xl">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="propertySize"
                                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
                              >
                                Property Size *
                              </Label>
                              <Select
                                value={formData.propertySize}
                                onValueChange={(value) =>
                                  handleInputChange("propertySize", value)
                                }
                              >
                                <SelectTrigger
                                  className={`h-14 sm:h-16 rounded-2xl bg-white border-none shadow-sm focus:ring-black/5 cursor-pointer ${
                                    errors.propertySize ? "ring-2 ring-red-500" : ""
                                  }`}
                                >
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl p-2 font-bold uppercase tracking-widest text-[10px]">
                                  <SelectItem value="small" className="rounded-xl">Small (&lt; 1,000 sq ft)</SelectItem>
                                  <SelectItem value="medium" className="rounded-xl">Medium (1,000 - 3,000 sq ft)</SelectItem>
                                  <SelectItem value="large" className="rounded-xl">Large (3,000 - 10,000 sq ft)</SelectItem>
                                  <SelectItem value="xlarge" className="rounded-xl">Very Large (&gt; 10,000 sq ft)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label
                                htmlFor="budget"
                                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
                              >
                                Budget Range *
                              </Label>
                              <Select
                                value={formData.budget}
                                onValueChange={(value) =>
                                  handleInputChange("budget", value)
                                }
                              >
                                <SelectTrigger
                                  className={`h-14 sm:h-16 rounded-2xl bg-white border-none shadow-sm focus:ring-black/5 cursor-pointer ${
                                    errors.budget ? "ring-2 ring-red-500" : ""
                                  }`}
                                >
                                  <SelectValue placeholder="Select budget" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl p-2 font-bold uppercase tracking-widest text-[10px]">
                                  <SelectItem value="under-500k" className="rounded-xl">Under 500k XAF</SelectItem>
                                  <SelectItem value="500k-1m" className="rounded-xl">500k - 1m XAF</SelectItem>
                                  <SelectItem value="1m-2m" className="rounded-xl">1m - 2m XAF</SelectItem>
                                  <SelectItem value="2m-5m" className="rounded-xl">2m - 5m XAF</SelectItem>
                                  <SelectItem value="over-5m" className="rounded-xl">Over 5m XAF</SelectItem>
                                  <SelectItem value="flexible" className="rounded-xl">Flexible</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="urgency"
                                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
                              >
                                Project Timeline *
                              </Label>
                              <Select
                                value={formData.urgency}
                                onValueChange={(value) =>
                                  handleInputChange("urgency", value)
                                }
                              >
                                <SelectTrigger
                                  className={`h-14 sm:h-16 rounded-2xl bg-white border-none shadow-sm focus:ring-black/5 cursor-pointer ${
                                    errors.urgency ? "ring-2 ring-red-500" : ""
                                  }`}
                                >
                                  <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl p-2 font-bold uppercase tracking-widest text-[10px]">
                                  <SelectItem value="urgent" className="rounded-xl">Urgent (Within 1 week)</SelectItem>
                                  <SelectItem value="soon" className="rounded-xl">Soon (Within 1 month)</SelectItem>
                                  <SelectItem value="planning" className="rounded-xl">Planning (1-3 months)</SelectItem>
                                  <SelectItem value="future" className="rounded-xl">Future (3+ months)</SelectItem>
                                  <SelectItem value="flexible" className="rounded-xl">Flexible</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
                        >
                          Project Details *
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your requirements..."
                          className={`min-h-[160px] rounded-2xl bg-white border-none shadow-sm placeholder:text-gray-300 focus:ring-black/5 resize-none ${
                            errors.message ? "ring-2 ring-red-500" : ""
                          }`}
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-16 rounded-2xl bg-black text-white hover:bg-gray-800 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-black/20 transition-all active:scale-[0.98] cursor-pointer"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <Send className="mr-3 w-4 h-4" />
                            Send Request
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-12">
                <h2 className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tighter">
                  Quick Info
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Office Address",
                      icon: <MapPin className="w-6 h-6 text-white" />,
                      content: (
                        <p className="text-gray-500 font-medium">
                          WiCon Systems Headquarters<br />
                          Buea, Southwest Region<br />
                          Cameroon
                        </p>
                      )
                    },
                    {
                      title: "Direct Channels",
                      icon: <Phone className="w-6 h-6 text-white" />,
                      content: (
                        <div className="text-gray-500 font-medium space-y-1">
                          <p><strong>Phone:</strong> +237 674802971</p>
                          <p><strong>Email:</strong> info@wiconltd.com</p>
                        </div>
                      )
                    },
                    {
                      title: "Business Hours",
                      icon: <Clock className="w-6 h-6 text-white" />,
                      content: (
                        <div className="text-gray-500 font-medium space-y-1">
                          <p><strong>Mon - Fri:</strong> 8:00 AM - 5:00 PM</p>
                          <p><strong>Saturday:</strong> 9:00 AM - 4:00 PM</p>
                          <p><strong>Sunday:</strong> Emergency Calls Only</p>
                        </div>
                      )
                    }
                  ].map((info, idx) => (
                    <Card key={idx} className="bg-white border-gray-50 rounded-[2rem] overflow-hidden group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                          <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform duration-500">
                            {info.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-black mb-2 uppercase tracking-tight">{info.title}</h3>
                            {info.content}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Card className="bg-green-50 border-transparent rounded-[2rem] overflow-hidden group">
                    <CardContent className="p-8 sm:p-10">
                      <div className="flex items-start gap-6">
                        <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-black text-black mb-2 uppercase tracking-tight">WhatsApp</h3>
                          <p className="text-green-800/60 text-sm font-medium mb-6">
                            Instant support for quick questions and updates.
                          </p>
                          <Button
                            className="w-full sm:w-auto h-12 px-8 rounded-xl bg-green-600 text-white hover:bg-green-700 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-green-600/20 active:scale-95 transition-all cursor-pointer"
                            onClick={() => window.open("https://wa.me/237674802971", "_blank")}
                          >
                            Chat with us
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Find Us
              </h2>
              <p className="text-xl text-gray-600">
                Located in the heart of Buea, Southwest Region
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3979.345749657581!2d9.236124000000002!3d4.1522429999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwMDknMDguMSJOIDnCsDE0JzEwLjEiRQ!5e0!3m2!1sen!2scm!4v1756391783305!5m2!1sen!2scm"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WiCon Systems Location in Buea, Southwest Region"
                className="w-full h-96"
                onLoad={() => setMapLoading(false)}
              ></iframe>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-20 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white border-red-200">
              <CardContent className="p-8">
                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-6">
                      <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-2">
                        Emergency Electrical Services
                      </h3>
                      <p className="text-gray-600">
                        24/7 emergency response for urgent electrical issues and
                        safety hazards
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-red-600 text-white hover:bg-red-700 px-8 py-3"
                      onClick={() =>
                        (window.location.href = "tel:+237674802971")
                      }
                    >
                      <Phone className="mr-2 w-5 h-5" />
                      Emergency: +237 674802971
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                We Serve Southwest Region
              </h2>
              <p className="text-xl text-gray-600">
                Professional electrical services across multiple cities
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {["Buea", "Limbe", "Tiko", "Kumba", "Mamfe", "Idenau"].map(
                (city) => (
                  <Card
                    key={city}
                    className="bg-gray-50 border-gray-200 text-center"
                  >
                    <CardContent className="p-6">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <h3 className="font-bold text-black">{city}</h3>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm text-gray-500">
                      We'll get back to you within 24 hours
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Thank you, {formData.firstName || "there"}!</strong>{" "}
                  Your message has been received and our team will review your
                  inquiry.
                </p>
                <p className="text-sm text-gray-600">
                  You should receive a confirmation email shortly. For urgent
                  matters, please call our emergency line:{" "}
                  <strong>+237 674802971</strong>
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShowSuccessModal(false);
                    window.location.href = "/services";
                  }}
                  className="flex-1 bg-black text-white hover:bg-gray-800"
                >
                  View Our Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
