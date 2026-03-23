"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/components/cart-context"
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalAmount, totalCount } = useCart()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-black text-black mb-8 sm:mb-12 flex items-center gap-4 uppercase tracking-tighter">
          Shopping Cart
          <img src="/icons/cart.gif" alt="Cart" className="w-12 h-12" />
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-[2rem] border border-gray-50 p-12 sm:p-20 text-center shadow-2xl shadow-black/5">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 rotate-3">
              <ShoppingBag className="w-10 h-10 sm:w-14 sm:h-14 text-gray-200" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black mb-4 uppercase tracking-tighter">Your cart is empty</h2>
            <p className="text-gray-400 mb-10 max-w-sm mx-auto font-medium">Looks like you haven't added anything to your cart yet. Explore our professional solutions!</p>
            <Link href="/store">
              <button className="bg-black text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all flex items-center justify-center gap-3 mx-auto shadow-xl hover:shadow-black/20">
                <ArrowLeft className="w-4 h-4" />
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-[1.5rem] border border-gray-50 p-4 sm:p-7 shadow-sm flex items-center gap-4 sm:gap-8 group hover:border-black transition-all duration-500">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[8px] sm:text-[10px] text-gray-300 font-black uppercase p-4 text-center leading-tight">
                        {item.name}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-2 sm:mb-4">
                      <div>
                        <h3 className="text-sm sm:text-xl font-bold text-gray-900 line-clamp-1 leading-tight">{item.name}</h3>
                        <p className="text-black font-black text-sm sm:text-lg mt-1 tracking-tight">{item.price.toLocaleString()} <span className="text-[10px] text-gray-400">XAF</span></p>
                      </div>
                      <div className="hidden sm:block text-right">
                        <p className="text-xl font-black text-black">{(item.price * item.quantity).toLocaleString()}</p>
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Total XAF</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 mt-2">
                      <div className="flex items-center border border-gray-100 rounded-xl bg-gray-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 sm:p-3 hover:bg-white transition-colors"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-black" />
                        </button>
                        <span className="w-6 sm:w-10 text-center font-black text-xs sm:text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 sm:p-3 hover:bg-white transition-colors"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-black" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <Link href="/store" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black pt-4 transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Store
              </Link>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2rem] border border-gray-50 p-8 sm:p-10 shadow-2xl shadow-black/5 sticky top-24">
                <h2 className="text-lg sm:text-xl font-black text-black mb-8 uppercase tracking-tighter">Order Summary</h2>

                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-gray-400 text-sm font-bold uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-black">{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm font-bold uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-green-600">Calculated later</span>
                  </div>
                  <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-sm font-black uppercase tracking-tighter">Total</span>
                    <div className="text-right">
                      <span className="block text-3xl font-black text-black leading-none">{totalAmount.toLocaleString()}</span>
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">XAF Amount</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <button className="w-full bg-black text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-black/20 group">
                    Checkout Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <p className="text-xs text-center text-gray-400 mt-6 font-medium leading-relaxed">
                  Fast delivery within Buea, Douala, and Yaoundé.
                  Payment via MTN and Orange MoMo confirmed instantly.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
