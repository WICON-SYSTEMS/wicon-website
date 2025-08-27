import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Shield,
  AlertTriangle,
  CheckCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function ElectricalSafetyBlogPost() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <div className="mb-8">
              <Badge className="mb-4 bg-red-100 text-red-800 hover:bg-red-200">
                Safety
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                Electrical Safety in Tropical Climates
              </h1>
              <div className="flex items-center text-gray-600 mb-6 flex-wrap gap-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Engr. Ekulle Joseph Marrion</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>August 15, 2025</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>6 min read</span>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Living in tropical regions like Buea brings unique electrical
                safety challenges. High humidity, heavy rainfall, and frequent
                thunderstorms require special precautions to protect your family
                and property.
              </p>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <div className="mb-12">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Living in tropical regions like Buea means enjoying warmth and
                  rain, but it also brings unique electrical safety challenges.
                  High humidity, heavy rainfall, and frequent thunderstorms can
                  create dangerous situations if electrical systems aren't
                  handled properly.
                </p>
              </div>

              {/* Common Risks */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Common Risks in Tropical Climates
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                        <h3 className="text-xl font-semibold text-red-800">
                          Moisture & Humidity
                        </h3>
                      </div>
                      <p className="text-red-700">
                        Increase the risk of electrical shocks and accelerate
                        corrosion of wiring and components.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Zap className="w-6 h-6 text-orange-600 mr-3" />
                        <h3 className="text-xl font-semibold text-orange-800">
                          Lightning Strikes
                        </h3>
                      </div>
                      <p className="text-orange-700">
                        Frequent storms cause dangerous power surges that can
                        damage appliances and create fire hazards.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Shield className="w-6 h-6 text-yellow-600 mr-3" />
                        <h3 className="text-xl font-semibold text-yellow-800">
                          Overheating
                        </h3>
                      </div>
                      <p className="text-yellow-700">
                        Hot weather can overload appliances and cause electrical
                        components to fail prematurely.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <AlertTriangle className="w-6 h-6 text-purple-600 mr-3" />
                        <h3 className="text-xl font-semibold text-purple-800">
                          Faulty Wiring
                        </h3>
                      </div>
                      <p className="text-purple-700">
                        Damp conditions worsen existing wiring problems and
                        create new safety hazards.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Safety Practices */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Safety Practices Every Home Needs
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Protecting your family and property requires implementing
                  these essential safety measures:
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start p-6 bg-green-50 border border-green-200 rounded-lg">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-800 mb-2">
                        Proper Grounding
                      </h3>
                      <p className="text-green-700">
                        Prevents dangerous electrical shocks during power surges
                        and provides a safe path for excess electricity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">
                        Surge Protectors
                      </h3>
                      <p className="text-blue-700">
                        Safeguard expensive appliances from lightning strikes
                        and power fluctuations common during storms.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-purple-800 mb-2">
                        Waterproof Sockets
                      </h3>
                      <p className="text-purple-700">
                        Essential for outdoor use and areas exposed to moisture,
                        preventing short circuits and electrocution.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-orange-800 mb-2">
                        Regular Inspections
                      </h3>
                      <p className="text-orange-700">
                        Check wiring and connections every few months to catch
                        problems before they become dangerous.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example in Buea */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Real Example in Buea
                </h2>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    <strong>Case Study:</strong> During the rainy season, sudden
                    blackouts often cause appliances to blow when power returns.
                    A surge protector or stabilizer can save TVs, refrigerators,
                    and laptops from expensive damage.
                  </p>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  One family in Buea saved over 200,000 CFA in appliance
                  replacement costs by installing surge protectors before the
                  rainy season. The small investment in protection prevented
                  major losses during power fluctuations.
                </p>
              </div>

              {/* Safety Checklist */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Homeowner Safety Checklist
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Use this checklist to ensure your home meets tropical climate
                  safety standards:
                </p>

                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-800">
                        Never overload electrical sockets
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-800">
                        Keep electrical cords away from water sources
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-800">
                        Switch off and unplug devices during heavy storms
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-800">
                        Call a qualified technician for repairs—never attempt
                        DIY electrical work
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-800">
                        Install GFCI outlets in bathrooms and outdoor areas
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-800">
                        Test smoke detectors monthly and replace batteries
                        annually
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conclusion */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Conclusion
                </h2>
                <div className="bg-black text-white p-8 rounded-lg">
                  <p className="text-lg leading-relaxed mb-4">
                    Electrical safety in tropical regions is about prevention,
                    not reaction. By taking simple steps, families can stay safe
                    while extending the life of their appliances.
                  </p>
                  <p className="text-xl font-semibold">
                    Safe electricity = safe homes.
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center py-12 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Need Professional Electrical Safety Assessment?
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Contact WiCon Systems for a comprehensive electrical safety
                  inspection and upgrade recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                    <Link href="/contact">Schedule Safety Inspection</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-gray-50 px-8 py-3"
                  >
                    <Link href="/services">View Safety Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
