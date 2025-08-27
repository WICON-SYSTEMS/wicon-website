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
  Zap,
  DollarSign,
  Smartphone,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";

export default function SmartControllersBlogPost() {
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
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                Cost Savings
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                Cutting Down Electricity Costs with Smart Controllers
              </h1>
              <div className="flex items-center text-gray-600 mb-6 flex-wrap gap-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Engr. Ekulle Joseph Marrion</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>August 27, 2025</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>5 min read</span>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Electricity bills keep rising, and for most households in
                Cameroon, saving energy is no longer a luxury—it's a necessity.
                Discover how smart controllers are revolutionizing energy
                management and helping families significantly reduce their
                monthly costs.
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
                  Electricity bills keep rising, and for most households in
                  Cameroon, saving energy is no longer a luxury—it's a
                  necessity. Luckily, smart controllers are changing the way we
                  use power at home and helping families cut down costs
                  significantly.
                </p>
              </div>

              {/* What Are Smart Controllers */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  What Are Smart Controllers?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Smart controllers are devices that allow you to monitor and
                  control electricity use in real time. These innovative
                  solutions put the power of energy management directly in your
                  hands.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Zap className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-xl font-semibold text-black">
                          Smart Plugs
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Turn appliances on/off remotely and schedule automatic
                        operation times.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <TrendingDown className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="text-xl font-semibold text-black">
                          Smart Thermostats
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Regulate cooling and heating systems for optimal energy
                        efficiency.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Smartphone className="w-6 h-6 text-purple-600 mr-3" />
                        <h3 className="text-xl font-semibold text-black">
                          Smart Lighting
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Switch off automatically when not needed and adjust
                        brightness levels.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <DollarSign className="w-6 h-6 text-orange-600 mr-3" />
                        <h3 className="text-xl font-semibold text-black">
                          Energy Monitoring
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Show which devices consume the most power in real-time.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Why Use Them */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Why Use Smart Controllers?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Smart controllers bring three major benefits that directly
                  impact your household budget and lifestyle:
                </p>

                <div className="bg-gray-50 rounded-lg p-8 mb-8">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-black mb-2">
                          Save Money
                        </h3>
                        <p className="text-gray-700">
                          By switching off appliances automatically, you avoid
                          wasting energy and see immediate reductions in your
                          monthly bills.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-black mb-2">
                          Convenience
                        </h3>
                        <p className="text-gray-700">
                          Control your devices with your phone, even when away
                          from home. Never worry about leaving appliances on
                          again.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-black mb-2">
                          Efficiency
                        </h3>
                        <p className="text-gray-700">
                          Optimize heavy appliances like freezers, water
                          heaters, and air conditioners for maximum performance
                          with minimum energy use.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Practical Example */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  A Practical Example in Buea
                </h2>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    <strong>Case Study:</strong> Imagine a household that uses a
                    smart plug for the water heater. Instead of leaving it on
                    all day, the heater only runs for 1–2 hours as scheduled.
                    That alone can save{" "}
                    <strong>5,000–8,000 CFA per month</strong> on electricity
                    bills.
                  </p>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This real-world example shows how a simple smart controller
                  can make a significant difference in your monthly expenses.
                  Over a year, this single change could save a family
                  60,000–96,000 CFA—enough for school fees or other important
                  expenses.
                </p>
              </div>

              {/* How to Start */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  How to Start Small
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  You don't need to transform your entire home overnight. Start
                  with these simple, cost-effective solutions:
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-4"></div>
                    <span className="text-gray-800">
                      <strong>Install smart bulbs</strong> in living rooms and
                      hallways
                    </span>
                  </div>
                  <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-4"></div>
                    <span className="text-gray-800">
                      <strong>Use smart plugs</strong> for TV, iron, or water
                      heater
                    </span>
                  </div>
                  <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-4"></div>
                    <span className="text-gray-800">
                      <strong>Try an energy monitor</strong> to see which
                      devices waste the most power
                    </span>
                  </div>
                </div>
              </div>

              {/* Final Thoughts */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Final Thoughts
                </h2>
                <div className="bg-black text-white p-8 rounded-lg">
                  <p className="text-lg leading-relaxed mb-4">
                    Electricity will always be expensive, but wasting it is
                    avoidable. Smart controllers give families in Buea and
                    beyond the tools to take control of their energy bills.
                  </p>
                  <p className="text-xl font-semibold">
                    Smart living is not just modern—it's money-saving.
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center py-12 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Ready to Start Saving on Electricity?
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Contact WiCon Systems today to learn more about smart
                  controller solutions for your home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                    <Link href="/contact">Get Free Consultation</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-gray-50 px-8 py-3"
                  >
                    <Link href="/services">View Our Services</Link>
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
