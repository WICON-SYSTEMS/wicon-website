import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, Clock, ArrowLeft, Shield, Camera, Wifi, HardDrive, Eye, DollarSign, Settings, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CCTVSecurityBlogPost() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="mb-8">
              <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">Security</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                CCTV Security Systems: A Complete Guide
              </h1>
              <div className="flex items-center text-gray-600 mb-6 flex-wrap gap-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Sarah Mballa</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>November 20, 2024</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>8 min read</span>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Security is a top priority for families, landlords, and businesses in Buea. Discover how to choose and install 
                the right CCTV security system to protect what matters most to you.
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
                  Security is a top priority for families, landlords, and businesses in Buea. One of the most effective ways 
                  to protect property is by installing a CCTV security system. But with so many options, how do you choose the right one?
                </p>
              </div>

              {/* Types of CCTV Systems */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">Types of CCTV Systems</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Understanding the different types of CCTV systems helps you make the right choice for your specific needs:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Camera className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-xl font-semibold text-blue-800">Wired CCTV</h3>
                      </div>
                      <p className="text-blue-700 mb-3">Stable and reliable connection, best for large installations and permanent setups.</p>
                      <div className="text-sm text-blue-600">
                        <p><strong>Pros:</strong> Reliable, no interference</p>
                        <p><strong>Cons:</strong> Complex installation</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Wifi className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="text-xl font-semibold text-green-800">Wireless CCTV</h3>
                      </div>
                      <p className="text-green-700 mb-3">Easy to set up and connects via Wi-Fi, perfect for quick installations.</p>
                      <div className="text-sm text-green-600">
                        <p><strong>Pros:</strong> Easy installation, flexible</p>
                        <p><strong>Cons:</strong> Depends on Wi-Fi strength</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-purple-200 bg-purple-50">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Shield className="w-6 h-6 text-purple-600 mr-3" />
                        <h3 className="text-xl font-semibold text-purple-800">Indoor Cameras</h3>
                      </div>
                      <p className="text-purple-700 mb-3">Monitor inside spaces like living rooms, offices, and storage areas.</p>
                      <div className="text-sm text-purple-600">
                        <p><strong>Best for:</strong> Homes, offices, shops</p>
                        <p><strong>Features:</strong> Compact, discreet design</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Eye className="w-6 h-6 text-orange-600 mr-3" />
                        <h3 className="text-xl font-semibold text-orange-800">Outdoor Cameras</h3>
                      </div>
                      <p className="text-orange-700 mb-3">Weatherproof design for external monitoring of gates, yards, and perimeters.</p>
                      <div className="text-sm text-orange-600">
                        <p><strong>Best for:</strong> Gates, parking, perimeter</p>
                        <p><strong>Features:</strong> Weather-resistant, night vision</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">Key Features to Look For</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  When choosing a CCTV system, these features determine the quality and effectiveness of your security setup:
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">Resolution Quality</h3>
                      <p className="text-gray-700 mb-2">HD (1080p) or 4K for crystal-clear images that can identify faces and license plates.</p>
                      <p className="text-sm text-gray-600"><strong>Recommendation:</strong> Minimum 1080p for clear identification</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">Night Vision</h3>
                      <p className="text-gray-700 mb-2">Infrared capability to see clearly in complete darkness, essential for 24/7 monitoring.</p>
                      <p className="text-sm text-gray-600"><strong>Range:</strong> Look for 20-30 meter night vision range</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <HardDrive className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">Storage Options</h3>
                      <p className="text-gray-700 mb-2">Cloud storage or local DVR/NVR for saving and accessing recorded footage.</p>
                      <p className="text-sm text-gray-600"><strong>Tip:</strong> Consider both local and cloud backup for security</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">Remote Monitoring</h3>
                      <p className="text-gray-700 mb-2">View live footage and receive alerts on your smartphone from anywhere.</p>
                      <p className="text-sm text-gray-600"><strong>Must-have:</strong> Mobile app with push notifications</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installation Tips */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">Professional Installation Tips</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-4">Strategic Camera Placement:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="text-yellow-700">Place cameras at all entry points (doors, gates, windows)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="text-yellow-700">Avoid direct sunlight on camera lenses to prevent glare</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="text-yellow-700">Ensure stable power supply and good internet connection</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="text-yellow-700">Mount cameras high enough to prevent tampering</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="text-yellow-700">Consider privacy laws and neighbor boundaries</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Guide */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">Cost Guide for Buea Market</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Understanding the investment required helps you plan and budget for your security system:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-green-200">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h3 className="text-xl font-semibold text-green-800">Basic System</h3>
                        <p className="text-sm text-green-600">2-4 cameras</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-800 mb-2">80,000 - 150,000 CFA</p>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• HD cameras</li>
                          <li>• Basic DVR</li>
                          <li>• Standard installation</li>
                          <li>• Mobile app access</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="text-xl font-semibold text-blue-800">Mid-Range System</h3>
                        <p className="text-sm text-blue-600">6-8 cameras</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-800 mb-2">200,000 - 400,000 CFA</p>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Full HD cameras</li>
                          <li>• Advanced NVR</li>
                          <li>• Night vision</li>
                          <li>• Cloud backup option</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-purple-200">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <h3 className="text-xl font-semibold text-purple-800">Advanced System</h3>
                        <p className="text-sm text-purple-600">10+ cameras</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-800 mb-2">500,000+ CFA</p>
                        <ul className="text-sm text-purple-700 space-y-1">
                          <li>• 4K cameras</li>
                          <li>• AI features</li>
                          <li>• Professional monitoring</li>
                          <li>• Complete integration</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Maintenance Tips */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">Maintenance Tips for Longevity</h2>
                <div className="bg-gray-50 rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-black mb-6">Regular Maintenance Schedule:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Monthly Tasks:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          Clean camera lenses with soft cloth
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          Check all camera angles and positions
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          Test remote access functionality
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Quarterly Tasks:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                          Update software and firmware
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                          Check storage capacity and backup
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                          Inspect cables and connections
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conclusion */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">Conclusion</h2>
                <div className="bg-black text-white p-8 rounded-lg">
                  <p className="text-lg leading-relaxed mb-4">
                    CCTV systems provide peace of mind and protection for homes, shops, and offices in Buea. 
                    Installing the right system ensures security and builds confidence in your property's safety.
                  </p>
                  <p className="text-xl font-semibold">
                    Your safety is worth the investment.
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center py-12 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-4">Ready to Secure Your Property?</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Contact WiCon Systems for a free security assessment and customized CCTV solution.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                    <Link href="/contact">Get Security Quote</Link>
                  </Button>
                  <Button variant="outline" className="border-black text-black hover:bg-gray-50 px-8 py-3">
                    <Link href="/services">View Security Services</Link>
                  </Button>
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
