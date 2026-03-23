import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { NewsletterSignup } from "@/components/newsletter-signup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "WiCon Systems blog – insights on smart automation, electrical safety, energy, and technology in Cameroon.",
};

export default function BlogPage() {
  const blogPosts = [
    {
      id: 0,
      title: "The Role of AI on IoT and Smart Home Solutions",
      excerpt:
        "AI + IoT are transforming homes—personalized automation, enhanced security, and smarter energy use.",
      author: "Eng. Marina Ada Nguema Nfumu",
      date: "August 30, 2025",
      readTime: "5 min read",
      category: "AI & IoT",
      image: "/wicon-box.png",
      href: "/blog/role-of-ai-on-iot-and-smart-home-solutions",
    },
    {
      id: 1,
      title: "Cutting Down Electricity Costs with Smart Controllers",
      excerpt:
        "Discover how WiCon's wireless controllers can reduce your electricity bills by up to 30% through intelligent monitoring and automated control systems.",
      author: "Engr. Ekulle Joseph Marrion",
      date: "August 27, 2025",
      readTime: "5 min read",
      category: "Cost Savings",
      image: "/wicon-box.png",
      href: "/blog/cutting-down-electricity-costs",
    },
    {
      id: 2,
      title: "Electrical Safety in Tropical Climates",
      excerpt:
        "Essential safety considerations for electrical installations in Cameroon's humid environment. Best practices for protection against moisture and corrosion.",
      author: "Engr. Ekulle Joseph Marrion",
      date: "August 15, 2025",
      readTime: "6 min read",
      category: "Safety",
      image: "/electrical-safety.jpeg",
      href: "/blog/electrical-safety-tropical-climates",
    },
    {
      id: 3,
      title: "Smart Home Technology in Buea",
      excerpt:
        "How smart home technology is transforming residential living in Buea. From automated lighting to security systems, explore the possibilities.",
      author: "Engr. Ekulle Joseph Marrion",
      date: "July 30, 2025",
      readTime: "4 min read",
      category: "Smart Home",
      image: "/Smart-Home-Technology.jpg",
      href: "/blog/smart-home-technology-buea",
    },
    {
      id: 4,
      title: "CCTV Security Systems: A Complete Guide",
      excerpt:
        "Everything you need to know about modern CCTV systems. Camera types, installation considerations, and remote monitoring capabilities for Cameroon businesses.",
      author: "Engr. Ekulle Joseph Marrion",
      date: "July 10, 2025",
      readTime: "8 min read",
      category: "Security",
      image: "/cctv-security.jpg",
      href: "/blog/cctv-security-systems-guide",
    },
  ];

  const categories = [
    "All",
    "Cost Savings",
    "Safety",
    "Smart Home",
    "Security",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-black mb-6 uppercase tracking-tighter leading-none">
              Insights
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
              Expert insights, safety tips, and the latest updates on smart automation 
              and energy solutions in Cameroon.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <Badge className="mb-8 bg-black text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-none">Featured Article</Badge>
              <Card className="bg-gray-50 border-transparent rounded-[2rem] overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={blogPosts[0].image || "/wicon-box.png"}
                      alt={blogPosts[0].title}
                      className="w-full h-80 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                  <CardContent className="p-8 sm:p-16 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-6 bg-white text-gray-400 font-black uppercase tracking-widest text-[10px] px-4 py-1.5 rounded-lg">
                      {blogPosts[0].category}
                    </Badge>
                    <h2 className="text-2xl sm:text-4xl font-black text-black mb-6 uppercase tracking-tighter leading-tight sm:leading-none">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-gray-500 mb-8 leading-relaxed font-medium">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-y-4 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-10">
                      <div className="flex items-center mr-8">
                        <User className="w-3.5 h-3.5 mr-2" />
                        <span>{blogPosts[0].author}</span>
                      </div>
                      <div className="flex items-center mr-8">
                        <Calendar className="w-3.5 h-3.5 mr-2" />
                        <span>{blogPosts[0].date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-2" />
                        <span>{blogPosts[0].readTime}</span>
                      </div>
                    </div>
                    <Button className="w-full sm:w-fit h-14 px-10 rounded-2xl bg-black text-white hover:bg-gray-800 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-black/10 cursor-pointer">
                      <Link
                        href={blogPosts[0].href}
                        className="inline-flex items-center"
                      >
                        Read Full Story
                        <ArrowRight className="ml-3 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className={`h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-none ${
                    category === "All"
                      ? "bg-black text-white shadow-xl shadow-black/20"
                      : "bg-white text-gray-400 hover:text-black hover:shadow-lg"
                  }`}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {blogPosts.slice(1).map((post) => (
                <Card
                  key={post.id}
                  className="bg-white border-transparent rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group flex flex-col"
                >
                  <div className="overflow-hidden aspect-[4/3] relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-white/90 backdrop-blur-md text-black px-4 py-1.5 rounded-lg font-black uppercase tracking-widest text-[8px] border-none">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-8 pb-4 flex-grow">
                    <h3 className="text-xl font-black text-black leading-tight uppercase tracking-tight group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-6">
                    <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <Calendar className="w-3.5 h-3.5 mr-2" />
                      <span>{post.date}</span>
                    </div>
                    <Button
                      className="w-full h-12 rounded-xl bg-gray-50 text-black hover:bg-black hover:text-white text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer border-none"
                    >
                      <Link
                        href={post.href}
                        className="w-full inline-flex items-center justify-center"
                      >
                        Read Article
                        <ArrowRight className="ml-2 w-3.5 h-3.5" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with WiCon Systems
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Subscribe to our newsletter for the latest insights on electrical
              technology, energy solutions, and industry updates in Cameroon.
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
  );
}
