import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional electrical services in Cameroon: installation, maintenance, and support for WiCon wireless controllers, wiring, and CCTV.",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-black mb-6 uppercase tracking-tighter leading-none">Our Services</h1>
            <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
              Comprehensive electrical solutions from foundation to automation. 
              Professional, reliable, and backed by over 10 years of regional expertise.
            </p>
          </div>
        </section>
        
        {/* Main Services Grid */}
        {/* Main Services Grid */}
        <section className="pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
              {[
                {
                  title: "Installation Services",
                  icon: <Wrench className="w-6 h-6 text-white" />,
                  desc: "Professional installation of all electrical systems with certified technicians and quality materials.",
                  items: ["WiCon Wireless Controller setup", "Complete electrical wiring", "CCTV security system setup"],
                  badges: ["Certified", "Quality Materials", "Compliant"],
                  btnText: "Request Installation",
                  primary: true
                },
                {
                  title: "Maintenance & Support",
                  icon: <Settings className="w-6 h-6 text-white" />,
                  desc: "Ongoing maintenance and technical support to ensure your electrical systems operate at peak performance.",
                  items: ["Preventive maintenance", "Performance optimization", "Remote diagnostics", "Software updates"],
                  badges: ["24/7 Support", "Remote Help", "Performance Logs"],
                  btnText: "Schedule Maintenance"
                },
                {
                  title: "Consultation & Design",
                  icon: <Users className="w-6 h-6 text-white" />,
                  desc: "Expert consultation and custom design services to create the perfect electrical solution.",
                  items: ["Site assessment", "Custom system design", "Efficiency optimization", "Cost-benefit analysis"],
                  badges: ["Free Consultation", "Custom", "Expert Advice"],
                  btnText: "Book Consultation"
                },
                {
                  title: "Emergency Services",
                  icon: <AlertTriangle className="w-6 h-6 text-white" />,
                  desc: "24/7 emergency electrical services for urgent repairs and safety issues. Fast response times.",
                  items: ["24/7 emergency response", "Fault diagnosis", "Safety resolution", "Temporary power"],
                  badges: ["24/7 Available", "Fast Response", "Priority"],
                  btnText: "Emergency Call",
                  danger: true
                }
              ].map((service, idx) => (
                <Card key={idx} className={`rounded-[2rem] border-gray-50 overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group ${service.primary ? 'bg-black text-white' : 'bg-gray-50'}`}>
                  <CardContent className="p-8 sm:p-12 space-y-8">
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 duration-500 ${service.danger ? 'bg-red-600' : service.primary ? 'bg-white/10' : 'bg-black'}`}>
                        {service.icon}
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tighter ${service.primary ? 'text-white' : 'text-black'}`}>{service.title}</h3>
                    </div>
                    
                    <p className={`text-sm sm:text-base leading-relaxed font-medium ${service.primary ? 'text-gray-400' : 'text-gray-500'}`}>
                      {service.desc}
                    </p>
                    
                    <div className="space-y-4">
                      {service.items.map((item, i) => (
                        <div key={i} className="flex items-center">
                          <CheckCircle className={`w-4 h-4 mr-3 ${service.primary ? 'text-white' : 'text-green-600'}`} />
                          <span className="text-xs sm:text-sm font-bold tracking-tight">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {service.badges.map((badge, i) => (
                        <Badge key={i} variant="secondary" className={`px-4 py-2 rounded-xl text-[8px] sm:text-[10px] uppercase font-black tracking-widest border-none ${service.primary ? 'bg-white/10 text-white' : 'bg-white text-gray-400'}`}>
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <Button className={`w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-all cursor-pointer ${service.danger ? 'bg-red-600 hover:bg-red-700 text-white' : service.primary ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800 shadow-xl shadow-black/10'}`}>
                      {service.btnText}
                      {service.danger ? <Phone className="ml-2 w-4 h-4" /> : <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                  </CardContent>
                </Card>
              ))}
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
        <section className="py-20 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-24">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black mb-4 uppercase tracking-tighter sm:leading-tight">Our Service Process</h2>
              <p className="text-lg sm:text-xl text-gray-400 font-medium">Simple, transparent, and built for your convenience</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-6">
              {[
                { step: "1", title: "Consultation", desc: "Understanding your needs through a free initial talk." },
                { step: "2", title: "Assessment", desc: "Detailed evaluation and custom solution design." },
                { step: "3", title: "Installation", desc: "Expert setup with professional-grade materials." },
                { step: "4", title: "Support", desc: "Maintenance to ensure optimal performance." }
              ].map((item, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-black group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-sm group-hover:shadow-xl group-hover:shadow-black/10">
                    <span className="font-black text-2xl tracking-tighter">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-black text-black mb-2 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
