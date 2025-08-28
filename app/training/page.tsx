"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  GraduationCap,
  Code,
  Cpu,
  Zap,
  Calendar,
  Clock,
  Users,
  Award,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Download,
  Loader2,
} from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function TrainingPage() {
  // Volunteer form state
  const [volunteer, setVolunteer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    expertise: "",
    years: "",
    teaching: "",
    currentRole: "",
    company: "",
    availability: "",
    motivation: "",
    agree: false,
    resume: null as File | null,
  });
  const [submittingVolunteer, setSubmittingVolunteer] = useState(false);
  const [showVolunteerErrors, setShowVolunteerErrors] = useState(false);

  const volunteerErrors = {
    firstName: showVolunteerErrors && !volunteer.firstName.trim(),
    lastName: showVolunteerErrors && !volunteer.lastName.trim(),
    email: showVolunteerErrors && !volunteer.email.trim(),
    phone: showVolunteerErrors && !volunteer.phone.trim(),
    expertise: showVolunteerErrors && !volunteer.expertise.trim(),
    years: showVolunteerErrors && !volunteer.years.trim(),
    currentRole: showVolunteerErrors && !volunteer.currentRole.trim(),
    availability: showVolunteerErrors && !volunteer.availability.trim(),
    motivation: showVolunteerErrors && !volunteer.motivation.trim(),
    agree: showVolunteerErrors && !volunteer.agree,
  };

  // Partnership interest form state
  const [partner, setPartner] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: "",
    agree: false,
  });
  const [showPartnerSuccess, setShowPartnerSuccess] = useState(false);
  const [submittingPartner, setSubmittingPartner] = useState(false);
  const [showPartnerErrors, setShowPartnerErrors] = useState(false);

  const partnerErrors = {
    name: showPartnerErrors && !partner.name.trim(),
    organization: showPartnerErrors && !partner.organization.trim(),
    email: showPartnerErrors && !partner.email.trim(),
    phone: showPartnerErrors && !partner.phone.trim(),
    partnershipType: showPartnerErrors && !partner.partnershipType.trim(),
    message: showPartnerErrors && !partner.message.trim(),
    agree: showPartnerErrors && !partner.agree,
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmittingPartner(true);
      setShowPartnerErrors(false);

      if (
        !partner.name.trim() ||
        !partner.organization.trim() ||
        !partner.email.trim() ||
        !partner.phone.trim() ||
        !partner.partnershipType.trim() ||
        !partner.message.trim() ||
        !partner.agree
      ) {
        setShowPartnerErrors(true);
        toast.error("Please complete all required fields and accept the terms.");
        return;
      }

      const res = await fetch("/api/training/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partner),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || "Submission failed");
      setShowPartnerSuccess(true);
      setPartner({
        name: "",
        organization: "",
        email: "",
        phone: "",
        partnershipType: "",
        message: "",
        agree: false,
      });
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setSubmittingPartner(false);
    }
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmittingVolunteer(true);
      setShowVolunteerErrors(false);

      // simple required validation
      if (
        !volunteer.firstName.trim() ||
        !volunteer.lastName.trim() ||
        !volunteer.email.trim() ||
        !volunteer.phone.trim() ||
        !volunteer.motivation.trim() ||
        !volunteer.agree
      ) {
        setShowVolunteerErrors(true);
        toast.error("Please fill all required fields and accept the terms.");
        return;
      }
      const fd = new FormData();
      Object.entries({
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
        email: volunteer.email,
        phone: volunteer.phone,
        expertise: volunteer.expertise,
        years: volunteer.years,
        teaching: volunteer.teaching,
        currentRole: volunteer.currentRole,
        company: volunteer.company,
        availability: volunteer.availability,
        motivation: volunteer.motivation,
        agree: String(volunteer.agree),
      }).forEach(([k, v]) => fd.append(k, String(v)));
      if (volunteer.resume) fd.append("resume", volunteer.resume);

      const res = await fetch("/api/training/volunteer", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.ok)
        throw new Error(data?.error || "Submission failed");
      toast.success(
        "Volunteer application submitted! Confirmation email sent."
      );
      setVolunteer({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        expertise: "",
        years: "",
        teaching: "",
        currentRole: "",
        company: "",
        availability: "",
        motivation: "",
        agree: false,
        resume: null,
      });
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setSubmittingVolunteer(false);
    }
  };

  // Registration form state
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    track: "",
    education: "",
    experience: "",
    motivation: "",
    employer: "",
    terms: false,
    updates: false,
  });
  const [submittingRegister, setSubmittingRegister] = useState(false);
  const [showRegisterErrors, setShowRegisterErrors] = useState(false);

  const registerErrors = {
    firstName: showRegisterErrors && !register.firstName.trim(),
    lastName: showRegisterErrors && !register.lastName.trim(),
    email: showRegisterErrors && !register.email.trim(),
    phone: showRegisterErrors && !register.phone.trim(),
    track: showRegisterErrors && !register.track.trim(),
    education: showRegisterErrors && !register.education.trim(),
    motivation: showRegisterErrors && !register.motivation.trim(),
    terms: showRegisterErrors && !register.terms,
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmittingRegister(true);
      setShowRegisterErrors(false);

      // simple required validation
      if (
        !register.firstName.trim() ||
        !register.lastName.trim() ||
        !register.email.trim() ||
        !register.phone.trim() ||
        !register.track.trim() ||
        !register.education.trim() ||
        !register.motivation.trim() ||
        !register.terms
      ) {
        setShowRegisterErrors(true);
        toast.error("Please fill all required fields and accept the terms.");
        return;
      }
      const fd = new FormData();
      Object.entries({
        firstName: register.firstName,
        lastName: register.lastName,
        email: register.email,
        phone: register.phone,
        track: register.track,
        education: register.education,
        experience: register.experience,
        motivation: register.motivation,
        employer: register.employer,
        terms: String(register.terms),
        updates: String(register.updates),
      }).forEach(([k, v]) => fd.append(k, String(v)));

      const res = await fetch("/api/training/register", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.ok)
        throw new Error(data?.error || "Submission failed");
      toast.success("Registration submitted! Confirmation email sent.");
      setRegister({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        track: "",
        education: "",
        experience: "",
        motivation: "",
        employer: "",
        terms: false,
        updates: false,
      });
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setSubmittingRegister(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-black text-white py-10 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6  ">
                {/* <GraduationCap className="w-15 h-15 mr-2" /> */}
                <img
                  src="/training-logo-removebg-preview.png"
                  className="w-25 h-15 mr-3"
                  alt="training-logo"
                />
                <h1 className="text-2xl md:text-4xl font-bold text-left md:text-center">
                  WiCon SMART HOME SOLUTION FOR DIGITAL EDUCATION
                </h1>
              </div>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Master the future of technology with our comprehensive training
                program covering software development, IoT solutions, and WiCon
                controller technology.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 inline-block mb-8">
                <div className="text-3xl font-bold mb-2">
                  October 2025 Program
                </div>
                <div className="text-gray-300">
                  Registration Opens: September 2025
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button className="bg-white text-black hover:bg-gray-300 px-10 py-5 text-2xl font-bold">
                  <a href="#register">Register Now</a>
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-gray-50 px-8 py-3 bg-transparent"
                  asChild
                >
                  <a
                    href="/downloads/Program Brochure.pdf"
                    download="Program Brochure.pdf"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download 2025 Bronchure
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-10 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">
                  Program Overview
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  WiCon SMART HOME SOLUTION FOR DIGITAL EDUCATION is an
                  intensive 4-week training program designed to equip
                  participants with cutting-edge skills in software development,
                  IoT solutions, and our proprietary WiCon controller
                  technology.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <Award className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-bold text-green-800">
                      2024 Program Success
                    </span>
                  </div>
                  <p className="text-green-700 text-sm mb-3">
                    48 graduates • 92% job placement rate • 4.9/5 average rating
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    <a href="/training/2024">View 2024 Success Stories</a>
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">
                      Hands-on practical training with real projects
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">
                      Industry-certified instructors and mentors
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">
                      Certificate of completion recognized by industry
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">
                      Job placement assistance for top performers
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-black mb-4">
                  Program Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">
                      Duration: 4 weeks intensive
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">
                      Schedule: Monday-Friday, 9AM-5PM
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">
                      Limited to 50 participants
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">
                      Location: WiCon Systems HQ, Buea
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">
                      Industry-recognized certification
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Training Tracks */}
        <section className="py-10 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Three Specialized Training Tracks
              </h2>
              <p className="text-xl text-gray-600">
                Choose your focus area or take the comprehensive program
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">
                    Software Development Track
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Master modern web and mobile app development with hands-on
                    projects.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• React & Next.js Development</li>
                    <li>• Mobile App Development</li>
                    <li>• Database Design & Management</li>
                    <li>• API Development & Integration</li>
                    <li>• Version Control with Git</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">IoT Solutions Track</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Build smart connected devices and automation systems from
                    scratch.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Sensor Integration & Programming</li>
                    <li>• Microcontroller Programming</li>
                    <li>• Wireless Communication Protocols</li>
                    <li>• Cloud Platform Integration</li>
                    <li>• Smart Home Automation</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">
                    WiCon Controller Track
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Learn to design, install, and maintain WiCon wireless
                    control systems.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• WiCon System Architecture</li>
                    <li>• Installation & Configuration</li>
                    <li>• Safety Protocols & Monitoring</li>
                    <li>• Troubleshooting & Maintenance</li>
                    <li>• Custom Controller Programming</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Partners */}
        <section className="py-20 bg-white" id="partners">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Program Partners
              </h2>
              <p className="text-xl text-gray-600">
                We proudly partner with leading organizations to deliver impact
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 w-full max-w-sm flex flex-col items-center text-center">
                <img
                  src="/minjec-logo.png"
                  alt="MINJEC - Ministry of Youth Affairs and Civic Education"
                  className="h-20 w-auto object-contain mb-4"
                />
                <div className="font-bold text-black text-sm md:text-base">
                  MINISTRY OF YOUTH AFFAIRS AND CIVIC EDUCATION
                </div>
                <div className="text-sm text-gray-600 mt-1">(MINJEC)</div>
                <p className="text-gray-600 text-sm mt-3">Official Partner</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partner With Us */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Partner With Us
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Are you an organization interested in supporting skills development and
                youth empowerment? Join us as a program partner. We welcome sponsorships,
                training support, equipment donations, internship pipelines, and more.
              </p>
            </div>
            <Card className="bg-white border-gray-200">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handlePartnerSubmit} aria-busy={submittingPartner}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="partnerName">Your Name *</Label>
                      <Input
                        id="partnerName"
                        placeholder="Enter your full name"
                        value={partner.name}
                        onChange={(e) => setPartner((p) => ({ ...p, name: e.target.value }))}
                        className={`mt-1 ${partnerErrors.name ? "border-red-500" : ""}`}
                        aria-invalid={partnerErrors.name || undefined}
                      />
                      {partnerErrors.name && (
                        <p className="text-sm text-red-600 mt-1">Name is required</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="organization">Organization *</Label>
                      <Input
                        id="organization"
                        placeholder="Company/Institution name"
                        value={partner.organization}
                        onChange={(e) => setPartner((p) => ({ ...p, organization: e.target.value }))}
                        className={`mt-1 ${partnerErrors.organization ? "border-red-500" : ""}`}
                        aria-invalid={partnerErrors.organization || undefined}
                      />
                      {partnerErrors.organization && (
                        <p className="text-sm text-red-600 mt-1">Organization is required</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="partnerEmail">Email *</Label>
                      <Input
                        id="partnerEmail"
                        type="email"
                        placeholder="your.email@example.com"
                        value={partner.email}
                        onChange={(e) => setPartner((p) => ({ ...p, email: e.target.value }))}
                        className={`mt-1 ${partnerErrors.email ? "border-red-500" : ""}`}
                        aria-invalid={partnerErrors.email || undefined}
                      />
                      {partnerErrors.email && (
                        <p className="text-sm text-red-600 mt-1">Email is required</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="partnerPhone">Phone *</Label>
                      <Input
                        id="partnerPhone"
                        placeholder="+237 6XX XXX XXX"
                        value={partner.phone}
                        onChange={(e) => setPartner((p) => ({ ...p, phone: e.target.value }))}
                        className={`mt-1 ${partnerErrors.phone ? "border-red-500" : ""}`}
                        aria-invalid={partnerErrors.phone || undefined}
                      />
                      {partnerErrors.phone && (
                        <p className="text-sm text-red-600 mt-1">Phone is required</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="partnershipType">Partnership Interest *</Label>
                    <Select
                      value={partner.partnershipType}                      
                      onValueChange={(v) => setPartner((p) => ({ ...p, partnershipType: v }))}
                    >
                      <SelectTrigger className={`mt-1 cursor-pointer ${partnerErrors.partnershipType ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select partnership type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="cursor-pointer" value="sponsorship">Sponsorship</SelectItem>
                        <SelectItem className="cursor-pointer" value="training-support">Training Support</SelectItem>
                        <SelectItem className="cursor-pointer" value="equipment-donation">Equipment Donation</SelectItem>
                        <SelectItem className="cursor-pointer" value="venue-logistics">Venue / Logistics</SelectItem>
                        <SelectItem className="cursor-pointer" value="internship-pipeline">Internship Pipeline</SelectItem>
                        <SelectItem className="cursor-pointer" value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {partnerErrors.partnershipType && (
                      <p className="text-sm text-red-600 mt-1">Please select a partnership type</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="partnerMessage">How would you like to partner with us? *</Label>
                    <Textarea
                      id="partnerMessage"
                      rows={4}
                      placeholder="Tell us about your organization and partnership goals..."
                      value={partner.message}
                      onChange={(e) => setPartner((p) => ({ ...p, message: e.target.value }))}
                      className={`mt-1 ${partnerErrors.message ? "border-red-500" : ""}`}
                      aria-invalid={partnerErrors.message || undefined}
                    />
                    {partnerErrors.message && (
                      <p className="text-sm text-red-600 mt-1">Message is required</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="partnerAgree"
                      checked={partner.agree}
                      className="cursor-pointer"
                      onCheckedChange={(c) => setPartner((p) => ({ ...p, agree: Boolean(c) }))}
                    />
                    <Label htmlFor="partnerAgree" className="text-sm">
                      I agree to be contacted about partnership opportunities *
                    </Label>
                  </div>
                  {partnerErrors.agree && (
                    <p className="text-sm text-red-600">You must accept the terms</p>
                  )}
                  <Button
                    className="w-full bg-black text-white hover:bg-gray-800 py-3"
                    type="submit"
                    disabled={submittingPartner}
                    aria-busy={submittingPartner}
                  >
                    {submittingPartner && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {submittingPartner ? "Submitting..." : "Submit Partnership Interest"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Partnership Success Modal */}
        <Dialog open={showPartnerSuccess} onOpenChange={setShowPartnerSuccess}>
          <DialogContent aria-describedby="partner-success-description">
            <DialogHeader>
              <DialogTitle>Thank you for your interest!</DialogTitle>
              <DialogDescription id="partner-success-description">
                Your partnership request has been received. We'll reach out to you shortly with next steps.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="bg-black text-white hover:bg-gray-800">Done</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* volunteer Registration */}
        <section
          id="volunteer-registration"
          className=" py-20 bg-black text-white"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join as a Volunteer
              </h2>
              <p className="text-xl text-gray-300">
                Share your expertise and help shape the next generation of tech
                professionals
              </p>
            </div>
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div className="mb-8">
                  {/* <h3 className="text-2xl font-bold text-white mb-4">We're Looking for Expert volunteers</h3> */}
                  <p className="text-gray-600 mb-6 text-center">
                    Join our team of industry professionals and help deliver
                    world-class training in software development, IoT solutions,
                    and WiCon controller technology.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <Code className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">
                        Software Development
                      </h4>
                      <p className="text-sm text-gray-600">
                        React, Next.js, Mobile Apps
                      </p>
                    </div>
                    <div className="text-center">
                      <Cpu className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">
                        IoT Solutions
                      </h4>
                      <p className="text-sm text-gray-600">
                        Hardware, Sensors, Automation
                      </p>
                    </div>
                    <div className="text-center">
                      <Zap className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">
                        WiCon Controllers
                      </h4>
                      <p className="text-sm text-gray-600">
                        Installation, Programming
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  className="space-y-6"
                  onSubmit={handleVolunteerSubmit}
                  aria-busy={submittingVolunteer}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="volunteerFirstName"
                        className="text-sm font-medium text-black"
                      >
                        First Name *
                      </Label>
                      <Input
                        id="volunteerFirstName"
                        placeholder="Enter your first name"
                        value={volunteer.firstName}
                        onChange={(e) =>
                          setVolunteer((p) => ({
                            ...p,
                            firstName: e.target.value,
                          }))
                        }
                        className={`mt-1 ${
                          volunteerErrors.firstName ? "border-red-500" : ""
                        }`}
                        aria-invalid={volunteerErrors.firstName || undefined}
                      />
                      {volunteerErrors.firstName && (
                        <p className="text-sm text-red-500 mt-1">
                          First name is required
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="volunteerLastName"
                        className="text-sm font-medium text-black"
                      >
                        Last Name *
                      </Label>
                      <Input
                        id="volunteerLastName"
                        placeholder="Enter your last name"
                        value={volunteer.lastName}
                        onChange={(e) =>
                          setVolunteer((p) => ({
                            ...p,
                            lastName: e.target.value,
                          }))
                        }
                        className={`mt-1 ${
                          volunteerErrors.lastName ? "border-red-500" : ""
                        }`}
                        aria-invalid={volunteerErrors.lastName || undefined}
                      />
                      {volunteerErrors.lastName && (
                        <p className="text-sm text-red-500 mt-1">
                          Last name is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="volunteerEmail"
                        className="text-sm font-medium text-black"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="volunteerEmail"
                        type="email"
                        placeholder="your.email@example.com"
                        value={volunteer.email}
                        onChange={(e) =>
                          setVolunteer((p) => ({ ...p, email: e.target.value }))
                        }
                        className={`mt-1 ${
                          volunteerErrors.email ? "border-red-500" : ""
                        }`}
                        aria-invalid={volunteerErrors.email || undefined}
                      />
                      {volunteerErrors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          Email is required
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="volunteerPhone"
                        className="text-sm font-medium text-black"
                      >
                        Phone Number *
                      </Label>
                      <Input
                        id="volunteerPhone"
                        type="tel"
                        placeholder="+237 6XX XXX XXX"
                        value={volunteer.phone}
                        onChange={(e) =>
                          setVolunteer((p) => ({ ...p, phone: e.target.value }))
                        }
                        className={`mt-1 ${
                          volunteerErrors.phone ? "border-red-500" : ""
                        }`}
                        aria-invalid={volunteerErrors.phone || undefined}
                      />
                      {volunteerErrors.phone && (
                        <p className="text-sm text-red-500 mt-1">
                          Phone number is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="expertise"
                      className="text-sm font-medium text-black"
                    >
                      Area of Expertise *
                    </Label>
                    <Select
                      value={volunteer.expertise}
                      onValueChange={(v) =>
                        setVolunteer((p) => ({ ...p, expertise: v }))
                      }
                    >
                      <SelectTrigger
                        className={`mt-1 ${
                          volunteerErrors.expertise ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select your primary expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">
                          Software Development
                        </SelectItem>
                        <SelectItem value="iot">
                          IoT Solutions & Hardware
                        </SelectItem>
                        <SelectItem value="wicon">
                          WiCon Controller Systems
                        </SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                        <SelectItem value="multiple">Multiple Areas</SelectItem>
                      </SelectContent>
                    </Select>
                    {volunteerErrors.expertise && (
                      <p className="text-sm text-red-500 mt-1">
                        Area of expertise is required
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="volunteerExperience"
                        className="text-sm font-medium text-black"
                      >
                        Years of Experience *
                      </Label>
                      <Select
                        value={volunteer.years}
                        onValueChange={(v) =>
                          setVolunteer((p) => ({ ...p, years: v }))
                        }
                      >
                        <SelectTrigger
                          className={`mt-1 ${
                            volunteerErrors.years ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-2">1-2 years</SelectItem>
                          <SelectItem value="2-3">2-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      {volunteerErrors.years && (
                        <p className="text-sm text-red-500 mt-1">
                          Years of experience is required
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="teachingExperience"
                        className="text-sm font-medium text-black"
                      >
                        Teaching/Training Experience
                      </Label>
                      <Select
                        value={volunteer.teaching}
                        onValueChange={(v) =>
                          setVolunteer((p) => ({ ...p, teaching: v }))
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select teaching experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">
                            No formal teaching experience
                          </SelectItem>
                          <SelectItem value="some">
                            Some training/mentoring experience
                          </SelectItem>
                          <SelectItem value="experienced">
                            Experienced volunteer/educator
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="currentRole"
                      className="text-sm font-medium text-black"
                    >
                      Current Role/Position *
                    </Label>
                    <Input
                      id="currentRole"
                      placeholder="e.g., Senior Software Engineer, IoT Consultant"
                      value={volunteer.currentRole}
                      onChange={(e) =>
                        setVolunteer((p) => ({
                          ...p,
                          currentRole: e.target.value,
                        }))
                      }
                      className={`mt-1 ${
                        volunteerErrors.currentRole ? "border-red-500" : ""
                      }`}
                      aria-invalid={volunteerErrors.currentRole || undefined}
                    />
                    {volunteerErrors.currentRole && (
                      <p className="text-sm text-red-500 mt-1">
                        Current role is required
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="company"
                      className="text-sm font-medium text-black"
                    >
                      Current Company/Organization
                    </Label>
                    <Input
                      id="company"
                      placeholder="Company or organization name"
                      value={volunteer.company}
                      onChange={(e) =>
                        setVolunteer((p) => ({ ...p, company: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="availability"
                      className="text-sm font-medium text-black"
                    >
                      Availability for October 2025 Program *
                    </Label>
                    <Select
                      value={volunteer.availability}
                      onValueChange={(v) =>
                        setVolunteer((p) => ({ ...p, availability: v }))
                      }
                    >
                      <SelectTrigger
                        className={`mt-1 ${
                          volunteerErrors.availability ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">
                          Full-time (4 weeks)
                        </SelectItem>
                        <SelectItem value="part-time">
                          Part-time (specific days/hours)
                        </SelectItem>
                        <SelectItem value="guest">
                          Guest sessions only
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {volunteerErrors.availability && (
                      <p className="text-sm text-red-500 mt-1">
                        Availability is required
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="volunteerMotivation"
                      className="text-sm font-medium text-black"
                    >
                      Why do you want to be a volunteer? *
                    </Label>
                    <Textarea
                      id="volunteerMotivation"
                      placeholder="Tell us about your passion for teaching and what you hope to contribute..."
                      value={volunteer.motivation}
                      onChange={(e) =>
                        setVolunteer((p) => ({
                          ...p,
                          motivation: e.target.value,
                        }))
                      }
                      className={`mt-1 min-h-[120px] ${
                        volunteerErrors.motivation ? "border-red-500" : ""
                      }`}
                      rows={4}
                      aria-invalid={volunteerErrors.motivation || undefined}
                    />
                    {volunteerErrors.motivation && (
                      <p className="text-sm text-red-500 mt-1">
                        Motivation is required
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="resume"
                      className="text-sm font-medium text-black"
                    >
                      Resume/CV Upload
                    </Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        setVolunteer((p) => ({
                          ...p,
                          resume:
                            e.target.files && e.target.files[0]
                              ? e.target.files[0]
                              : null,
                        }))
                      }
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Upload your resume (PDF, DOC, or DOCX format)
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="volunteerTerms"
                      checked={volunteer.agree}
                      onCheckedChange={(c) =>
                        setVolunteer((p) => ({ ...p, agree: Boolean(c) }))
                      }
                    />
                    <Label
                      htmlFor="volunteerTerms"
                      className="text-sm text-gray-700"
                    >
                      I agree to the volunteer terms and conditions and commit
                      to the program requirements *
                    </Label>
                  </div>
                  {volunteerErrors.agree && (
                    <p className="text-sm text-red-500">
                      You must accept the terms
                    </p>
                  )}
                  <Button
                    className="w-full bg-black text-white hover:bg-gray-800 py-3"
                    type="submit"
                    disabled={submittingVolunteer}
                    aria-busy={submittingVolunteer}
                  >
                    {submittingVolunteer && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {submittingVolunteer
                      ? "Submitting..."
                      : "Submit Volunteer Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-20 bg-white" id="register">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Register for 2025 Program
              </h2>
              <p className="text-xl text-gray-600">
                Secure your spot in the next WiCon SMART SOLUTION FOR DIGITAL
                EDUCATION program
              </p>
            </div>
            <Card className="bg-white border-gray-200">
              <CardContent className="p-8">
                <form
                  className="space-y-6"
                  onSubmit={handleRegisterSubmit}
                  aria-busy={submittingRegister}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        className="mt-1"
                        value={register.firstName}
                        onChange={(e) =>
                          setRegister((p) => ({
                            ...p,
                            firstName: e.target.value,
                          }))
                        }
                        aria-invalid={registerErrors.firstName || undefined}
                      />
                      {registerErrors.firstName && (
                        <p className="text-sm text-red-600 mt-1">
                          First name is required
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        className="mt-1"
                        value={register.lastName}
                        onChange={(e) =>
                          setRegister((p) => ({
                            ...p,
                            lastName: e.target.value,
                          }))
                        }
                        aria-invalid={registerErrors.lastName || undefined}
                      />
                      {registerErrors.lastName && (
                        <p className="text-sm text-red-600 mt-1">
                          Last name is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="mt-1"
                        value={register.email}
                        onChange={(e) =>
                          setRegister((p) => ({ ...p, email: e.target.value }))
                        }
                        aria-invalid={registerErrors.email || undefined}
                      />
                      {registerErrors.email && (
                        <p className="text-sm text-red-600 mt-1">
                          Email is required
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+237 6XX XXX XXX"
                        className="mt-1"
                        value={register.phone}
                        onChange={(e) =>
                          setRegister((p) => ({ ...p, phone: e.target.value }))
                        }
                        aria-invalid={registerErrors.phone || undefined}
                      />
                      {registerErrors.phone && (
                        <p className="text-sm text-red-600 mt-1">
                          Phone is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="track">Preferred Training Track *</Label>
                    <Select
                      value={register.track}
                      onValueChange={(v) =>
                        setRegister((p) => ({ ...p, track: v }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your preferred track" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">
                          Software Development Track
                        </SelectItem>
                        <SelectItem value="iot">IoT Solutions Track</SelectItem>
                        <SelectItem value="wicon">
                          WiCon Controller Track
                        </SelectItem>
                        <SelectItem value="comprehensive">
                          Comprehensive Program (All Tracks)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="education">Education Level *</Label>
                      <Select
                        value={register.education}
                        onValueChange={(v) =>
                          setRegister((p) => ({ ...p, education: v }))
                        }
                      >
                        <SelectTrigger
                          className="mt-1"
                          aria-invalid={registerErrors.education || undefined}
                        >
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high-school">
                            High School
                          </SelectItem>
                          <SelectItem value="diploma">
                            Diploma/Certificate
                          </SelectItem>
                          <SelectItem value="bachelor">
                            Bachelor's Degree
                          </SelectItem>
                          <SelectItem value="master">
                            Master's Degree
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {registerErrors.education && (
                        <p className="text-sm text-red-600 mt-1">
                          Education level is required
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="experience">Technical Experience</Label>
                      <Select
                        value={register.experience}
                        onValueChange={(v) =>
                          setRegister((p) => ({ ...p, experience: v }))
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">
                            Beginner (0-1 years)
                          </SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate (2-3 years)
                          </SelectItem>
                          <SelectItem value="advanced">
                            Advanced (4+ years)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="motivation">
                      Why do you want to join this program? *
                    </Label>
                    <Textarea
                      id="motivation"
                      placeholder="Tell us about your goals and motivation for joining the program..."
                      className="mt-1"
                      value={register.motivation}
                      onChange={(e) =>
                        setRegister((p) => ({
                          ...p,
                          motivation: e.target.value,
                        }))
                      }
                      rows={4}
                      aria-invalid={registerErrors.motivation || undefined}
                    />
                    {registerErrors.motivation && (
                      <p className="text-sm text-red-600 mt-1">
                        Motivation is required
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="employer">
                      Current Employer/Institution (Optional)
                    </Label>
                    <Input
                      id="employer"
                      placeholder="Company or school name"
                      className="mt-1"
                      value={register.employer}
                      onChange={(e) =>
                        setRegister((p) => ({ ...p, employer: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={register.terms}
                      onCheckedChange={(c) =>
                        setRegister((p) => ({ ...p, terms: Boolean(c) }))
                      }
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions and understand that
                      registration is subject to approval *
                    </Label>
                  </div>
                  {registerErrors.terms && (
                    <p className="text-sm text-red-600">
                      You must accept the terms
                    </p>
                  )}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="updates"
                      checked={register.updates}
                      onCheckedChange={(c) =>
                        setRegister((p) => ({ ...p, updates: Boolean(c) }))
                      }
                    />
                    <Label htmlFor="updates" className="text-sm">
                      I would like to receive updates about WiCon Systems
                      training programs and events
                    </Label>
                  </div>
                  <Button
                    className="w-full bg-black text-white hover:bg-gray-800 py-3"
                    type="submit"
                    disabled={submittingRegister}
                    aria-busy={submittingRegister}
                  >
                    {submittingRegister && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {submittingRegister
                      ? "Submitting..."
                      : "Submit Registration Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Information */}
        <section className="pb-10 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">
                Questions About the Program?
              </h2>
              <p className="text-xl text-gray-600">
                Get in touch with our training coordinators
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-gray-200 text-center">
                <CardContent className="p-6">
                  <Phone className="w-8 h-8 mx-auto mb-4 text-black" />
                  <h3 className="font-bold text-black mb-2">Call Us</h3>
                  <p className="text-gray-600">+237 670791815</p>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri, 8AM-5PM</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200 text-center">
                <CardContent className="p-6">
                  <Mail className="w-8 h-8 mx-auto mb-4 text-black" />
                  <h3 className="font-bold text-black mb-2">Email Us</h3>
                  <p className="text-gray-600">contactwiconsystems@gmail.com</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Response within 24 hours
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200 text-center">
                <CardContent className="p-6">
                  <MapPin className="w-8 h-8 mx-auto mb-4 text-black" />
                  <h3 className="font-bold text-black mb-2">Visit Us</h3>
                  <p className="text-gray-600">WiCon Systems HQ</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Buea, Southwest Region
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
