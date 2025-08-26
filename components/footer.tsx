import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                <span className="text-black font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold">WiCon Systems</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting you to electrical systems with ease and safety. Professional electrical construction services
              in Cameroon since 2014.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Buea, Southwest Region, Cameroon</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2" />
                <span>+237 670791815</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                <span>wiconsystems@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300">Wireless Controllers</span>
              </li>
              {/* <li>
                <span className="text-gray-300">Solar PV Systems</span>
              </li> */}
              <li>
                <span className="text-gray-300">Electrical Wiring</span>
              </li>
              <li>
                <span className="text-gray-300">CCTV Security</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {year} WiCon Systems. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  )
}
