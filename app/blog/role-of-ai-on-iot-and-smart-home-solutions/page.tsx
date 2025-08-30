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
  Lightbulb,
  ShieldCheck,
  Leaf,
  Cpu,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

export default function AiIotSmartHomePost() {
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
              <Badge className="mb-4 bg-black text-white hover:bg-black/90">
                AI & IoT
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                The Role of AI in IoT and Smart Home Solutions
              </h1>
              <div className="flex items-center text-gray-600 mb-6 flex-wrap gap-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Eng. Marina Ada Nguema Nfumu</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>August 30, 2025</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>5 min read</span>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                In a world where convenience meets intelligence, the fusion of
                artificial intelligence (AI) and the Internet of Things (IoT) is
                revolutionizing how we live, work, and interact with our homes.
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
                  From intuitive lighting to predictive climate control, smart
                  homes are no longer just futuristic—they are here, learning
                  from us and adapting to our rhythms.
                </p>
              </div>

              {/* IoT Meets AI */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Understanding the Foundation: IoT Meets AI
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  IoT connects devices such as thermostats, cameras, and
                  refrigerators into a network that can communicate. But without
                  AI, these devices are reactive. AI adds the brainpower: it
                  interprets data, learns patterns, and makes decisions that
                  feel almost human.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Cpu className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-xl font-semibold text-black">
                          IoT Devices
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Gather real-time data from sensors and devices across
                        your home.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Lightbulb className="w-6 h-6 text-yellow-600 mr-3" />
                        <h3 className="text-xl font-semibold text-black">
                          AI Insights
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Analyze that data to automate tasks, predict needs, and
                        personalize your lifestyle.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Smarter Living */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Smarter Living Through AI
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Here’s how AI transforms everyday home functions:
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">
                        Personalized Automation
                      </h3>
                      <p className="text-gray-700">
                        AI learns your habits—when you wake up, your preferred
                        temperature, when you leave for work—and adjusts your
                        environment accordingly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">
                        Enhanced Security
                      </h3>
                      <p className="text-gray-700">
                        Smart cameras and sensors detect unusual activity, while
                        AI distinguishes between your pet and a potential
                        intruder—alerting you in real time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">
                        Energy Efficiency
                      </h3>
                      <p className="text-gray-700">
                        AI optimizes heating, cooling, and lighting. It can even
                        manage solar energy—storing excess power or selling it
                        back to the grid.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Benefits of AI and IoT in Smart Homes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Smartphone className="w-6 h-6 text-indigo-600 mr-3" />
                        <h3 className="text-xl font-semibold text-black">
                          Convenience
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Operate devices from anywhere using mobile apps or voice
                        commands.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Leaf className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="text-xl font-semibold text-black">
                          Sustainability
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Intelligent energy management reduces waste and supports
                        greener living.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Final Thoughts */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Final Thoughts
                </h2>
                <div className="bg-black text-white p-8 rounded-lg">
                  <p className="text-lg leading-relaxed mb-4">
                    Smart homes are not just about tech; they’re about trust,
                    comfort, and connection. With AI-powered IoT, living spaces
                    become more efficient and personalized.
                  </p>
                  <p className="text-xl font-semibold">
                    The future of home is intelligent, sustainable, and human-
                    centered.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center py-12 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Ready to Transform Your Home?
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Contact WiCon Systems today to explore AI & IoT smart home
                  solutions designed for modern living.
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
