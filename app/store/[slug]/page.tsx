"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/components/cart-context"
import { toast } from "sonner"
import { ShoppingCart, ArrowLeft, Shield, Zap, Truck, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function ProductDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { addItem, setIsOpen } = useCart()

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/products/${slug}`)
        const data = await res.json()
        if (data.ok) {
          setProduct(data.item)
        } else {
          toast.error("Product not found")
          router.push("/store")
        }
      } catch (e) {
        toast.error("Failed to load product")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug, router])

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-sm font-medium text-gray-500 uppercase tracking-widest">Loading Perfection...</p>
    </div>
  )
  if (!product) return null

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-8 lg:px-12 py-6 sm:py-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-black mb-6 sm:mb-10 transition-colors group text-xs sm:text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Image Section */}
          <div className="w-full">
            <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm relative group">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest px-8 text-center text-lg sm:text-xl">
                  {product.name}
                </div>
              )}
              {product.stock <= 0 && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center">
                  <span className="bg-black text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs sm:text-sm shadow-xl">Sold Out</span>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col h-full lg:py-4">
            <div className="mb-5 sm:mb-6">
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] mb-2 sm:mb-3">
                {product.category || 'Professional Hardware'}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-2 sm:mb-3 leading-[1.15]">{product.name}</h1>
              <div className="flex items-baseline gap-2 sm:gap-3">
                <p className="text-xl sm:text-2xl font-black text-black">{product.price.toLocaleString()} XAF</p>
                <span className="text-[10px] sm:text-xs font-bold text-green-600 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded">In Stock</span>
              </div>
            </div>

            <div className="prose prose-gray mb-6 sm:mb-8 max-w-none">
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{product.description || "No description available for this premium WiCon product."}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {/* <div className="flex flex-col gap-2 p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Warranty</p>
                  <p className="text-xs sm:text-sm font-bold text-black">12 Months</p>
                </div>
              </div> */}
              <div className="flex flex-col gap-2 p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100">
                <Truck className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Delivery</p>
                  <p className="text-xs sm:text-sm font-bold text-black">Nationwide</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:mt-auto">
              <button
                onClick={() => {
                  addItem(product)
                  setIsOpen(true)
                  toast.success(`${product.name} added to cart`)
                }}
                disabled={product.stock <= 0}
                className="w-full bg-black text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-black/20 disabled:opacity-30 disabled:cursor-not-allowed group active:scale-[0.98]"
              >
                <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
                {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-gray-400 font-bold tracking-widest pt-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span>WiCon Ltd. Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features/Specs Section */}
        <div className="mt-16 sm:mt-24 pt-16 sm:pt-24 border-t border-gray-100">
          <h2 className="text-xl sm:text-2xl font-black text-black mb-8 sm:mb-12 text-center uppercase tracking-tighter">Engineered for Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
            <div className="text-center group flex flex-col items-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 text-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:rotate-6 transition-transform">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">High Efficiency</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs">Optimized for low power consumption and high performance in Cameroon's electrical environment.</p>
            </div>
            <div className="text-center group flex flex-col items-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-50 text-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:rotate-6 transition-transform">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Industrial Grade</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs">Built with premium components to withstand voltage fluctuations and heavy usage.</p>
            </div>
            <div className="text-center group flex flex-col items-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-50 text-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:rotate-6 transition-transform">
                <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Stock Ready</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs">Maintain local stock in Buea for immediate installation and replacement services.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
