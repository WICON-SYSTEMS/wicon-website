import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Zap,
  Sun,
  Wrench,
  Camera,
  Shield,
  Smartphone,
  Wifi,
  DollarSign,
  Home,
  Building,
  CheckCircle,
  ArrowRight,
  Brain,
  Cpu,
  Activity,
  Lightbulb,
  Thermometer,
  Clock,
  Target,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore WiCon AI and our smart electrical solutions: wireless controllers, solar PV, CCTV, and automation for homes and businesses.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-10 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Smart Electrical Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI-powered electrical systems designed for you.
              Experience the future of smart home automation with WiCon AI -
              intelligent control that learns, adapts, and operates without your
              intervention.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-black border border-gray-300 rounded-lg px-6 py-3 inline-flex items-center gap-3">
                <Brain className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">
                  Powered by WiCon AI Technology
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* WiCon AI Feature Section */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mr-4">
                    <Brain className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-2">
                      WiCon AI
                    </h2>
                    <p className="text-gray-300 text-lg">
                      Artificial Intelligence for Smart Homes
                    </p>
                  </div>
                </div>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Let WiCon's Artificial Intelligence take control of your smart
                  home, regulating and switching without your intervention.
                  Experience true automation that learns your patterns and
                  optimizes your electrical systems automatically.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Cpu className="w-5 h-5 text-white mr-2" />
                      <span className="font-semibold">Smart Learning</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      AI learns your daily routines and preferences
                    </p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Activity className="w-5 h-5 text-white mr-2" />
                      <span className="font-semibold">Auto Regulation</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Automatically adjusts settings for optimal efficiency
                    </p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Target className="w-5 h-5 text-white mr-2" />
                      <span className="font-semibold">Predictive Control</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Anticipates needs before you realize them
                    </p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-5 h-5 text-white mr-2" />
                      <span className="font-semibold">Zero Intervention</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Operates seamlessly in the background
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      WiCon AI Features
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                        <CheckCircle className="w-5 h-5 text-black" />
                      </div>
                      <span>Intelligent lighting control</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                        <CheckCircle className="w-5 h-5 text-black" />
                      </div>
                      <span>Adaptive temperature management</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                        <CheckCircle className="w-5 h-5 text-black" />
                      </div>
                      <span>Energy optimization algorithms</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                        <CheckCircle className="w-5 h-5 text-black" />
                      </div>
                      <span>Predictive maintenance alerts</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                        <CheckCircle className="w-5 h-5 text-black" />
                      </div>
                      <span>Behavioral pattern recognition</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WiCon Wireless Controllers with AI */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                WiCon Controller System
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The complete smart electrical control solution powered by WiCon
                AI technology
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-black">
                      WiCon Wireless Controllers
                    </h3>
                    <p className="text-gray-600 font-medium">
                      Enhanced with AI Intelligence
                    </p>
                  </div>
                </div>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Revolutionary wireless control system enhanced with WiCon AI
                  for intelligent automation. Experience remote switching,
                  monitoring, and safety management that learns and adapts to
                  your needs.
                </p>
                <Tabs defaultValue="ai-features" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-2">
                    <TabsTrigger className="cursor-pointer" value="ai-features">
                      AI Features
                    </TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="features">
                      Core Features
                    </TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="benefits">
                      Benefits
                    </TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="specs">
                      Specifications
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="ai-features" className="space-y-4">
                    <div className="flex items-center">
                      <Brain className="w-5 h-5 text-black mr-3" />
                      <span>
                        <strong>WiCon AI Integration:</strong> Intelligent
                        automation without intervention
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Lightbulb className="w-5 h-5 text-gray-600 mr-3" />
                      <span>Smart lighting that adapts to your schedule</span>
                    </div>
                    <div className="flex items-center">
                      <Thermometer className="w-5 h-5 text-gray-600 mr-3" />
                      <span>Intelligent climate control optimization</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-600 mr-3" />
                      <span>Predictive scheduling based on usage patterns</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="w-5 h-5 text-gray-600 mr-3" />
                      <span>
                        Proactive energy management and cost reduction
                      </span>
                    </div>
                  </TabsContent>
                  <TabsContent value="features" className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span>Remote switching via smartphone app</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span>Real-time safety monitoring</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span>Automatic fault detection</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span>Energy consumption tracking</span>
                    </div>
                  </TabsContent>
                  <TabsContent value="benefits" className="space-y-4">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-green-600 mr-3" />
                      <span>Reduce electricity costs by up to 30%</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-green-600 mr-3" />
                      <span>Enhanced electrical safety</span>
                    </div>
                    <div className="flex items-center">
                      <Smartphone className="w-5 h-5 text-green-600 mr-3" />
                      <span>Control from anywhere</span>
                    </div>
                    <div className="flex items-center">
                      <Wifi className="w-5 h-5 text-green-600 mr-3" />
                      <span>Easy installation and setup</span>
                    </div>
                  </TabsContent>
                  <TabsContent value="specs" className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Range:</span> Up to 1km
                      </div>
                      <div>
                        <span className="font-semibold">Power:</span> 220V/380V
                      </div>
                      <div>
                        <span className="font-semibold">Load:</span> Up to 100A
                      </div>
                      <div>
                        <span className="font-semibold">Protocol:</span>{" "}
                        LoRa/WiFi
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <div>
                <img
                  src="/wicon-box.png"
                  alt="WiCon Wireless Controller"
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Solar PV Systems */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="/cctv-security.jpg"
                  alt="CCTV Security System"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-black">
                    CCTV Security Systems
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Protect your property with reliable surveillance solutions. We
                  design and install CCTV systems with HD/4K cameras, remote
                  viewing, and smart motion detection for homes and businesses
                  across Cameroon.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <Home className="w-8 h-8 text-black mb-3" />
                      <h3 className="font-bold text-black mb-2">
                        Residential Packages
                      </h3>
                      <p className="text-sm text-gray-600">
                        Indoor/outdoor cameras, DVR/NVR, mobile viewing
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <Building className="w-8 h-8 text-black mb-3" />
                      <h3 className="font-bold text-black mb-2">
                        Commercial Solutions
                      </h3>
                      <p className="text-sm text-gray-600">
                        Multi-site monitoring, VMS, cloud backup options
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span>HD/4K cameras with wide dynamic range</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span>Weatherproof outdoor camera options (IP66+)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span>Smart motion detection and alerts</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span>Remote access via secure mobile apps</span>
                  </div>
                </div>
                <Button className="bg-black text-white hover:bg-gray-800">
                  Get Security Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Electrical Wiring & CCTV */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Electrical Wiring */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                      <Wrench className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">
                      Electrical Wiring Services
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600">
                    Professional domestic electrical installations meeting
                    international safety standards and Cameroon electrical
                    codes.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Complete house wiring</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">
                        Circuit breaker installation
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Grounding systems</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Safety inspections</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Certified Technicians</Badge>
                    <Badge variant="secondary">Code Compliant</Badge>
                    <Badge variant="secondary">Warranty Included</Badge>
                  </div>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full bg-transparent">
                      Request Service
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* CCTV Security */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">
                      CCTV Security Systems
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600">
                    Advanced security camera systems with remote monitoring
                    capabilities, perfect for homes and businesses in Cameroon.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">HD/4K camera options</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Night vision capability</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Mobile app monitoring</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Cloud storage options</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Remote Access</Badge>
                    <Badge variant="secondary">Motion Detection</Badge>
                    <Badge variant="secondary">24/7 Recording</Badge>
                  </div>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full bg-transparent">
                      Get Security Quote
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-black" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the Future with WiCon AI
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your home or business with intelligent electrical
              systems that think, learn, and adapt. Contact our experts for a
              free consultation and discover how WiCon AI can revolutionize your
              electrical experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-300 px-8 py-3 cursor-pointer"
                >
                  Get Free Consultation
                </Button>
              </Link>
              <Link href="tel:+237674802971">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-3 bg-transparent cursor-pointer"
                >
                  Call +237 674802971
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
