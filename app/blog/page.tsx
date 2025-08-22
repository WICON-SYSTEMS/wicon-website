import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Reducing Electricity Costs with Smart Controllers",
      excerpt:
        "Discover how WiCon's wireless controllers can reduce your electricity bills by up to 30% through intelligent monitoring and automated control systems.",
      author: "Engr. Akum Bate",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Cost Savings",
      image: "/placeholder.svg?height=200&width=400&text=Smart+Controllers",
    },
    {
      id: 2,
      title: "Solar Energy Solutions for Cameroon Homes",
      excerpt:
        "A comprehensive guide to solar PV systems in Cameroon's tropical climate. Learn about system sizing, battery storage, and maximizing energy independence.",
      author: "Sarah Mballa",
      date: "December 10, 2024",
      readTime: "7 min read",
      category: "Solar Energy",
      image: "/placeholder.svg?height=200&width=400&text=Solar+Panels",
    },
    {
      id: 3,
      title: "Electrical Safety in Tropical Climates",
      excerpt:
        "Essential safety considerations for electrical installations in Cameroon's humid environment. Best practices for protection against moisture and corrosion.",
      author: "Paul Talla",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Safety",
      image: "/placeholder.svg?height=200&width=400&text=Electrical+Safety",
    },
    {
      id: 4,
      title: "Smart Home Technology in Buea",
      excerpt:
        "How smart home technology is transforming residential living in Buea. From automated lighting to security systems, explore the possibilities.",
      author: "Emmanuel Nkeng",
      date: "November 28, 2024",
      readTime: "4 min read",
      category: "Smart Home",
      image: "/placeholder.svg?height=200&width=400&text=Smart+Home",
    },
    {
      id: 5,
      title: "CCTV Security Systems: A Complete Guide",
      excerpt:
        "Everything you need to know about modern CCTV systems. Camera types, installation considerations, and remote monitoring capabilities for Cameroon businesses.",
      author: "Sarah Mballa",
      date: "November 20, 2024",
      readTime: "8 min read",
      category: "Security",
      image: "/placeholder.svg?height=200&width=400&text=CCTV+Systems",
    },
    {
      id: 6,
      title: "Energy Independence Through Solar Power",
      excerpt:
        "Case study: How a Limbe family achieved 90% energy independence with a 5kW solar system. Real costs, savings, and lessons learned.",
      author: "Paul Talla",
      date: "November 15, 2024",
      readTime: "6 min read",
      category: "Case Study",
      image: "/placeholder.svg?height=200&width=400&text=Energy+Independence",
    },
  ]

  const categories = ["All", "Cost Savings", "Solar Energy", "Safety", "Smart Home", "Security", "Case Study"]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">WiCon Systems Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Expert insights, tips, and updates on electrical systems, solar energy, and smart technology solutions for
              Cameroon.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <Badge className="mb-4 bg-black text-white">Featured Post</Badge>
              <Card className="bg-gray-50 border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div>
                    <img
                      src="/placeholder.svg?height=300&width=500&text=Featured+Post"
                      alt="Featured Post"
                      className="w-full h-64 lg:h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-4">
                      Cost Savings
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                      Reducing Electricity Costs with Smart Controllers
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Discover how WiCon's wireless controllers can reduce your electricity bills by up to 30% through
                      intelligent monitoring and automated control systems. Learn about real-world implementations and
                      cost savings achieved by our clients.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <User className="w-4 h-4 mr-2" />
                      <span className="mr-4">Emmanuel Nkeng</span>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="mr-4">December 15, 2024</span>
                      <Clock className="w-4 h-4 mr-2" />
                      <span>5 min read</span>
                    </div>
                    <Button className="w-fit bg-black text-white hover:bg-gray-800">
                      Read Full Article
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className={category === "All" ? "bg-black text-white" : "bg-transparent"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post) => (
                <Card key={post.id} className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-4">
                    <Badge variant="secondary" className="w-fit mb-2">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-black leading-tight">{post.title}</h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <User className="w-3 h-3 mr-1" />
                      <span className="mr-3">{post.author}</span>
                      <Calendar className="w-3 h-3 mr-1" />
                      <span className="mr-3">{post.date}</span>
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Read More
                      <ArrowRight className="ml-2 w-3 h-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with WiCon Systems</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Subscribe to our newsletter for the latest insights on electrical technology, energy solutions, and
              industry updates in Cameroon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-black" />
              <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
