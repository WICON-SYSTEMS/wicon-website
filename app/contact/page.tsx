"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, MapPin, Clock, MessageCircle, AlertTriangle, Send, CheckCircle, X } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    preferredContact: 'email'
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [mapLoading, setMapLoading] = useState(true)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.service) newErrors.service = 'Please select a service'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (result.ok) {
        setShowSuccessModal(true)
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
          preferredContact: 'email'
        })
      } else {
        alert(`Error: ${result.error || 'Failed to send message'}`)
      }
    } catch (error) {
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-10 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">Contact WiCon Systems</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to upgrade your electrical systems? Get in touch with our experts for a free consultation and
              customized quote.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Get Your Free Quote</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and our team will get back to you within 24 hours with a detailed quote and
                  consultation.
                </p>
                <Card className="bg-gray-50 border-gray-200">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-sm font-medium text-black">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                          />
                          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-sm font-medium text-black">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                          />
                          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-black">
                          Email Address *
                        </Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your.email@example.com" 
                          className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required 
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-black">
                          Phone Number *
                        </Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="+237 6XX XXX XXX" 
                          className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required 
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <Label htmlFor="service" className="text-sm font-medium text-black">
                          Service Interest *
                        </Label>
                        <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                          <SelectTrigger className={`mt-1 ${errors.service ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wireless-controllers">WiCon Wireless Controllers</SelectItem>
                            <SelectItem value="software">Software Solutions</SelectItem>
                            <SelectItem value="electrical-wiring">Electrical Wiring</SelectItem>
                            <SelectItem value="cctv-security">CCTV Security Systems</SelectItem>
                            <SelectItem value="maintenance">Maintenance & Support</SelectItem>
                            <SelectItem value="consultation">Consultation & Design</SelectItem>
                            <SelectItem value="emergency">Emergency Services</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-sm font-medium text-black">
                          Project Details & Message *
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project, requirements, and any specific questions you have..."
                          className={`mt-1 min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-black text-white hover:bg-gray-800 py-3" 
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {/* Office Address */}
                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-black mb-2">Office Address</h3>
                          <p className="text-gray-600">
                            WiCon Systems Headquarters
                            <br />
                            Buea, Southwest Region
                            <br />
                            Cameroon
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phone & Email */}
                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-black mb-2">Phone & Email</h3>
                          <p className="text-gray-600 mb-2">
                            <strong>Phone:</strong> +237 670791815
                          </p>
                          <p className="text-gray-600">
                            <strong>Email:</strong> info@wiconsystems.cm
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Business Hours */}
                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-black mb-2">Business Hours</h3>
                          <div className="text-gray-600 space-y-1">
                            <p>
                              <strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM
                            </p>
                            <p>
                              <strong>Saturday:</strong> 9:00 AM - 4:00 PM
                            </p>
                            <p>
                              <strong>Sunday:</strong> Emergency calls only
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* WhatsApp Contact */}
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-black mb-2">WhatsApp Support</h3>
                          <p className="text-gray-600 mb-4">
                            Get instant support via WhatsApp. Popular and convenient for quick questions and updates.
                          </p>
                          <Button 
                            className="bg-green-600 text-white hover:bg-green-700"
                            onClick={() => window.open('https://wa.me/237670791815', '_blank')}
                          >
                            <MessageCircle className="mr-2 w-4 h-4" />
                            Chat on WhatsApp
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
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Find Us</h2>
              <p className="text-xl text-gray-600">Located in the heart of Buea, Southwest Region</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
              {mapLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
                    <span className="text-gray-600 font-medium">Loading Map...</span>
                  </div>
                </div>
              )}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31708.794234567!2d9.292!3d4.1553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610d0d3b3b3b3b%3A0x1234567890abcdef!2sBuea%2C%20Cameroon!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
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
                      <h3 className="text-2xl font-bold text-black mb-2">Emergency Electrical Services</h3>
                      <p className="text-gray-600">
                        24/7 emergency response for urgent electrical issues and safety hazards
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-red-600 text-white hover:bg-red-700 px-8 py-3"
                      onClick={() => window.location.href = 'tel:+237670791815'}
                    >
                      <Phone className="mr-2 w-5 h-5" />
                      Emergency: +237 670791815
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
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">We Serve Southwest Region</h2>
              <p className="text-xl text-gray-600">Professional electrical services across multiple cities</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {["Buea", "Limbe", "Tiko", "Kumba", "Mamfe", "Idenau"].map((city) => (
                <Card key={city} className="bg-gray-50 border-gray-200 text-center">
                  <CardContent className="p-6">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-bold text-black">{city}</h3>
                  </CardContent>
                </Card>
              ))}
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
                    <h3 className="text-lg font-semibold text-gray-900">Message Sent Successfully!</h3>
                    <p className="text-sm text-gray-500">We'll get back to you within 24 hours</p>
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
                  <strong>Thank you, {formData.firstName || 'there'}!</strong> Your message has been received and our team will review your inquiry.
                </p>
                <p className="text-sm text-gray-600">
                  You should receive a confirmation email shortly. For urgent matters, please call our emergency line: <strong>+237 670791815</strong>
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
                    setShowSuccessModal(false)
                    window.location.href = '/services'
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
  )
}
