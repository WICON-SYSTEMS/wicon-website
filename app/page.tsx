import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import styles from "./page.module.css";
import { Card, CardContent } from "@/components/ui/card";
import RevealOnScroll from "@/components/reveal-on-scroll";
import {
  Shield,
  DollarSign,
  Users,
  Zap,
  Sun,
  Camera,
  Wrench,
  Star,
  ArrowRight,
  CheckCircle,
  Code,
  Cpu,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Scroll reveal controller for this page only */}
        <RevealOnScroll />
        {/* Hero Section */}
        <section
          data-reveal
          className={`bg-gradient-to-b from-gray-50 to-white pt-10 ${styles.reveal}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="leading-tight mb-6">
                  <span
                    className={`block font-extrabold tracking-tight text-black ${styles.fadeUp}`}
                    style={{ lineHeight: 1.05 }}
                  >
                    <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                      WiCon
                    </span>
                  </span>
                  <span
                    className={`mt-2 block font-semibold text-gray-800 tracking-tight ${styles.fadeUp} ${styles.delay1}`}
                  >
                    <span className="text-2xl md:text-5xl lg:text-5xl">
                      &quot;Pioneering Smart Home Technology Solutions&quot;
                    </span>
                  </span>
                  {/* <span className={`mt-3 inline-block ${styles.underline} ${styles.delay2}`} aria-hidden="true" /> */}
                </h1>
                <p
                  className={`text-xl text-gray-600 mb-8 leading-relaxed ${styles.fadeUp} ${styles.delay3}`}
                >
                  From wireless electrical control to custom software and IoT
                  solutions. Reduce costs, improve efficiency, and digitally
                  transform your business with WiCon's innovative technology
                  solutions.
                </p>
                <div
                  className={`flex flex-col sm:flex-row gap-4 ${styles.fadeUp} ${styles.delay4}`}
                >
                  <Link href="/solutions">
                    <Button
                      size="lg"
                      className="bg-black text-white hover:bg-gray-700 px-8 py-3 cursor-pointer"
                    >
                      View Solutions
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-black text-black hover:bg-black hover:text-white px-8 py-3 bg-transparent cursor-pointer"
                    >
                      Get Free Consultation
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                {/* Soft round shadow below */}
                <div
                  className={`pointer-events-none absolute inset-x-0 -bottom-4 mx-auto h-6 w-2/3 rounded-full bg-black/10 blur-xl ${styles.shadowPulse}`}
                ></div>
                <img
                  src="/wicon-hero.png"
                  alt="WiCon Technology Solutions"
                  className={`w-full h-auto rounded-lg  will-change-transform ${styles.floatY}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section
          data-reveal
          className={`py-5 md:py-20 bg-white ${styles.reveal}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-16`}>
              <h2
                data-reveal
                className={`text-3xl md:text-4xl font-bold text-black mb-4 ${styles.reveal}`}
              >
                Why Choose WiCon Systems?
              </h2>
              <p
                data-reveal
                className={`text-xl text-gray-600 max-w-3xl mx-auto ${styles.reveal} ${styles.st1}`}
              >
                Over 10 years of expertise delivering safe, reliable, and
                innovative technology solutions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card
                data-reveal
                className={`border-gray-200 hover:shadow-lg transition-shadow ${styles.reveal}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">
                    Safe & Reliable Technology
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Advanced safety monitoring, reliable wireless technology,
                    and robust software solutions ensure your systems operate
                    safely and efficiently at all times.
                  </p>
                </CardContent>
              </Card>
              <Card
                data-reveal
                className={`border-gray-200 hover:shadow-lg transition-shadow ${styles.reveal} ${styles.st1}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">
                    Cost-Effective Digital Solutions
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Reduce operational costs with smart control systems, custom
                    software solutions, and IoT automation that optimize
                    processes and prevent costly failures.
                  </p>
                </CardContent>
              </Card>
              <Card
                data-reveal
                className={`border-gray-200 hover:shadow-lg transition-shadow ${styles.reveal} ${styles.st2}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">
                    Expert Development & Support
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Professional installation and custom software development by
                    certified technicians and developers with ongoing support
                    throughout Southwest Region, Cameroon.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section data-reveal className={`py-20 bg-gray-50 ${styles.reveal}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                data-reveal
                className={`text-3xl md:text-4xl font-bold text-black mb-4 ${styles.reveal}`}
              >
                Our Technology Solutions & Services
              </h2>
              <p
                data-reveal
                className={`text-xl text-gray-600 ${styles.reveal} ${styles.st1}`}
              >
                Complete electrical, software, and IoT solutions for residential
                and commercial needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card
                data-reveal
                className={`bg-white border-gray-200 hover:shadow-lg transition-shadow ${styles.reveal}`}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">
                    WiCon Wireless Controllers
                  </h3>
                  <p className="text-gray-600">
                    Control lighting, power, and systems wirelessly with
                    reliable, secure controllers.
                  </p>
                </CardContent>
              </Card>
              <Card
                data-reveal
                className={`bg-white border-gray-200 hover:shadow-lg transition-shadow ${styles.reveal} ${styles.st1}`}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">
                    Custom Software Solutions
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Tailored software applications, web platforms, and mobile
                    apps to digitize and streamline your business operations.
                  </p>
                </CardContent>
              </Card>
              <Card
                data-reveal
                className={`bg-white border-gray-200 hover:shadow-lg transition-shadow ${styles.reveal} ${styles.st2}`}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">
                    IoT Solutions
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Smart sensors, connected devices, and automation systems for
                    intelligent monitoring and control.
                  </p>
                </CardContent>
              </Card>
              {/* <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                    <Sun className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">Solar PV Systems</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Complete domestic solar installations with smart monitoring for energy independence and cost
                    savings.
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Learn More
                  </Button>
                </CardContent>
              </Card> */}
              <Card
                data-reveal
                className={`bg-white border-gray-200 hover:shadow-lg transition-shadow ${styles.reveal} ${styles.st3}`}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">
                    Electrical Wiring
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Professional domestic electrical installations meeting all
                    safety standards with smart home integration.
                  </p>
                </CardContent>
              </Card>
              <Card
                data-reveal
                className={`bg-white border-gray-200 hover:shadow-lg transition-shadow ${styles.reveal} ${styles.st4}`}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">
                    CCTV Security Systems
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Advanced security camera systems with AI-powered monitoring
                    and mobile app integration.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* WiCon SMART HOME SOLUTION FOR DIGITAL EDUCATION Banner */}
        <section
          data-reveal
          className={`py-10 bg-black text-white ${styles.reveal}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div
                  data-reveal
                  className={`flex items-center md:items-center mb-4 ${styles.reveal}`}
                >
                  {/* <GraduationCap className="w-15 h-15 mr-3 text-white" /> */}
                  <img
                    src="/training-logo-removebg-preview.png"
                    className="w-25 h-15 mr-3"
                    alt="training-logo"
                  />
                  <h2
                    data-reveal
                    className={`text-2xl font-bold ${styles.reveal}`}
                  >
                    WiCon SMART HOME SOLUTION FOR DIGITAL EDUCATION
                  </h2>
                </div>
                <p
                  data-reveal
                  className={`text-xl text-gray-300 mb-6 ${styles.reveal} ${styles.st1}`}
                >
                  Join our annual training program and master software
                  development, IoT solutions, and WiCon controller technology.
                  Limited to 50 participants.
                </p>
                <div
                  data-reveal
                  className={`flex flex-col sm:flex-row gap-4 ${styles.reveal} ${styles.st2}`}
                >
                  <Button
                    className="bg-white text-black hover:bg-gray-200"
                    asChild
                  >
                    <a href="/training">
                      Learn More About the Training Program
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                    asChild
                  >
                    <a href="/training#registration">Register for 2025</a>
                  </Button>
                </div>
              </div>
              <div
                data-reveal
                className={`text-center lg:text-right ${styles.reveal} ${styles.st1}`}
              >
                <div className="inline-block bg-gray-900 rounded-lg p-6">
                  <div className="text-3xl font-bold text-white mb-2">
                    October 2025
                  </div>
                  <div className="text-gray-300 mb-4">
                    4 Weeks Intensive Program
                  </div>
                  <div className="flex justify-center lg:justify-end space-x-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-white">Software</div>
                      <div className="text-gray-400">Development</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-white">IoT</div>
                      <div className="text-gray-400">Solutions</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-white">WiCon</div>
                      <div className="text-gray-400">Controllers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose WiCon Section */}
        <section data-reveal className={`py-20 bg-white ${styles.reveal}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  data-reveal
                  className={`text-3xl md:text-4xl font-bold text-black mb-6 ${styles.reveal}`}
                >
                  Trusted Technology Partner Since 2014
                </h2>
                <p
                  data-reveal
                  className={`text-lg text-gray-600 mb-8 ${styles.reveal} ${styles.st1}`}
                >
                  With over a decade of experience in electrical construction,
                  software development, and IoT solutions, WiCon Systems has
                  become the trusted technology partner for businesses and
                  homeowners across Southwest Region, Cameroon.
                </p>
                <div
                  data-reveal
                  className={`space-y-4 ${styles.reveal} ${styles.st2}`}
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">
                      10+ Years of Technology Innovation
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">
                      Certified Technicians & Developers
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">
                      24/7 Technical Support Available
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">
                      Local Understanding of Cameroon's Digital Needs
                    </span>
                  </div>
                </div>
              </div>
              <div data-reveal className={`${styles.reveal} ${styles.st1}`}>
                <img
                  src="/wicon-body.png"
                  alt="WiCon Systems Technology Team"
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trusted Clients Section */}
        <section data-reveal className={`py-20 bg-gray-50 ${styles.reveal}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                data-reveal
                className={`text-3xl md:text-4xl font-bold text-black mb-4 ${styles.reveal}`}
              >
                Trusted by Leading Organizations
              </h2>
              <p
                data-reveal
                className={`text-xl text-gray-600 ${styles.reveal} ${styles.st1}`}
              >
                Proud to serve educational institutions, businesses, and
                organizations across Southwest Region
              </p>
            </div>
            <div
              data-reveal
              className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ${styles.reveal} ${styles.st2}`}
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center min-h-[100px]">
                <p className="text-center font-semibold text-gray-800 text-sm">
                  BUEA INSTITUTE OF TECHNOLOGY
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center min-h-[100px]">
                <p className="text-center font-semibold text-gray-800 text-sm">
                  HOTPEC ORPHANAGE
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center min-h-[100px]">
                <p className="text-center font-semibold text-gray-800 text-sm">
                  GTHS BIMBIA
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center min-h-[100px]">
                <p className="text-center font-semibold text-gray-800 text-sm">
                  FULL GOSPEL MISSION KWE-KWE MUYUKA
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center min-h-[100px]">
                <p className="text-center font-semibold text-gray-800 text-sm">
                  LONGAS LOUNGE
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center min-h-[100px]">
                <p className="text-center font-semibold text-gray-800 text-sm">
                  NETWORK RESTAURANT
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center min-h-[100px]">
                <p className="text-center font-semibold text-gray-800 text-sm">
                  Rhika's Garden
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center min-h-[100px]">
                <p className="text-center font-semibold text-gray-800 text-sm">
                  AMAXON COMPLEX
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center min-h-[100px]">
                <p className="text-center font-semibold text-gray-800 text-sm">
                  TTNET
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center min-h-[100px]">
                <p className="text-center font-semibold text-gray-800 text-sm">
                  ISUME MBUA
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <p
                data-reveal
                className={`text-gray-600 text-lg ${styles.reveal}`}
              >
                Join these satisfied clients who trust WiCon Systems for their
                electrical needs
              </p>
              <Link href="/contact">
                <Button className="mt-6 bg-black text-white hover:bg-gray-800 px-8 py-3">
                  Become Our Next Success Story
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section data-reveal className={`pb-20 bg-gray-50 ${styles.reveal}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                data-reveal
                className={`text-3xl md:text-4xl font-bold text-black mb-4 ${styles.reveal}`}
              >
                What Our Clients Say
              </h2>
              <p
                data-reveal
                className={`text-xl text-gray-600 ${styles.reveal} ${styles.st1}`}
              >
                Trusted by businesses and homeowners across Cameroon
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card
                data-reveal
                className={`bg-white border-gray-200 ${styles.reveal}`}
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "WiCon's wireless controllers have revolutionized how we
                    manage our facility's electrical systems. The cost savings
                    and safety improvements are remarkable."
                  </p>
                  <div>
                    <p className="font-semibold text-black">Jean-Paul Mbarga</p>
                    <p className="text-sm text-gray-500">
                      Factory Manager, Buea
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "The automated system installation was professional and
                    efficient. Our electricity bills have dropped significantly,
                    and the system works perfectly even during rainy season."
                  </p>
                  <div>
                    <p className="font-semibold text-black">Marie Fotso</p>
                    <p className="text-sm text-gray-500">Homeowner, Limbe</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "Excellent service and support. The CCTV system gives us
                    peace of mind, and their team is always available when we
                    need assistance."
                  </p>
                  <div>
                    <p className="font-semibold text-black">
                      Dr. Emmanuel Tabi
                    </p>
                    <p className="text-sm text-gray-500">Clinic Owner, Tiko</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section
          data-reveal
          className={`py-20 bg-black text-white ${styles.reveal}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              data-reveal
              className={`text-3xl md:text-4xl font-bold mb-4 ${styles.reveal}`}
            >
              Ready to Transform Your Business with Technology?
            </h2>
            <p
              data-reveal
              className={`text-xl text-gray-300 mb-8 max-w-3xl mx-auto ${styles.reveal} ${styles.st1}`}
            >
              Get a free consultation for your electrical, software, or IoT
              project. Our technology experts are ready to help you find the
              perfect digital solution for your needs.
            </p>
            <div
              data-reveal
              className={`flex flex-col sm:flex-row gap-4 justify-center ${styles.reveal} ${styles.st2}`}
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-300 px-8 py-3 cursor-pointer"
                >
                  Get Free Consultation
                </Button>
              </Link>
              <Link href="tel:+237670791815">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-3 bg-transparent cursor-pointer"
                >
                  Call +237 670791815
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
