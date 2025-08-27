import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Cutting Down Electricity Costs with Smart Controllers",
      excerpt:
        "Discover how WiCon's wireless controllers can reduce your electricity bills by up to 30% through intelligent monitoring and automated control systems.",
      author: "Engr. Akum Bate",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Cost Savings",
      image: "/placeholder.svg?height=200&width=400&text=Smart+Controllers",
      href: "/blog/cutting-down-electricity-costs",
    },
    {
      id: 2,
      title: "Electrical Safety in Tropical Climates",
      excerpt:
        "Essential safety considerations for electrical installations in Cameroon's humid environment. Best practices for protection against moisture and corrosion.",
      author: "Paul Talla",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Safety",
      image: "/placeholder.svg?height=200&width=400&text=Electrical+Safety",
      href: "/blog/electrical-safety-tropical-climates",
    },
    {
      id: 3,
      title: "Smart Home Technology in Buea",
      excerpt:
        "How smart home technology is transforming residential living in Buea. From automated lighting to security systems, explore the possibilities.",
      author: "Emmanuel Nkeng",
      date: "November 28, 2024",
      readTime: "4 min read",
      category: "Smart Home",
      image: "/placeholder.svg?height=200&width=400&text=Smart+Home",
      href: "/blog/smart-home-technology-buea",
    },
    {
      id: 4,
      title: "CCTV Security Systems: A Complete Guide",
      excerpt:
        "Everything you need to know about modern CCTV systems. Camera types, installation considerations, and remote monitoring capabilities for Cameroon businesses.",
      author: "Sarah Mballa",
      date: "November 20, 2024",
      readTime: "8 min read",
      category: "Security",
      image: "/placeholder.svg?height=200&width=400&text=CCTV+Systems",
      href: "/blog/cctv-security-systems-guide",
    },
  ]

  const categories = ["All", "Cost Savings", "Safety", "Smart Home", "Security"]

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
                      src={blogPosts[0].image || "/placeholder.svg"}
                      alt={blogPosts[0].title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-4">
                      {blogPosts[0].category}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <User className="w-4 h-4 mr-2" />
                      <span className="mr-4">{blogPosts[0].author}</span>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="mr-4">{blogPosts[0].date}</span>
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                    <Button className="w-fit bg-black text-white hover:bg-gray-800">
                      <Link href={blogPosts[0].href} className="inline-flex items-center">
                        Read Full Article
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
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
                      <Link href={post.href} className="inline-flex items-center">
                        Read More
                        <ArrowRight className="ml-2 w-3 h-3" />
                      </Link>
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
            {/* Functional signup with success modal */}
            <NewsletterSignup
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              inputClassName="flex-1 px-4 py-3 rounded-lg text-white bg-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/30"
              buttonClassName="bg-white text-black hover:bg-gray-100 px-6 py-3"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
