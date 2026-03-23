"use client";

import type React from "react";

import { useState } from "react";
import {Header} from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Users,
  GraduationCap,
  Briefcase,
  Clock,
  MapPin,
  Mail,
  Phone,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import PhoneField from "@/components/phone-field";
import { isValidPhoneNumber } from "react-phone-number-input";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    phone: "",
    dob: "",
    sex: "",
    internshipType: "",
    program: "",
    university: "",
    yearOfStudy: "",
    duration: "",
    startDate: "",
    endDate: "",
    position: "",
    availability: "",
    motivation: "",
    skills: "",
    certifications: "",
    languages: "",
    portfolio: "",
    agreeToTerms: false,
    academicEntries: [
      { institution: "", degree: "", major: "", graduationDate: "" },
    ] as {
      institution: string;
      degree: string;
      major: string;
      graduationDate: string;
    }[],
    experienceEntries: [
      { company: "", title: "", responsibilities: "", duration: "" },
    ] as {
      company: string;
      title: string;
      responsibilities: string;
      duration: string;
    }[],
    references: [{ referee: "", relationship: "", contact: "" }] as {
      referee: string;
      relationship: string;
      contact: string;
    }[],
    cvFile: null as File | null,
    photoFile: null as File | null,
    photoPreview: null as string | null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: boolean }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate required fields before submitting
      const nextErrors: { [k: string]: boolean } = {
        fullName: !formData.fullName.trim(),
        address: !formData.address.trim(),
        email: !formData.email.trim(),
        phone: !formData.phone.trim(),
        dob: !formData.dob,
        sex: !String(formData.sex),
        position: !formData.position.trim(),
        availability: !String(formData.availability),
        cvFile: !formData.cvFile,
        agreeToTerms: !formData.agreeToTerms,
      };
      setErrors(nextErrors);
      if (Object.values(nextErrors).some(Boolean)) {
        toast.error("Please fix the highlighted fields");
        return;
      }
      setSubmitting(true);
      const fd = new FormData();
      // primitive fields
      fd.append("fullName", formData.fullName);
      fd.append("address", formData.address);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("dob", formData.dob);
      fd.append("sex", String(formData.sex));
      fd.append("position", formData.position);
      fd.append("availability", String(formData.availability));
      fd.append("startDate", formData.startDate);
      fd.append("endDate", formData.endDate);
      fd.append("skills", formData.skills);
      fd.append("certifications", formData.certifications);
      fd.append("languages", formData.languages);
      fd.append("agreeToTerms", String(formData.agreeToTerms));

      // complex arrays
      fd.append("academicEntries", JSON.stringify(formData.academicEntries));
      fd.append(
        "experienceEntries",
        JSON.stringify(formData.experienceEntries)
      );
      fd.append("references", JSON.stringify(formData.references));

      // files
      if (formData.cvFile) fd.append("cvFile", formData.cvFile);
      if (formData.photoFile) fd.append("photoFile", formData.photoFile);

      const res = await fetch("/api/careers/submit", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Submission failed");
      }

      toast.success(
        "Application submitted successfully! A confirmation email has been sent."
      );
      // optional: reset some fields (keep file previews?)
      setFormData((prev) => ({
        ...prev,
        fullName: "",
        address: "",
        email: "",
        phone: "",
        dob: "",
        sex: "",
        position: "",
        availability: "",
        startDate: "",
        endDate: "",
        skills: "",
        certifications: "",
        languages: "",
        academicEntries: [
          { institution: "", degree: "", major: "", graduationDate: "" },
        ],
        experienceEntries: [
          { company: "", title: "", responsibilities: "", duration: "" },
        ],
        references: [{ referee: "", relationship: "", contact: "" }],
        cvFile: null,
        photoFile: null,
        photoPreview: null,
        agreeToTerms: false,
      }));
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, cvFile: file }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    const preview = file ? URL.createObjectURL(file) : null;
    setFormData((prev) => ({
      ...prev,
      photoFile: file,
      photoPreview: preview,
    }));
  };

  // Repeatable list handlers
  const updateAcademic = (
    idx: number,
    field: keyof (typeof formData)["academicEntries"][number],
    value: string
  ) => {
    const list = [...formData.academicEntries];
    list[idx] = { ...list[idx], [field]: value };
    setFormData((p) => ({ ...p, academicEntries: list }));
  };
  const addAcademic = () =>
    setFormData((p) => ({
      ...p,
      academicEntries: [
        ...p.academicEntries,
        { institution: "", degree: "", major: "", graduationDate: "" },
      ],
    }));
  const removeAcademic = (idx: number) =>
    setFormData((p) => ({
      ...p,
      academicEntries: p.academicEntries.filter((_, i) => i !== idx),
    }));

  const updateExperience = (
    idx: number,
    field: keyof (typeof formData)["experienceEntries"][number],
    value: string
  ) => {
    const list = [...formData.experienceEntries];
    list[idx] = { ...list[idx], [field]: value };
    setFormData((p) => ({ ...p, experienceEntries: list }));
  };
  const addExperience = () =>
    setFormData((p) => ({
      ...p,
      experienceEntries: [
        ...p.experienceEntries,
        { company: "", title: "", responsibilities: "", duration: "" },
      ],
    }));
  const removeExperience = (idx: number) =>
    setFormData((p) => ({
      ...p,
      experienceEntries: p.experienceEntries.filter((_, i) => i !== idx),
    }));

  const updateReference = (
    idx: number,
    field: keyof (typeof formData)["references"][number],
    value: string
  ) => {
    const list = [...formData.references];
    list[idx] = { ...list[idx], [field]: value };
    setFormData((p) => ({ ...p, references: list }));
  };
  const addReference = () =>
    setFormData((p) => ({
      ...p,
      references: [
        ...p.references,
        { referee: "", relationship: "", contact: "" },
      ],
    }));
  const removeReference = (idx: number) =>
    setFormData((p) => ({
      ...p,
      references: p.references.filter((_, i) => i !== idx),
    }));

  const scrollToPositions = () => {
    document.getElementById("internship-programs")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToApplication = () => {
    document.getElementById("application-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="">
        {/* Hero Section */}
        <section className="bg-black text-white py-16 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
              Build the <span className="text-gray-500">Future</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              Shape the future of electrical systems in Cameroon. We're looking
              for passionate talent ready to learn and lead innovative
              projects in smart infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                className="h-16 px-12 rounded-2xl bg-white text-black hover:bg-gray-200 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-white/10 active:scale-95 transition-all cursor-pointer"
                onClick={scrollToPositions}
              >
                Open Positions
              </Button>
              <Button
                className="h-16 px-12 rounded-2xl border-white/20 text-white hover:bg-white hover:text-black text-[10px] font-black uppercase tracking-widest bg-transparent active:scale-95 transition-all cursor-pointer"
                onClick={scrollToApplication}
              >
                Apply Directly
              </Button>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-20 sm:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl sm:text-5xl font-black text-black mb-6 uppercase tracking-tighter">
                Why Us?
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                We don't just hire; we nurture. Join an ecosystem built for hyper-growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
              {[
                {
                  title: "Mentorship",
                  icon: <Users className="w-8 h-8 text-white" />,
                  desc: "Work directly with veterans who are committed to your trajectory."
                },
                {
                  title: "Real Impact",
                  icon: <Briefcase className="w-8 h-8 text-white" />,
                  desc: "Your code and designs will power real city-scale infrastructure."
                },
                {
                  title: "Skill Up",
                  icon: <GraduationCap className="w-8 h-8 text-white" />,
                  desc: "Continuous learning with access to modern tech stacks and hardware."
                }
              ].map((val, idx) => (
                <Card key={idx} className="bg-white border-transparent rounded-[2.5rem] group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 overflow-hidden">
                  <CardHeader className="p-10 text-center">
                    <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:rotate-6 transition-transform duration-500 shadow-xl shadow-black/10">
                      {val.icon}
                    </div>
                    <CardTitle className="text-xl font-black uppercase tracking-tight text-black mb-4">{val.title}</CardTitle>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                      {val.desc}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Internship Programs */}
        <section id="internship-programs" className="py-20 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl sm:text-5xl font-black text-black mb-6 uppercase tracking-tighter">
                Tracks
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                Tailored paths for academic growth or professional transition.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 sm:gap-16">
              {[
                {
                  title: "Academic",
                  icon: <GraduationCap className="w-8 h-8" />,
                  desc: "Ideal for students seeking official credit and foundational industry exposure.",
                  duration: "3-6 months",
                  learn: ["System Design & Flow", "Hardware Integration", "Modern CCTV Stacks", "Compliance Logic"],
                  reqs: ["Enrolled in relevant BSc/BEng", "Logical consistency focus", "Fast learner mindset"]
                },
                {
                  title: "Professional",
                  icon: <Briefcase className="w-8 h-8" />,
                  desc: "For graduates and career-shifters looking for intense 1-on-1 industry grooming.",
                  duration: "6-12 months",
                  learn: ["Project Leadership", "High-level Consultation", "Business Dev Strategies", "Technical Certification"],
                  reqs: ["Technical core background", "Strong problem solving", "Leadership potential"]
                }
              ].map((program, idx) => (
                <Card key={idx} className="bg-gray-50 border-transparent rounded-[3rem] overflow-hidden group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                  <CardHeader className="p-10 sm:p-14">
                    <div className="flex items-center gap-8 mb-10">
                      <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-black/10">
                        {program.icon}
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-black uppercase tracking-tight text-black mb-1">
                          {program.title}
                        </CardTitle>
                        <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                          <Clock className="w-3.5 h-3.5 mr-2" />
                          <span>{program.duration}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed mb-10">
                      {program.desc}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-6">Learning Goals</h4>
                        <ul className="space-y-3">
                          {program.learn.map((l, i) => (
                            <li key={i} className="flex items-center gap-2 group/item">
                              <div className="w-1.5 h-1.5 bg-black/20 rounded-full group-hover/item:bg-black transition-colors"></div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover/item:text-black transition-colors">{l}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-6">Profile Reqs</h4>
                        <ul className="space-y-3">
                          {program.reqs.map((r, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-black/20 rounded-full"></div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20 sm:py-32 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-black mb-6 uppercase tracking-tighter">
                How it Works
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                A streamlined journey from application to impact.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { step: "01", title: "Apply", desc: "Submit your details via our premium portal." },
                { step: "02", title: "Review", desc: "Our team evaluates your technical core." },
                { step: "03", title: "Connect", desc: "Deep dive interview on goals and alignment." },
                { step: "04", title: "Launch", desc: "Onboard and start building the future." }
              ].map((s, i) => (
                <div key={i} className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-black text-white rounded-2xl mb-6 text-sm font-black group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-black/10">
                    {s.step}
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-black mb-2">{s.title}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 max-w-[120px] mx-auto leading-tight">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 sm:py-32 bg-white" id="application-form">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white border-transparent rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5">
              <CardContent className="p-8 sm:p-16">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-16"
                  aria-busy={submitting}
                >
                  {/* Applicant Information */}
                  <div className="space-y-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-1 bg-black rounded-full"></div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                        01. Personal Information
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name *</Label>
                            <Input
                              value={formData.fullName}
                              onChange={(e) => handleInputChange("fullName", e.target.value)}
                              placeholder="John Smith"
                              className={`h-14 sm:h-16 rounded-2xl bg-gray-50 border-none shadow-sm focus:ring-black/5 ${errors.fullName ? "ring-2 ring-red-500" : ""}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Address *</Label>
                            <Input
                              value={formData.address}
                              onChange={(e) => handleInputChange("address", e.target.value)}
                              placeholder="Yaoundé, Cameroon"
                              className={`h-14 sm:h-16 rounded-2xl bg-gray-50 border-none shadow-sm focus:ring-black/5 ${errors.address ? "ring-2 ring-red-500" : ""}`}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email *</Label>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="john@example.com"
                              className={`h-14 sm:h-16 rounded-2xl bg-gray-50 border-none shadow-sm focus:ring-black/5 ${errors.email ? "ring-2 ring-red-500" : ""}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone *</Label>
                            <PhoneField
                              value={formData.phone || undefined}
                              defaultCountry="CM"
                              onChange={(val) => {
                                const next = val || "";
                                handleInputChange("phone", next);
                                if (next && typeof next === "string" && isValidPhoneNumber(next)) {
                                  setErrors((p) => ({ ...p, phone: false }));
                                }
                              }}
                              error={!!errors.phone}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date of Birth *</Label>
                            <Input
                              type="date"
                              value={formData.dob}
                              onChange={(e) => handleInputChange("dob", e.target.value)}
                              className={`h-14 sm:h-16 rounded-2xl bg-gray-50 border-none shadow-sm focus:ring-black/5 ${errors.dob ? "ring-2 ring-red-500" : ""}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sex *</Label>
                            <Select value={String(formData.sex)} onValueChange={(v) => handleInputChange("sex", v)}>
                              <SelectTrigger className={`h-14 sm:h-16 rounded-2xl bg-gray-50 border-none shadow-sm focus:ring-black/5 ${errors.sex ? "ring-2 ring-red-500" : ""}`}>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-none shadow-2xl p-2 font-black uppercase tracking-widest text-[10px]">
                                <SelectItem className="rounded-xl" value="male">Male</SelectItem>
                                <SelectItem className="rounded-xl" value="female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-center block">Passport Photo</Label>
                        <div className="aspect-square w-full max-w-[200px] mx-auto rounded-3xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center relative group transition-colors hover:border-black/10">
                          {formData.photoPreview ? (
                            <img src={formData.photoPreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          ) : (
                            <div className="text-center p-4">
                              <Plus className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Upload 1:1</span>
                            </div>
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Background */}
                  <div className="space-y-10">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-1 bg-black rounded-full"></div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                          02. Academic Background
                        </h3>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={addAcademic}
                        className="h-10 px-4 rounded-xl hover:bg-black hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Record
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {formData.academicEntries.map((row, idx) => (
                        <div key={idx} className="bg-gray-50/50 p-8 rounded-[2rem] relative group border border-transparent hover:border-black/5 transition-all">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                              <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Institution</Label>
                              <Input
                                placeholder="University"
                                value={row.institution}
                                onChange={(e) => updateAcademic(idx, "institution", e.target.value)}
                                className="h-14 rounded-xl bg-white border-none shadow-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Degree</Label>
                              <Input
                                placeholder="BSc"
                                value={row.degree}
                                onChange={(e) => updateAcademic(idx, "degree", e.target.value)}
                                className="h-14 rounded-xl bg-white border-none shadow-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Major</Label>
                              <Input
                                placeholder="Electrical"
                                value={row.major}
                                onChange={(e) => updateAcademic(idx, "major", e.target.value)}
                                className="h-14 rounded-xl bg-white border-none shadow-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Graduation</Label>
                              <div className="flex gap-2">
                                <Input
                                  type="month"
                                  value={row.graduationDate}
                                  onChange={(e) => updateAcademic(idx, "graduationDate", e.target.value)}
                                  className="h-14 rounded-xl bg-white border-none shadow-sm flex-1"
                                />
                                {formData.academicEntries.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeAcademic(idx)}
                                    className="h-14 w-14 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preference */}
                  <div className="space-y-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-1 bg-black rounded-full"></div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                        03. Internship Preference
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Position *</Label>
                        <Input
                          value={formData.position}
                          onChange={(e) => handleInputChange("position", e.target.value)}
                          placeholder="e.g., Electrical Intern"
                          className={`h-14 sm:h-16 rounded-2xl bg-gray-50 border-none shadow-sm focus:ring-black/5 ${errors.position ? "ring-2 ring-red-500" : ""}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Availability *</Label>
                        <Select value={String(formData.availability)} onValueChange={(v) => handleInputChange("availability", v)}>
                          <SelectTrigger className={`h-14 sm:h-16 rounded-2xl bg-gray-50 border-none shadow-sm focus:ring-black/5 ${errors.availability ? "ring-2 ring-red-500" : ""}`}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-none shadow-2xl p-2 font-black uppercase tracking-widest text-[10px]">
                            <SelectItem className="rounded-xl" value="full-time">Full-time</SelectItem>
                            <SelectItem className="rounded-xl" value="part-time">Part-time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Skills & Experience */}
                  <div className="space-y-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-1 bg-black rounded-full"></div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                        04. Skills & Documents
                      </h3>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Skills & Competencies</Label>
                        <Textarea
                          value={formData.skills}
                          onChange={(e) => handleInputChange("skills", e.target.value)}
                          placeholder="List your technical strengths..."
                          className="min-h-[140px] rounded-[2rem] bg-gray-50 border-none shadow-sm focus:ring-black/5 p-8"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CV / Resume *</Label>
                        <div className="relative">
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className={`h-14 sm:h-16 rounded-2xl bg-gray-50 border-none shadow-sm focus:ring-black/5 pt-4 ${errors.cvFile ? "ring-2 ring-red-500" : ""}`}
                          />
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-3 ml-1">PDF, DOCX. Max 5MB.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission */}
                  <div className="pt-10 border-t border-gray-100">
                    <div className="flex items-center space-x-3 bg-gray-50 p-6 rounded-2xl mb-10">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        className="w-5 h-5 rounded-lg border-2 border-gray-200 data-[state=checked]:bg-black data-[state=checked]:border-black"
                        onCheckedChange={(c) => handleInputChange("agreeToTerms", Boolean(c))}
                      />
                      <Label htmlFor="agreeToTerms" className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-normal">
                        I confirm all information is accurate and agree to review terms *
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-20 rounded-[2rem] bg-black text-white hover:bg-gray-800 text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/20 transition-all active:scale-[0.98] cursor-pointer"
                      disabled={submitting}
                    >
                      {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}