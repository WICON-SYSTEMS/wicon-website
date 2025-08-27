import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Award,
  Star,
  Calendar,
  TrendingUp,
  CheckCircle,
  Play,
  Download,
} from "lucide-react";
import Link from "next/link";

export default function Training2024Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-black text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6  ">
                {/* <GraduationCap className="w-15 h-15 mr-2" /> */}
                <img
                  src="/training-logo-removebg-preview.png"
                  className="w-25 h-15 mr-3"
                  alt="training-logo"
                />
                <h1 className="text-2xl md:text-4xl font-bold text-left md:text-center">
                  WiCon SMART SOLUTION FOR DIGITAL EDUCATION
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                A remarkable success story - 48 participants graduated with
                industry-ready skills in software development, IoT solutions,
                and WiCon controller technology.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 inline-block">
                <div className="text-3xl font-bold mb-2 text-yellow-400">
                  Program Completed
                </div>
                <div className="text-gray-300">April 2024 • Buea, Cameroon</div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Statistics */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                2024 Program Achievements
              </h2>
              <p className="text-xl text-gray-600">
                Outstanding results that speak for themselves
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="bg-gray-50 border-gray-200 text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 mx-auto mb-4 text-black" />
                  <div className="text-3xl font-bold text-black mb-2">48</div>
                  <p className="text-gray-600">Graduates</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200 text-center">
                <CardContent className="p-6">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <div className="text-3xl font-bold text-black mb-2">92%</div>
                  <p className="text-gray-600">Job Placement Rate</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200 text-center">
                <CardContent className="p-6">
                  <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                  <div className="text-3xl font-bold text-black mb-2">
                    4.9/5
                  </div>
                  <p className="text-gray-600">Average Rating</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200 text-center">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <div className="text-3xl font-bold text-black mb-2">100%</div>
                  <p className="text-gray-600">Certification Rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Highlights */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">
                  Program Highlights
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-black mb-2">
                        Intensive 4-Week Training
                      </h3>
                      <p className="text-gray-600">
                        Comprehensive curriculum covering three specialized
                        tracks with hands-on projects and real-world
                        applications.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-black mb-2">
                        Industry Expert Instructors
                      </h3>
                      <p className="text-gray-600">
                        Led by certified professionals with years of experience
                        in software development, IoT, and electrical systems.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-black mb-2">
                        Practical Project Portfolio
                      </h3>
                      <p className="text-gray-600">
                        Each participant completed 3-5 real projects that
                        demonstrate their skills to potential employers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-black mb-2">
                        Job Placement Support
                      </h3>
                      <p className="text-gray-600">
                        92% of graduates secured employment within 3 months
                        through our industry partnerships and career support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-black mb-6">
                  Program Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">
                      <strong>Week 1:</strong> Fundamentals & Setup
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">
                      <strong>Week 2:</strong> Core Technologies
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">
                      <strong>Week 3:</strong> Advanced Applications
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">
                      <strong>Week 4:</strong> Final Projects & Certification
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Program Gallery
              </h2>
              <p className="text-xl text-gray-600">
                Moments from our successful 2024 training program
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-100 border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <img
                    src="/public1.jpg"
                    alt="Students in training session"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">
                    Students working on software development projects
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <img
                    src="/public2.jpg"
                    alt="IoT training session"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">
                    Hands-on IoT hardware training session
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <img
                    src="/public3.jpg"
                    alt="Graduation ceremony"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">
                    Graduation ceremony and certificate presentation
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <img
                    src="/public4.jpg"
                    alt="WiCon controller training"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">
                    WiCon controller installation training
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <img
                    src="/public5.jpg"
                    alt="Project presentations"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">
                    Final project presentations by participants
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <img
                    src="/public6.jpg"
                    alt="Networking event"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">
                    Industry networking and job fair event
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <img
                    src="/public7.jpg"
                    alt="Networking event"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">
                    Industry networking and job fair event
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <img
                    src="/public8.jpg"
                    alt="Networking event"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">
                    Industry networking and job fair event
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <img
                    src="/public9.jpg"
                    alt="Networking event"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">
                    Industry networking and job fair event
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Video Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Graduate Success Stories
              </h2>
              <p className="text-xl text-gray-600">
                Hear from our 2024 graduates about their experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4 relative">
                    <Play className="w-16 h-16 text-white bg-black bg-opacity-50 rounded-full p-4 cursor-pointer hover:bg-opacity-70 transition-all" />
                    <img
                      src="/public4.jpg"
                      alt="Graduate testimonial"
                      className="w-full h-full object-cover rounded-lg absolute inset-0"
                    />
                  </div>
                  <h3 className="font-bold text-black mb-2">
                    Sarah Mbong - Software Developer
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Now working at TechCorp Cameroon
                  </p>
                  <p className="text-gray-700">
                    "The WiCon training program transformed my career. I went
                    from having basic coding knowledge to landing a full-time
                    developer role within 2 months of graduation."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4 relative">
                    <Play className="w-16 h-16 text-white bg-black bg-opacity-50 rounded-full p-4 cursor-pointer hover:bg-opacity-70 transition-all" />
                    <img
                      src="/public2.jpg"
                      alt="Graduate testimonial"
                      className="w-full h-full object-cover rounded-lg absolute inset-0"
                    />
                  </div>
                  <h3 className="font-bold text-black mb-2">
                    Emmanuel Tabi - IoT Engineer
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Started his own IoT consulting firm
                  </p>
                  <p className="text-gray-700">
                    "The hands-on approach and real projects gave me the
                    confidence to start my own business. I'm now helping local
                    businesses implement smart solutions."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certificate Showcase */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Industry-Recognized Certification
              </h2>
              <p className="text-xl text-gray-300">
                Official WiCon Systems Digital Education Certificate
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-white rounded-md shadow-2xl">
                  <img
                    src="/wicon-systems-certificate.jpg"
                    alt="WiCon Systems Certificate"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  Certificate Features
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Award className="w-6 h-6 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-2">Industry Recognition</h4>
                      <p className="text-gray-300">
                        Recognized by leading tech companies across Cameroon and
                        West Africa
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-2">Skill Verification</h4>
                      <p className="text-gray-300">
                        Detailed breakdown of competencies and practical skills
                        acquired
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Download className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-2">Digital & Physical</h4>
                      <p className="text-gray-300">
                        Available in both digital format for LinkedIn and
                        physical certificate for display
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="mt-8 bg-white text-black hover:bg-gray-200">
                  View Sample Certificate
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Ready for 2025?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the next cohort of successful tech professionals.
              Registration for our 2025 program opens in March.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/training#register">
                <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                  Register for 2025 Program
                </Button>
              </Link>

              <Button
                variant="outline"
                className="border-black text-black hover:bg-gray-50 px-8 py-3 bg-transparent"
                asChild
              >
                <a
                  href="/downloads/A PRESENTATION  BY AKUM BATE ON DIGITAL EDUCATION.docx222.docx"
                  download="A PRESENTATION  BY AKUM BATE ON DIGITAL EDUCATION.docx222.docx"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download 2024 Presentation from CEO
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
