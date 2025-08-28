"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, GraduationCap, Briefcase, Clock, MapPin, Mail, Phone, Plus, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import PhoneField from "@/components/phone-field"
import { isValidPhoneNumber } from "react-phone-number-input"

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
    ] as { institution: string; degree: string; major: string; graduationDate: string }[],
    experienceEntries: [
      { company: "", title: "", responsibilities: "", duration: "" },
    ] as { company: string; title: string; responsibilities: string; duration: string }[],
    references: [
      { referee: "", relationship: "", contact: "" },
    ] as { referee: string; relationship: string; contact: string }[],
    cvFile: null as File | null,
    photoFile: null as File | null,
    photoPreview: null as string | null,
  })
  
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [k: string]: boolean }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
      }
      setErrors(nextErrors)
      if (Object.values(nextErrors).some(Boolean)) {
        toast.error('Please fix the highlighted fields')
        return
      }
      setSubmitting(true)
      const fd = new FormData()
      // primitive fields
      fd.append('fullName', formData.fullName)
      fd.append('address', formData.address)
      fd.append('email', formData.email)
      fd.append('phone', formData.phone)
      fd.append('dob', formData.dob)
      fd.append('sex', String(formData.sex))
      fd.append('position', formData.position)
      fd.append('availability', String(formData.availability))
      fd.append('startDate', formData.startDate)
      fd.append('endDate', formData.endDate)
      fd.append('skills', formData.skills)
      fd.append('certifications', formData.certifications)
      fd.append('languages', formData.languages)
      fd.append('agreeToTerms', String(formData.agreeToTerms))

      // complex arrays
      fd.append('academicEntries', JSON.stringify(formData.academicEntries))
      fd.append('experienceEntries', JSON.stringify(formData.experienceEntries))
      fd.append('references', JSON.stringify(formData.references))

      // files
      if (formData.cvFile) fd.append('cvFile', formData.cvFile)
      if (formData.photoFile) fd.append('photoFile', formData.photoFile)

      const res = await fetch('/api/careers/submit', {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || 'Submission failed')
      }

      toast.success('Application submitted successfully! A confirmation email has been sent.')
      // optional: reset some fields (keep file previews?)
      setFormData((prev) => ({
        ...prev,
        fullName: '',
        address: '',
        email: '',
        phone: '',
        dob: '',
        sex: '',
        position: '',
        availability: '',
        startDate: '',
        endDate: '',
        skills: '',
        certifications: '',
        languages: '',
        academicEntries: [{ institution: '', degree: '', major: '', graduationDate: '' }],
        experienceEntries: [{ company: '', title: '', responsibilities: '', duration: '' }],
        references: [{ referee: '', relationship: '', contact: '' }],
        cvFile: null,
        photoFile: null,
        photoPreview: null,
        agreeToTerms: false,
      }))
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null
    setFormData((prev) => ({ ...prev, cvFile: file }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null
    const preview = file ? URL.createObjectURL(file) : null
    setFormData((prev) => ({ ...prev, photoFile: file, photoPreview: preview }))
  }

  // Repeatable list handlers
  const updateAcademic = (idx: number, field: keyof (typeof formData)["academicEntries"][number], value: string) => {
    const list = [...formData.academicEntries]
    list[idx] = { ...list[idx], [field]: value }
    setFormData((p) => ({ ...p, academicEntries: list }))
  }
  const addAcademic = () => setFormData((p) => ({ ...p, academicEntries: [...p.academicEntries, { institution: "", degree: "", major: "", graduationDate: "" }] }))
  const removeAcademic = (idx: number) => setFormData((p) => ({ ...p, academicEntries: p.academicEntries.filter((_, i) => i !== idx) }))

  const updateExperience = (idx: number, field: keyof (typeof formData)["experienceEntries"][number], value: string) => {
    const list = [...formData.experienceEntries]
    list[idx] = { ...list[idx], [field]: value }
    setFormData((p) => ({ ...p, experienceEntries: list }))
  }
  const addExperience = () => setFormData((p) => ({ ...p, experienceEntries: [...p.experienceEntries, { company: "", title: "", responsibilities: "", duration: "" }] }))
  const removeExperience = (idx: number) => setFormData((p) => ({ ...p, experienceEntries: p.experienceEntries.filter((_, i) => i !== idx) }))

  const updateReference = (idx: number, field: keyof (typeof formData)["references"][number], value: string) => {
    const list = [...formData.references]
    list[idx] = { ...list[idx], [field]: value }
    setFormData((p) => ({ ...p, references: list }))
  }
  const addReference = () => setFormData((p) => ({ ...p, references: [...p.references, { referee: "", relationship: "", contact: "" }] }))
  const removeReference = (idx: number) => setFormData((p) => ({ ...p, references: p.references.filter((_, i) => i !== idx) }))

  const scrollToPositions = () => {
    document.getElementById("internship-programs")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const scrollToApplication = () => {
    document.getElementById("application-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="">
        {/* Hero Section */}
        <section className="bg-black text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Shape the future of electrical systems in Cameroon. We're looking for passionate interns ready to learn
              and contribute to innovative projects in wireless control, and electrical infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="text-white bg-black border-white hover:bg-white bg-transparent cursor-pointer"
                onClick={scrollToPositions}
              >
                View Open Positions
              </Button>
              <Button size="lg" className="bg-white text-black hover:bg-gray-400 cursor-pointer" onClick={scrollToApplication}>
                Apply Now
              </Button>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-black mb-4">Why Choose WiCon Systems?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We believe in nurturing talent and providing hands-on experience in cutting-edge electrical
                technologies.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Mentorship Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Work directly with experienced engineers and project managers who are committed to your growth and
                    development.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Real Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Contribute to actual client projects including software solutions, CCTV systems, and wireless
                    controller implementations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Skill Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Gain expertise in emerging technologies, safety protocols, and industry best practices that will
                    advance your career.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Internship Programs */}
        <section id="internship-programs" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-black mb-4">Internship Programs</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We offer two distinct internship tracks designed to meet different career goals and academic
                requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Academic Internship */}
              <Card className="border-2 border-gray-200 hover:border-black transition-colors">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-8 h-8 text-black mr-3" />
                    <CardTitle className="text-xl">Academic Internship</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Perfect for students completing degree requirements or seeking academic credit.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>3-6 months duration</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Buea, Southwest Region</span>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Electrical system design and installation</li>
                      <li>• CCTV security system setup</li>
                      <li>• Wireless controller programming</li>
                      <li>• Safety protocols and compliance</li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Currently enrolled in relevant degree program</li>
                      <li>• Basic understanding of electrical principles</li>
                      <li>• Strong communication skills</li>
                      <li>• Commitment to learning and safety</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Internship */}
              <Card className="border-2 border-gray-200 hover:border-black transition-colors">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Briefcase className="w-8 h-8 text-black mr-3" />
                    <CardTitle className="text-xl">Professional Internship</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Designed for career changers and professionals seeking hands-on experience.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>6-12 months duration</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Buea, Southwest Region</span>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-semibold mb-2">What You'll Gain:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Advanced project management skills</li>
                      <li>• Client interaction and consultation</li>
                      <li>• Business development experience</li>
                      <li>• Technical certification preparation</li>
                      <li>• Potential for full-time employment</li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Technical background or relevant experience</li>
                      <li>• Professional work experience preferred</li>
                      <li>• Strong problem-solving abilities</li>
                      <li>• Leadership potential</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-black mb-4">Application Process</h2>
              <p className="text-lg text-gray-600">
                Ready to start your journey with WiCon Systems? Follow these simple steps to apply.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Submit Application</h3>
                <p className="text-sm text-gray-600">Complete the form below with your details and motivation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Initial Review</h3>
                <p className="text-sm text-gray-600">We'll review your application within 5 business days</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Interview</h3>
                <p className="text-sm text-gray-600">Phone or in-person interview with our team</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Start Date</h3>
                <p className="text-sm text-gray-600">Begin your internship journey with us</p>
              </div>
            </div>

            {/* Application Form */}
            <Card id="application-form" className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Internship Application</CardTitle>
                <CardDescription className="text-center">
                  Fill out the form below to apply for our internship program. All fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-10" aria-busy={submitting}>
                  {/* Applicant Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Applicant Information</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Fields */}
                      <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input id="fullName" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} placeholder="Enter your full name" aria-invalid={errors.fullName || undefined} />
                          {errors.fullName && <p className="text-sm text-red-600">Full name is required</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address *</Label>
                          <Input id="address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} placeholder="Street, City, Region" aria-invalid={errors.address || undefined} />
                          {errors.address && <p className="text-sm text-red-600">Address is required</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="your.email@example.com" aria-invalid={errors.email || undefined} />
                          {errors.email && <p className="text-sm text-red-600">Email is required</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <div className="mt-1">
                            <PhoneField
                              id="phone"
                              value={formData.phone || undefined}
                              defaultCountry="CM"
                              onChange={(val) => {
                                const next = val || ""
                                handleInputChange("phone", next)
                                if (next && typeof next === "string" && isValidPhoneNumber(next)) {
                                  setErrors((p) => ({ ...p, phone: false }))
                                }
                              }}
                              placeholder="e.g. +237 6XX XXX XXX"
                              error={!!errors.phone}
                            />
                          </div>
                          {errors.phone ? (
                            <p className="text-sm text-red-600">
                              {formData.phone && typeof formData.phone === 'string' && !isValidPhoneNumber(formData.phone)
                                ? 'Enter a valid phone number'
                                : 'Phone is required'}
                            </p>
                          ) : (
                            <p className="text-[12px] text-gray-500">Includes country code with flag (e.g., Cameroon +237)</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth *</Label>
                          <Input id="dob" type="date" value={formData.dob} onChange={(e) => handleInputChange("dob", e.target.value)} aria-invalid={errors.dob || undefined} />
                          {errors.dob && <p className="text-sm text-red-600">Date of birth is required</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Sex *</Label>
                          <Select value={String(formData.sex)} onValueChange={(value) => handleInputChange("sex", value)}>
                            <SelectTrigger aria-invalid={errors.sex || undefined}>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.sex && <p className="text-sm text-red-600">Please select your sex</p>}
                        </div>
                      </div>

                      {/* Photo upload */}
                      <div className="md:col-span-1">
                        <div className="space-y-3">
                          <Label htmlFor="photo">Passport Photo (Square)</Label>
                          <div className="aspect-square w-full max-w-xs mx-auto rounded-lg overflow-hidden bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center">
                            {formData.photoPreview ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={formData.photoPreview} alt="Photo preview" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-sm text-gray-500">Upload 1:1 photo</span>
                            )}
                          </div>
                          <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="cursor-pointer" />
                          <p className="text-xs text-gray-500">Square image recommended. Max 5MB.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Background (repeatable) */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h3 className="text-lg font-semibold">Academic Background</h3>
                      <Button type="button" variant="outline" onClick={addAcademic} className="gap-2 cursor-pointer"><Plus className="w-4 h-4" /> Add</Button>
                    </div>
                    <div className="space-y-4">
                      {formData.academicEntries.map((row, idx) => (
                        <div key={idx} className="grid md:grid-cols-2 gap-3 border rounded-md p-4">
                          <div className="space-y-2">
                            <Label>Institution</Label>
                            <Input placeholder="Institution" value={row.institution} onChange={(e) => updateAcademic(idx, "institution", e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Degree/Certificate</Label>
                            <Input placeholder="Degree/Certificate" value={row.degree} onChange={(e) => updateAcademic(idx, "degree", e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Major</Label>
                            <Input placeholder="Major" value={row.major} onChange={(e) => updateAcademic(idx, "major", e.target.value)} />
                          </div>
                          <div className="flex items-end gap-2">
                            <div className="flex-1 justify-between space-y-2">
                              <Label htmlFor={`graduation-${idx}`}>Graduation Date</Label>
                              <Input id={`graduation-${idx}`} className="cursor-pointer" type="month" value={row.graduationDate} onChange={(e) => updateAcademic(idx, "graduationDate", e.target.value)} />
                            </div>
                            {formData.academicEntries.length > 1 && (
                              <Button type="button" className="cursor-pointer hover:text-red-700 hover:bg-red-100" variant="ghost" onClick={() => removeAcademic(idx)} aria-label="Remove academic row"><Trash2 className="w-4 h-4" /></Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Internship Preference */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Internship Preference</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="position">Position Applied For *</Label>
                        <Input id="position" value={formData.position} onChange={(e) => handleInputChange("position", e.target.value)} placeholder="e.g., Electrical Intern" aria-invalid={errors.position || undefined} />
                        {errors.position && <p className="text-sm text-red-600">Position is required</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="availability">Availability *</Label>
                        <Select value={String(formData.availability)} onValueChange={(v) => handleInputChange("availability", v)}>
                          <SelectTrigger aria-invalid={errors.availability || undefined}>
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.availability && <p className="text-sm text-red-600">Availability is required</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Preferred Start Date</Label>
                        <Input id="startDate" type="date" value={formData.startDate} onChange={(e) => handleInputChange("startDate", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">Preferred End Date</Label>
                        <Input id="endDate" type="date" value={formData.endDate} onChange={(e) => handleInputChange("endDate", e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Professional Experience (repeatable) */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h3 className="text-lg font-semibold">Professional Experience</h3>
                      <Button type="button" variant="outline" onClick={addExperience} className="gap-2 cursor-pointer"><Plus className="w-4 h-4" /> Add</Button>
                    </div>
                    <div className="space-y-4">
                      {formData.experienceEntries.map((row, idx) => (
                        <div key={idx} className="space-y-4 p-4 border rounded-md">
                          <div className="grid md:grid-cols-2 gap-6">
                            <Input placeholder="Company" value={row.company} onChange={(e) => updateExperience(idx, "company", e.target.value)} />
                            <Input placeholder="Job Title" value={row.title} onChange={(e) => updateExperience(idx, "title", e.target.value)} />
                          </div>
                          <Textarea placeholder="Responsibilities" value={row.responsibilities} onChange={(e) => updateExperience(idx, "responsibilities", e.target.value)} rows={3} />
                          <div className="flex  ">
                            <Input className="flex-1" placeholder="Duration (e.g., Jun 2023 - Sep 2023)" value={row.duration} onChange={(e) => updateExperience(idx, "duration", e.target.value)} />
                            {formData.experienceEntries.length > 1 && (
                              <Button type="button" className="cursor-pointer hover:text-red-700 hover:bg-red-100" variant="ghost" onClick={() => removeExperience(idx)} aria-label="Remove experience row"><Trash2 className="w-4 h-4" /></Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Skills</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="skills">Relevant Skills</Label>
                        <Textarea id="skills" value={formData.skills} onChange={(e) => handleInputChange("skills", e.target.value)} placeholder="List your relevant skills" rows={3} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="certifications">Certifications</Label>
                        <Textarea id="certifications" value={formData.certifications} onChange={(e) => handleInputChange("certifications", e.target.value)} placeholder="List your certifications (if any)" rows={2} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="languages">Languages</Label>
                        <Input id="languages" value={formData.languages} onChange={(e) => handleInputChange("languages", e.target.value)} placeholder="e.g., English (Fluent), French (Intermediate)" />
                      </div>
                    </div>
                  </div>

                  {/* Attachments */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Attachments</h3>
                    <div className="space-y-2">
                      <Label htmlFor="cv">Upload CV (PDF/DOC/DOCX) *</Label>
                      <Input className="space-y-2 cursor-pointer" id="cv" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} aria-invalid={errors.cvFile || undefined} />
                      {errors.cvFile && <p className="text-sm text-red-600">CV file is required</p>}
                      <p className="text-sm text-gray-500">Max 5MB.</p>
                      {formData.cvFile && (
                        <p className="text-sm text-gray-600">Selected: {formData.cvFile.name}</p>
                      )}
                    </div>
                  </div>

                  {/* References (repeatable) */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h3 className="text-lg font-semibold">References</h3>
                      <Button type="button" variant="outline" onClick={addReference} className="gap-2 cursor-pointer"><Plus className="w-4 h-4" /> Add</Button>
                    </div>
                    <div className="space-y-4">
                      {formData.references.map((row, idx) => (
                        <div key={idx} className="grid md:grid-cols-3 gap-4">
                          <Input placeholder="Referee" value={row.referee} onChange={(e) => updateReference(idx, "referee", e.target.value)} />
                          <Input placeholder="Relationship" value={row.relationship} onChange={(e) => updateReference(idx, "relationship", e.target.value)} />
                          <div className="flex gap-2">
                            <Input className="flex-1" placeholder="Contact Information" value={row.contact} onChange={(e) => updateReference(idx, "contact", e.target.value)} />
                            {formData.references.length > 1 && (
                              <Button type="button" className="cursor-pointer hover:text-red-700 hover:bg-red-100" variant="ghost" onClick={() => removeReference(idx)} aria-label="Remove reference row"><Trash2 className="w-4 h-4" /></Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terms and Submit */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        className="cursor-pointer"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the terms and conditions and consent to WiCon Systems processing my personal data for
                        internship application purposes. *
                      </Label>
                    </div>
                    {errors.agreeToTerms && <p className="text-sm text-red-600">You must accept the terms</p>}

                    <Button
                      type="submit"
                      className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer"
                      disabled={!formData.agreeToTerms || submitting}
                      aria-busy={submitting}
                    >
                      {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Questions About Our Internship Program?</h2>
            <p className="text-gray-300 mb-8">
              Our HR team is here to help you understand our programs and application process.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <Mail className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Email Us</p>
                  <p className="text-gray-300">careers@wiconsystems.cm</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Call Us</p>
                  <p className="text-gray-300">+237 670791815</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
