import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wrench,
  Users,
  MapPin,
  Phone,
  CheckCircle,
  ArrowRight,
  Settings,
  AlertTriangle,
  GraduationCap,
  Calendar,
} from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive electrical services from installation to maintenance. We provide professional, reliable
              solutions backed by over 10 years of experience in Cameroon.
            </p>
          </div>
        </section>
        
        {/* Main Services Grid */}
        <section className="pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Installation Services */}
              <Card className="bg-gray-50 border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                      <Wrench className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Installation Services</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600">
                    Professional installation of all electrical systems with certified technicians and quality
                    materials.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">WiCon Wireless Controller setup</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Solar PV system installation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Complete electrical wiring</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">CCTV security system setup</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Certified Technicians</Badge>
                    <Badge variant="secondary">Quality Materials</Badge>
                    <Badge variant="secondary">Code Compliant</Badge>
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer">
                    Request Installation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Maintenance & Support */}
              <Card className="bg-gray-50 border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Maintenance & Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600">
                    Ongoing maintenance and technical support to ensure your electrical systems operate at peak
                    performance.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Preventive maintenance programs</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">System performance optimization</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Remote monitoring and diagnostics</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Software updates and upgrades</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Scheduled Maintenance</Badge>
                    <Badge variant="secondary">Remote Support</Badge>
                    <Badge variant="secondary">Performance Reports</Badge>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent cursor-pointer">
                    Schedule Maintenance
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Consultation & Design */}
              <Card className="bg-gray-50 border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Consultation & Design</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600">
                    Expert consultation and custom design services to create the perfect electrical solution for your
                    specific needs.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Site assessment and analysis</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Custom system design</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Energy efficiency optimization</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Cost-benefit analysis</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Free Consultation</Badge>
                    <Badge variant="secondary">Custom Solutions</Badge>
                    <Badge variant="secondary">Expert Advice</Badge>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent cursor-pointer">
                    Book Consultation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Emergency Services */}
              <Card className="bg-gray-50 border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Emergency Services</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600">
                    24/7 emergency electrical services for urgent repairs and safety issues. Fast response times across
                    Southwest Region.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">24/7 emergency response</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Electrical fault diagnosis</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Safety hazard resolution</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Temporary power solutions</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="destructive">24/7 Available</Badge>
                    <Badge variant="secondary">Fast Response</Badge>
                    <Badge variant="secondary">Safety Priority</Badge>
                  </div>
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700 cursor-pointer">
                    Emergency Call
                    <Phone className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Service Coverage Areas</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We provide comprehensive electrical services throughout Southwest Region, Cameroon. Our mobile service
                  teams ensure fast response times and professional service delivery.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Buea (HQ)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Limbe</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Tiko</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Kumba</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Mamfe</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Idenau</span>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="/wicon-hero.png"
                  alt="Service Coverage Map"
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Process */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Service Process</h2>
              <p className="text-xl text-gray-600">Simple, transparent process from consultation to completion</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">Contact & Consultation</h3>
                <p className="text-gray-600 text-sm">Free initial consultation to understand your needs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">Site Assessment</h3>
                <p className="text-gray-600 text-sm">Detailed evaluation and custom solution design</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">Professional Installation</h3>
                <p className="text-gray-600 text-sm">Expert installation with quality materials</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">Ongoing Support</h3>
                <p className="text-gray-600 text-sm">Maintenance and support for optimal performance</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
