import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">About WiCon Systems</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We are pioneering smart home technology solutions. Professional installation and seamless control—so you
                enjoy comfort and peace of mind.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center">Our Story</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Founded in 2014 in Buea, Southwest Region, Cameroon, WiCon Systems emerged from a vision to
                  revolutionize electrical control and safety in our region. Our founders recognized the unique
                  challenges faced by businesses and homeowners in managing electrical systems safely and efficiently.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  What started as a small electrical construction company has grown into a leading provider of
                  innovative wireless control solutions, solar energy systems, and comprehensive electrical services.
                  We've built our reputation on reliability, safety, and deep understanding of Cameroon's electrical
                  infrastructure needs.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Founded 2014
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    Buea, Cameroon
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    2-10 Employees
                  </Badge>
                </div>
              </div>
              <div>
                <img
                  src="/wicon-body.png"
                  alt="WiCon Systems Team"
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Purpose, Brand Vision, Brand Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-gray-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Our Purpose</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Protection and comfort for the home, peace for the mind. We don’t just make homes secure; we make
                    people feel more secure too. If you’ve chosen WiCon, you can get on and enjoy your life.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Our Brand Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be Africa’s most trusted brand in home comfort. In many cities of Cameroon, WiCon is already
                    another name for comfort and security. We’re aiming higher—to be the most trusted brand in our
                    field.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Our Brand Values</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We are passionate about improving lives across Africa and the world at large. Life is easier when
                    your home is comfortable and secure. We help people enjoy their time together without worrying
                    about access control for lighting, whether the door is locked, or if the alarm is set. We make
                    day‑to‑day life simpler, so our customers can go out and chase their dreams.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features of the Service */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black">Key Features of the Service</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <HeartHandshake className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Putting Customers First</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To lead, we listen. By talking to people around the globe, we learn about their lives, dreams,
                    needs, and circumstances. Some are excited about the latest tech. Others worry about privacy.
                    Many simply want comfort. Understanding what matters most to our customers is the key to our
                    success.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Innovativeness</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We have a history of innovation. Our founders knew lighting control could be designed better.
                    Today, innovation means integrating our products into smart homes, platforms, and services—making
                    life more convenient without compromising security.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Creating Seamless Experiences</h3>
                  <p className="text-gray-600 leading-relaxed">
                    The point of innovation is to make life simpler. Every interaction with WiCon should be easy—from
                    how customers buy from us to how our products serve them. We stay invisible, yet are always there
                    when needed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Meet Our Expert Team</h2>
              <p className="text-xl text-gray-600">
                Certified professionals dedicated to delivering exceptional electrical solutions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-gray-200 text-center">
                <CardContent className="p-8">
                  <img
                    src="/placeholder.svg?height=200&width=200&text=CEO"
                    alt="CEO"
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-bold text-black mb-2">Engr. Akum Bate</h3>
                  <p className="text-gray-600 mb-4">Founder & CEo</p>
                  <p className="text-sm text-gray-500">
                    Electrical Engineer with 15+ years experience in power systems and wireless technology.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200 text-center">
                <CardContent className="p-8">
                  <img
                    src="/placeholder.svg?height=200&width=200&text=CTO"
                    alt="CTO"
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-bold text-black mb-2">Sarah Mballa</h3>
                  <p className="text-gray-600 mb-4">Chief Technology Officer</p>
                  <p className="text-sm text-gray-500">
                    Electronics specialist focused on developing innovative wireless control solutions.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200 text-center">
                <CardContent className="p-8">
                  <img
                    src="/placeholder.svg?height=200&width=200&text=Lead+Tech"
                    alt="Lead Technician"
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-bold text-black mb-2">Paul Talla</h3>
                  <p className="text-gray-600 mb-4">Lead Installation Technician</p>
                  <p className="text-sm text-gray-500">
                    Certified electrician with expertise in solar PV systems and security installations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Areas & Statistics */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Service Areas</h2>
                <p className="text-lg text-gray-600 mb-8">
                  We proudly serve the Southwest Region of Cameroon, with our headquarters in Buea and service coverage
                  extending throughout the region.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">Buea (Headquarters)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">Limbe</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">Tiko</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">Kumba</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">Mamfe</span>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Our Achievements</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-black mb-2">10+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-black mb-2">500+</div>
                    <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-black mb-2">100+</div>
                    <div className="text-gray-600">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-black mb-2">24/7</div>
                    <div className="text-gray-600">Support Available</div>
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
