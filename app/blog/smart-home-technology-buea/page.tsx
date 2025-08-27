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
  Home,
  Smartphone,
  Shield,
  TrendingUp,
  Wifi,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

export default function SmartHomeBlogPost() {
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
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                Smart Home
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                Smart Home Technology in Buea
              </h1>
              <div className="flex items-center text-gray-600 mb-6 flex-wrap gap-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Engr. Ekull Joseph Marrion</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>November 28, 2024</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>4 min read</span>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Smart home technology is no longer just a dream of the
                future—it's already here in Buea. Discover how students,
                families, and business owners are transforming their spaces with
                intelligent automation.
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
                  Smart home technology is no longer just a dream of the
                  future—it's already here in Buea. From students to families
                  and business owners, more people are discovering the
                  convenience, security, and savings that smart devices provide.
                </p>
              </div>

              {/* What is a Smart Home */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  What is a Smart Home?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  A smart home uses technology to automate and control different
                  systems, making daily life more convenient, secure, and
                  efficient. Here are the key components:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Home className="w-6 h-6 text-yellow-600 mr-3" />
                        <h3 className="text-xl font-semibold text-black">
                          Smart Lighting
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Automated bulbs that adjust brightness or switch off
                        automatically based on schedules or occupancy.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="text-xl font-semibold text-black">
                          Temperature Control
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Smart fans or thermostats for efficient cooling that
                        adapts to your preferences and schedule.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Shield className="w-6 h-6 text-red-600 mr-3" />
                        <h3 className="text-xl font-semibold text-black">
                          Security Systems
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Smart door locks, CCTV cameras, and alarm systems that
                        you can monitor remotely.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Smartphone className="w-6 h-6 text-purple-600 mr-3" />
                        <h3 className="text-xl font-semibold text-black">
                          Voice Assistants
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Control your entire home with simple voice commands
                        through smart speakers and apps.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Benefits in Buea */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Benefits in Buea
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Smart home technology offers specific advantages for residents
                  of Buea and the Southwest Region:
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <Smartphone className="w-8 h-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">
                        Convenience
                      </h3>
                      <p className="text-blue-700">
                        Control devices from your phone, whether you're at the
                        University of Buea or traveling to Douala for business.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-green-50 border border-green-200 rounded-lg">
                    <DollarSign className="w-8 h-8 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-green-800 mb-2">
                        Energy Savings
                      </h3>
                      <p className="text-green-700">
                        Use only the power you need, crucial with rising
                        electricity costs in Cameroon.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-red-50 border border-red-200 rounded-lg">
                    <Shield className="w-8 h-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-red-800 mb-2">
                        Security
                      </h3>
                      <p className="text-red-700">
                        Get instant alerts about movement or break-ins,
                        essential for property protection in urban areas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-purple-50 border border-purple-200 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-purple-800 mb-2">
                        Modern Living
                      </h3>
                      <p className="text-purple-700">
                        Attracts quality tenants and adds significant value to
                        properties in competitive rental markets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenges */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Challenges to Consider
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  While smart home technology offers many benefits, there are
                  some challenges to be aware of:
                </p>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Wifi className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                          Internet Reliability
                        </h3>
                        <p className="text-yellow-700">
                          Some devices need strong Wi-Fi connection, which can
                          be inconsistent in some areas.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <DollarSign className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                          Initial Cost
                        </h3>
                        <p className="text-yellow-700">
                          Advanced systems can require significant upfront
                          investment, though costs are decreasing.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Home className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                          Local Availability
                        </h3>
                        <p className="text-yellow-700">
                          Not all devices are easily found locally, though this
                          is improving with more suppliers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Local Perspective */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Local Perspective: Who Benefits Most?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-blue-800 mb-4">
                        Students
                      </h3>
                      <p className="text-blue-700 mb-4">
                        Smart plugs and bulbs for budget-friendly living in
                        university accommodations.
                      </p>
                      <ul className="text-sm text-blue-600 space-y-1">
                        <li>• Control devices remotely during classes</li>
                        <li>• Save on electricity bills</li>
                        <li>• Simple installation in rented rooms</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-green-800 mb-4">
                        Landlords
                      </h3>
                      <p className="text-green-700 mb-4">
                        Smart locks and meters for easy property management and
                        tenant attraction.
                      </p>
                      <ul className="text-sm text-green-600 space-y-1">
                        <li>• Remote access control</li>
                        <li>• Monitor energy usage</li>
                        <li>• Attract premium tenants</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-purple-800 mb-4">
                        Businesses
                      </h3>
                      <p className="text-purple-700 mb-4">
                        CCTV and smart lighting for security and operational
                        cost control.
                      </p>
                      <ul className="text-sm text-purple-600 space-y-1">
                        <li>• 24/7 security monitoring</li>
                        <li>• Automated lighting schedules</li>
                        <li>• Reduced operational costs</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Getting Started */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Getting Started in Buea
                </h2>
                <div className="bg-gray-50 rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Recommended First Steps:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        1
                      </div>
                      <span className="text-gray-800">
                        Start with smart bulbs in main living areas
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        2
                      </div>
                      <span className="text-gray-800">
                        Add smart plugs for high-usage appliances
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        3
                      </div>
                      <span className="text-gray-800">
                        Install basic security cameras for peace of mind
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4
                      </div>
                      <span className="text-gray-800">
                        Expand gradually based on needs and budget
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
                    Smart home technology is transforming the way people live in
                    Buea. Whether it's reducing bills, increasing comfort, or
                    improving safety, it's an investment worth making.
                  </p>
                  <p className="text-xl font-semibold">
                    The future of living is smart—and it's already here.
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center py-12 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Ready to Make Your Home Smart?
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Contact WiCon Systems to discuss smart home solutions tailored
                  for your needs and budget.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                    <Link href="/contact">Get Smart Home Quote</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-gray-50 px-8 py-3"
                  >
                    <Link href="/services">Explore Smart Solutions</Link>
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
