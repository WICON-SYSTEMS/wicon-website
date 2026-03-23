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

  if (loading) return <div className="p-24 text-center">Loading...</div>
  if (!product) return null

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Store</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm relative group">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest px-8 text-center text-xl">
                  {product.name}
                </div>
              )}
              {product.stock <= 0 && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center">
                  <span className="bg-black text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-sm shadow-xl">Sold Out</span>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                {product.category || 'Professional Hardware'}
              </span>
              <h1 className="text-4xl lg:text-5xl font-black text-black mb-4 leading-tight">{product.name}</h1>
              <p className="text-3xl font-bold text-black border-b border-gray-100 pb-6 mb-8">{product.price.toLocaleString()} XAF</p>
            </div>

            <div className="prose prose-gray mb-10">
              <p className="text-gray-600 text-lg leading-relaxed">{product.description || "No description available for this premium WiCon product."}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <Shield className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Warranty</p>
                  <p className="text-sm font-semibold">12 Months</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <Truck className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Delivery</p>
                  <p className="text-sm font-semibold">Nationwide</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-auto">
              <button
                onClick={() => {
                  addItem(product)
                  setIsOpen(true)
                  toast.success(`${product.name} added to cart`)
                }}
                disabled={product.stock <= 0}
                className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-black/20 disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                <ShoppingCart className="w-6 h-6 group-hover:animate-bounce" />
                {product.stock <= 0 ? "Out of Stock" : "Add to Shopping Cart"}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium pt-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Original WiCon Systems Certified Product</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features/Specs Section Placeholder */}
        <div className="mt-24 pt-24 border-t border-gray-100">
          <h2 className="text-3xl font-black text-black mb-12 text-center">Engineered for Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">High Efficiency</h3>
              <p className="text-gray-600">Optimized for low power consumption and high performance in Cameroon's electrical environment.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Industrial Grade</h3>
              <p className="text-gray-600">Built with premium components to withstand voltage fluctuations and heavy usage.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Stock Ready</h3>
              <p className="text-gray-600">Maintain local stock in Buea for immediate installation and replacement services.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
