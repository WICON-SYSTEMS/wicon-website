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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 sm:mb-20 mt-4 sm:mt-0">
          <div>
            <div className="flex items-center justify-center gap-4">
              <h1 className="text-3xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none">WiCon Store</h1>
              <img src="/icons/store.png" className="w-15 h-15" alt="Store" />
            </div>
            <p className="text-sm sm:text-lg text-gray-500 font-medium">Premium automation and electrical solutions.</p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((c: any) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-5 py-2.5 cursor-pointer rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${category === c
                  ? "bg-black text-white shadow-xl shadow-black/10"
                  : "bg-white text-gray-400 border border-gray-100 hover:border-black hover:text-black"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 animate-pulse">Refining the catalog...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-6">No products found in this category.</p>
            <button onClick={() => setCategory('all')} className="bg-black text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl hover:shadow-black/10 transition-all">View all products</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-gray-50 overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 flex flex-col h-full"
              >
                <Link href={`/store/${product.slug || product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200 uppercase font-black text-[10px] tracking-widest px-6 text-center leading-tight">
                      {product.name}
                    </div>
                  )}
                  {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-white px-4 py-1.5 rounded-full text-[10px] font-black text-gray-400 shadow-xl uppercase tracking-widest border border-gray-100">Sold Out</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl border border-white shadow-xl">
                      <ArrowRight className="w-4 h-4 text-black" />
                    </div>
                  </div>
                </Link>

                <div className="p-4 sm:p-7 flex-1 flex flex-col">
                  <div className="mb-4 sm:mb-6">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">{product.category || 'Hardware'}</p>
                    <Link href={`/store/${product.slug || product.id}`}>
                      <h2 className="text-sm sm:text-xl font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-2 leading-[1.1]">{product.name}</h2>
                    </Link>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-base sm:text-2xl font-black text-black tracking-tight">{product.price.toLocaleString()}</span>
                      <span className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">XAF</span>
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
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl transition-all duration-500 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg hover:shadow-black/10 ${added
              ? "bg-green-500 text-white"
              : "bg-black text-white hover:bg-gray-800 active:scale-95"
              } disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer group/btn`}
          >
            {added ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-in zoom-in duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:scale-110 transition-transform" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="font-black uppercase tracking-widest text-[10px] bg-black text-white border-none py-2 px-4 rounded-xl shadow-2xl">
          {product.stock <= 0 ? "Unavailable" : "Add to Cart"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
