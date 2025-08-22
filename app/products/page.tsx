import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">Our Products & Solutions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive electrical solutions designed for Cameroon's unique needs. From wireless controllers to
              solar systems, we provide cutting-edge technology with reliable support.
            </p>
          </div>
        </section>

        {/* WiCon Wireless Controllers */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-black">WiCon Wireless Controllers</h2>
                </div>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Revolutionary wireless control system that allows remote switching, monitoring, and safety management
                  of electrical facilities. Perfect for both residential and commercial applications.
                </p>
                <Tabs defaultValue="features" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-2">
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                    <TabsTrigger value="specs">Specifications</TabsTrigger>
                  </TabsList>
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
                        <span className="font-semibold">Protocol:</span> LoRa/WiFi
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

        {/* Solar PV Systems */
        }
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
                  <h2 className="text-3xl md:text-4xl font-bold text-black">CCTV Security Systems</h2>
                </div>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Protect your property with reliable surveillance solutions. We design and install CCTV systems with
                  HD/4K cameras, remote viewing, and smart motion detection for homes and businesses across Cameroon.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <Home className="w-8 h-8 text-black mb-3" />
                      <h3 className="font-bold text-black mb-2">Residential Packages</h3>
                      <p className="text-sm text-gray-600">Indoor/outdoor cameras, DVR/NVR, mobile viewing</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <Building className="w-8 h-8 text-black mb-3" />
                      <h3 className="font-bold text-black mb-2">Commercial Solutions</h3>
                      <p className="text-sm text-gray-600">Multi-site monitoring, VMS, cloud backup options</p>
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
                    <CardTitle className="text-2xl">Electrical Wiring Services</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600">
                    Professional domestic electrical installations meeting international safety standards and Cameroon
                    electrical codes.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Complete house wiring</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">Circuit breaker installation</span>
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
                  <Button variant="outline" className="w-full bg-transparent">
                    Request Service
                  </Button>
                </CardContent>
              </Card>

              {/* CCTV Security */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">CCTV Security Systems</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600">
                    Advanced security camera systems with remote monitoring capabilities, perfect for homes and
                    businesses in Cameroon.
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
                  <Button variant="outline" className="w-full bg-transparent">
                    Get Security Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Upgrade Your Electrical Systems?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Contact our experts for a free consultation and customized quote for your electrical project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-300 px-8 py-3 cursor-pointer">
                Get Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-3 bg-transparent cursor-pointer"
              >
                Call +237 670791815
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
