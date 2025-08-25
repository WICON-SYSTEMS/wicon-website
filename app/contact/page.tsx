import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, MapPin, Clock, MessageCircle, AlertTriangle, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
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
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-sm font-medium text-black">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-sm font-medium text-black">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-black">
                          Email Address *
                        </Label>
                        <Input id="email" type="email" placeholder="your.email@example.com" className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-black">
                          Phone Number *
                        </Label>
                        <Input id="phone" type="tel" placeholder="+237 6XX XXX XXX" className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="service" className="text-sm font-medium text-black">
                          Service Interest *
                        </Label>
                        <Select>
                          <SelectTrigger className="mt-1">
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
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-sm font-medium text-black">
                          Project Details
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project, requirements, and any specific questions you have..."
                          className="mt-1 min-h-[120px]"
                        />
                      </div>
                      <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 py-3">
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
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
                          <Button className="bg-green-600 text-white hover:bg-green-700">
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
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=800&text=Interactive+Map+of+Buea+Location"
                alt="WiCon Systems Location Map"
                className="w-full h-96 object-cover"
              />
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
                    <Button size="lg" className="bg-red-600 text-white hover:bg-red-700 px-8 py-3">
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
    </div>
  )
}
