import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import {
  Users,
  Target,
  Eye,
  Award,
  MapPin,
  Calendar,
  CheckCircle,
  HeartHandshake,
  Lightbulb,
  Sparkles,
} from "lucide-react"
import styles from "../page.module.css";
import RevealOnScroll from "@/components/reveal-on-scroll"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about WiCon Systems – our mission, vision, values, and the team powering smart automation in Cameroon.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <RevealOnScroll />
        {/* Hero Section */}
        <section data-reveal
          className={`bg-gradient-to-b from-gray-50 to-white pt-10 sm:pt-20 ${styles.reveal}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-24">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black mb-6 uppercase tracking-tighter sm:leading-tight">About WiCon Systems</h1>
              <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
                Pioneering smart technology solutions in Cameroon. Professional installation and seamless control—for 
                unmatched comfort and peace of mind.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section data-reveal
          className={`pb-20 bg-white ${styles.reveal}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
              <div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black mb-6 uppercase tracking-tighter leading-tight">Our Story</h2>
                <p className="text-base sm:text-lg text-gray-500 mb-6 leading-relaxed font-medium">
                  Founded in 2014 in Buea, Southwest Region, Cameroon, WiCon Systems emerged from a vision to
                  revolutionize electrical control and safety in our region. Our founders recognized the unique
                  challenges faced by businesses and homeowners in managing electrical systems safely and efficiently.
                </p>
                <p className="text-base sm:text-lg text-gray-500 mb-8 leading-relaxed font-medium">
                  What started as a small electrical construction company has grown into a leading provider of
                  innovative wireless control solutions, solar energy systems, and comprehensive electrical services.
                  We've built our reputation on reliability, safety, and deep understanding of Cameroon's electrical
                  infrastructure needs.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="px-5 py-2.5 rounded-xl border-none bg-gray-50 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                    <Calendar className="w-3.5 h-3.5 mr-2" />
                    Founded 2014
                  </Badge>
                  <Badge variant="secondary" className="px-5 py-2.5 rounded-xl border-none bg-gray-50 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                    <MapPin className="w-3.5 h-3.5 mr-2" />
                    Buea, Cameroon
                  </Badge>
                  <Badge variant="secondary" className="px-5 py-2.5 rounded-xl border-none bg-gray-50 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                    <Users className="w-3.5 h-3.5 mr-2" />
                    2-10 Employees
                  </Badge>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gray-50 rounded-3xl -z-10 rotate-1"></div>
                <img
                  src="/wicon-body.png"
                  alt="WiCon Systems Team"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Purpose, Brand Vision, Brand Values */}
        <section data-reveal
          className={`py-20 sm:py-32 bg-gray-50 ${styles.reveal}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
              <Card className="bg-white border-white rounded-[2rem] shadow-2xl shadow-black/[0.03] overflow-hidden group hover:shadow-black/[0.05] transition-all duration-500">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-xl shadow-black/10">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-black mb-6 uppercase tracking-tighter">Our Purpose</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    Protection and comfort for the home, peace for the mind. We don’t just make homes secure; we make
                    people feel more secure too. If you’ve chosen WiCon, you can get on and enjoy your life.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-black border-black rounded-[2rem] shadow-2xl shadow-black/20 overflow-hidden group transition-all duration-500 scale-105 z-10">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 -rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-xl">
                    <Eye className="w-10 h-10 text-black" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-6 uppercase tracking-tighter">Brand Vision</h3>
                  <p className="text-gray-400 leading-relaxed font-medium">
                    To be Africa’s most trusted brand in home comfort. In many cities of Cameroon, WiCon is already
                    another name for comfort and security. We’re aiming higher—to be the most trusted brand in our
                    field.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-white rounded-[2rem] shadow-2xl shadow-black/[0.03] overflow-hidden group hover:shadow-black/[0.05] transition-all duration-500">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-xl shadow-black/10">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-black mb-6 uppercase tracking-tighter">Brand Values</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    Passionately improving lives across Africa. Life is easier when
                    your home is comfortable and secure. We make
                    day‑to‑day life simpler, so our customers can go out and chase their dreams.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features of the Service */}
        <section data-reveal
          className={`py-20 sm:py-32 bg-white ${styles.reveal}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-24">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black uppercase tracking-tighter leading-tight">Key Features of Service</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
              <Card className="bg-gray-50 border-transparent rounded-[2rem] overflow-hidden group hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <HeartHandshake className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-black mb-4 uppercase tracking-tighter">Customers First</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    Understanding what matters most to our customers is the key to our
                    success. We listen, learn, and deliver.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-transparent rounded-[2rem] overflow-hidden group hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Lightbulb className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-black mb-4 uppercase tracking-tighter">Innovation</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    Integrating our products into smart homes and platforms—making
                    life more convenient without compromise.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-transparent rounded-[2rem] overflow-hidden group hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-black mb-4 uppercase tracking-tighter">Seamless</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    Every interaction with WiCon should be easy—from
                    how customers buy from us to how our products serve them.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section data-reveal
          className={`py-20 sm:py-32 bg-white ${styles.reveal}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-24">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black mb-4 uppercase tracking-tighter sm:leading-tight">Meet Our Team</h2>
              <p className="text-lg sm:text-xl text-gray-400 font-medium">
                Certified professionals dedicated to delivering excellence
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
              <Card className="bg-white border-gray-50 rounded-[2rem] text-center overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group">
                <CardContent className="p-8 sm:p-12">
                  <div className="relative inline-block mb-8">
                    <div className="absolute -inset-2 bg-gray-50 rounded-full -z-10 rotate-12 group-hover:rotate-0 transition-transform duration-500"></div>
                    <img
                      src="/placeholder.svg?height=200&width=200&text=CEO"
                      alt="CEO"
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto object-cover border-4 border-white shadow-xl"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-black mb-2 uppercase tracking-tight">Engr. Akum Bate</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Founder & CEO</p>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    Electrical Engineer with 15+ years experience in power systems and wireless technology.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-50 rounded-[2rem] text-center overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group">
                <CardContent className="p-8 sm:p-12">
                  <div className="relative inline-block mb-8">
                    <div className="absolute -inset-2 bg-gray-50 rounded-full -z-10 -rotate-12 group-hover:rotate-0 transition-transform duration-500"></div>
                    <img
                      src="/placeholder.svg?height=200&width=200&text=CTO"
                      alt="CTO"
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto object-cover border-4 border-white shadow-xl"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-black mb-2 uppercase tracking-tight">Sarah Mballa</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Chief Tech Officer</p>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    Electronics specialist focused on developing innovative wireless control solutions.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-50 rounded-[2rem] text-center overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group">
                <CardContent className="p-8 sm:p-12">
                  <div className="relative inline-block mb-8">
                    <div className="absolute -inset-2 bg-gray-50 rounded-full -z-10 rotate-45 group-hover:rotate-0 transition-transform duration-500"></div>
                    <img
                      src="/placeholder.svg?height=200&width=200&text=Lead+Tech"
                      alt="Lead Technician"
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto object-cover border-4 border-white shadow-xl"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-black mb-2 uppercase tracking-tight">Paul Talla</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Lead Technician</p>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    Certified electrician with expertise in solar PV systems and security installations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Areas & Statistics */}
        <section data-reveal
          className={`py-20 sm:py-32 bg-gray-50 ${styles.reveal}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20">
              <div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black mb-8 uppercase tracking-tighter leading-tight">Service Areas</h2>
                <p className="text-base sm:text-lg text-gray-500 mb-10 leading-relaxed font-medium">
                  We proudly serve the Southwest Region of Cameroon, with our headquarters in Buea and service coverage
                  extending throughout the region.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    "Buea (Headquarters)",
                    "Limbe",
                    "Tiko",
                    "Kumba",
                    "Mamfe"
                  ].map((area, idx) => (
                    <div key={idx} className="flex items-center group">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-4 group-hover:bg-green-500 transition-colors duration-300">
                        <CheckCircle className="w-4 h-4 text-green-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-gray-700 font-bold tracking-tight text-sm sm:text-base">
                        {area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 sm:p-12 rounded-[2rem] shadow-2xl shadow-black/[0.03]">
                <h2 className="text-2xl sm:text-3xl font-black text-black mb-10 uppercase tracking-tighter text-center">Our Impact</h2>
                <div className="grid grid-cols-2 gap-8 sm:gap-12">
                  <div className="text-center">
                    <div className="text-3xl sm:text-5xl font-black text-black mb-2 tracking-tighter">10+</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-5xl font-black text-black mb-2 tracking-tighter">500+</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Projects done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-5xl font-black text-black mb-2 tracking-tighter">100+</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-5xl font-black text-black mb-2 tracking-tighter">24/7</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Support</div>
                  </div>
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
