"use client"

import { useCart } from "./cart-context"
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, CreditCard } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export function CartDrawer() {
  const { items, totalAmount, totalCount, removeItem, updateQuantity, isOpen, setIsOpen } = useCart()

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300" 
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-black">Your Cart</h2>
            <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {totalCount}
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-gray-200" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Cart is empty</h3>
              <p className="text-gray-400 text-sm max-w-[200px] mb-8">Looks like you haven't added any products yet.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <Link 
                  href={`/store/${item.slug || item.id}`} 
                  onClick={() => setIsOpen(false)}
                  className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0"
                >
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-300 p-2 text-center uppercase">
                      {item.name}
                    </div>
                  )}
                </Link>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link 
                        href={`/store/${item.slug || item.id}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <h4 className="font-bold text-black text-sm line-clamp-2 hover:underline">{item.name}</h4>
                      </Link>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-black font-black mt-1">{item.price.toLocaleString()} XAF</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-black hover:bg-white rounded-lg transition-all"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-black hover:bg-white rounded-lg transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-8 border-t border-gray-100 @container">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Amount</span>
              <span className="text-2xl font-black text-black">{totalAmount.toLocaleString()} XAF</span>
            </div>
            
            <div className="space-y-3">
              <Link 
                href="/checkout" 
                onClick={() => setIsOpen(false)}
                className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-xl hover:shadow-black/20"
              >
                Checkout Now
                <CreditCard className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link 
                href="/cart" 
                onClick={() => setIsOpen(false)}
                className="w-full bg-gray-50 text-gray-900 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
              >
                View Full Cart
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <p className="text-[10px] text-gray-400 text-center mt-6 font-medium"> Free delivery on orders over 150,000 XAF</p>
          </div>
        )}
      </div>
    </div>
  )
}
