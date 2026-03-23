"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/components/cart-context"
import { toast } from "sonner"
import { ShoppingCart, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

export default function StorePage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<string>("all")
  const { addItem, setIsOpen } = useCart()

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const url = category === "all" ? "/api/products" : `/api/products?category=${category}`
        const res = await fetch(url)
        const data = await res.json()
        if (data.ok) {
          setProducts(data.items)
        }
      } catch (e) {
        console.error("Failed to load products", e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [category])

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-black mb-2">WiCon Store</h1>
            <p className="text-gray-600">Premium automation and electrical solutions.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c: any) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize border transition-all ${category === c
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-200 hover:border-black"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-gray-400 mb-4" />
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed">
            <p className="text-gray-500 mb-4">No products found in this category.</p>
            <button onClick={() => setCategory('all')} className="text-black font-semibold underline">View all products</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <Link href={`/store/${product.slug || product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 uppercase font-bold text-xs tracking-widest px-4 text-center">
                      {product.name}
                    </div>
                  )}
                  {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-500 shadow-sm uppercase tracking-wider">Out of Stock</span>
                    </div>
                  )}
                </Link>

                <div className="p-3 sm:p-6 flex-1 flex flex-col">
                  <div className="mb-2 sm:mb-4">
                    <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">{product.category || 'Hardware'}</p>
                    <Link href={`/store/${product.slug || product.id}`}>
                      <h2 className="text-sm sm:text-lg font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-2 sm:line-clamp-1">{product.name}</h2>
                    </Link>
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex flex-col">
                      <span className="text-base sm:text-xl font-black text-black">{product.price.toLocaleString()} XAF</span>
                    </div>

                    <AddToCartButton product={product} addItem={addItem} setIsOpen={setIsOpen} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

function AddToCartButton({ product, addItem, setIsOpen }: { product: any, addItem: any, setIsOpen: any }) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setIsOpen(true)
    toast.success(`${product.name} added to cart`)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleAdd}
            disabled={product.stock <= 0}
            className={`w-11 h-11 rounded-xl transition-all duration-300 flex items-center justify-center overflow-hidden flex-shrink-0 ${added
                ? "bg-green-500 text-white"
                : "bg-black text-white hover:bg-gray-800 active:scale-95"
              } disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer`}
          >
            {added ? (
              <svg className="w-5 h-5 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="font-bold">
          {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
