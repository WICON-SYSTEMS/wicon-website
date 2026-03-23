"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/components/cart-context"
import { toast } from "sonner"
import { Loader2, CheckCircle2, ShoppingBag, CreditCard, User, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalAmount, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orderInfo, setOrderInfo] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setLoading(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items: items,
        }),
      })

      const data = await res.json()
      if (data.ok) {
        setOrderInfo(data)
        setSuccess(true)
        clearCart()
        toast.success(data.message || "Order placed successfully!")
      } else {
        toast.error(data.error || "Failed to place order")
      }
    } catch (e) {
      toast.error("An error occurred during checkout")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-24 text-center">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-black text-black mb-4">Order Received!</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Thank you, <span className="font-bold text-black">{formData.name}</span>! 
            Your order ID is <code className="bg-gray-100 px-2 py-1 rounded font-mono font-bold">{orderInfo?.orderId?.slice(0,8).toUpperCase()}</code>.
          </p>
          
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-12 text-left">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Instruction
            </h3>
            <p className="text-blue-800 text-sm leading-relaxed">
              We have initiated a MoMo payment request to <span className="font-bold">{formData.phone}</span>. 
              Please check your phone and enter your PIN to confirm the payment of <span className="font-black underline">{totalAmount.toLocaleString()} XAF</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/store" className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all">
              Continue Shopping
            </Link>
            <Link href="/" className="bg-gray-100 text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all">
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link href="/store" className="text-black font-bold underline">Go to Store</Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-black text-black mb-2">Checkout</h1>
              <p className="text-gray-500">Provide your details to complete the order.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <User className="w-3 h-3" /> Full Name
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Phone className="w-3 h-3" /> MoMo / Orange Number
                  </label>
                  <input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="67xxxxxxx / 69xxxxxxx"
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                  <p className="text-[10px] text-gray-400 font-medium">This number will be used for the payment request and delivery updates.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Delivery Address
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Describe your location (e.g. Molyko, opposite University of Buea)"
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 h-24 focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-5 rounded-3xl font-bold text-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-2xl hover:shadow-black/20 disabled:opacity-50 group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    Complete Order & Pay Now
                    <CreditCard className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>
              
              <p className="text-center text-[10px] text-gray-400 font-medium px-8">
                By clicking "Complete Order & Pay Now", you agree to pay via Mobile Money. 
                A payment request will be sent immediately to your phone.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-12 border-l border-gray-200">
            <div className="sticky top-24 space-y-8">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-[8px] font-bold text-gray-300 text-center uppercase p-1">{item.name}</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-black text-black">{(item.price * item.quantity).toLocaleString()} XAF</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">{totalAmount.toLocaleString()} XAF</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-xs">Free (Limited Offer)</span>
                </div>
                <div className="pt-4 border-t-2 border-dashed border-gray-200 flex justify-between items-center text-black">
                  <span className="text-lg font-black uppercase tracking-widest">Total</span>
                  <div className="text-right">
                    <span className="block text-3xl font-black">{totalAmount.toLocaleString()} XAF</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100/50 p-6 rounded-2xl flex items-center gap-4 border border-gray-200/50">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <ShoppingBag className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-0.5">Secure Transaction</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-medium">Payments are processed securely via Fapshi Cameroon. Your data is encrypted.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
