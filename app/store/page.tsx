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

      <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-8 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 sm:mb-16 mt-4 sm:mt-0">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight ">WiCon Ltd. STORE</h1>
              <img src="/icons/store.png" className="w-10 h-10 object-contain" alt="Store" />
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Premium automation and electrical solutions.</p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((c: any) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 cursor-pointer rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${category === c
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
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
                  <div className="mb-3 sm:mb-5">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">{product.category || 'Hardware'}</p>
                    <Link href={`/store/${product.slug || product.id}`}>
                      <h2 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-2 leading-[1.3]">{product.name}</h2>
                    </Link>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-sm sm:text-lg font-black text-black tracking-tight">{product.price.toLocaleString()}</span>
                      <span className="text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-widest">XAF</span>
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
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] transition-all duration-500 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm hover:shadow-md ${added
              ? "bg-green-500 text-white"
              : "bg-black text-white hover:bg-gray-800 active:scale-95"
              } disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer group/btn`}
          >
            {added ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-in zoom-in duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <ShoppingCart className="w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover/btn:scale-110 transition-transform" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="font-black uppercase tracking-widest text-[9px] bg-black text-white border-none py-1.5 px-3 rounded-lg shadow-2xl">
          {product.stock <= 0 ? "Unavailable" : "Add to Cart"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
