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
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-20 sm:py-32 text-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-green-50 text-green-500 rounded-[2rem] flex items-center justify-center mx-auto mb-10 animate-bounce">
            <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-black mb-6 uppercase tracking-tighter leading-none">Order Received!</h1>
          <p className="text-gray-400 text-base sm:text-xl mb-10 leading-relaxed font-medium">
            Thank you, <span className="text-black font-black">{formData.name}</span>!
            Your order ID is <code className="bg-gray-50 border border-gray-100 px-3 py-1 rounded-lg font-mono font-black text-black">{orderInfo?.orderId?.slice(0, 8).toUpperCase()}</code>.
          </p>

          <div className="bg-blue-50/50 border border-blue-100 rounded-[2rem] p-8 sm:p-10 mb-12 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-1000"></div>
            <h3 className="font-black text-blue-900 mb-4 flex items-center gap-3 uppercase tracking-tighter text-lg">
              <CreditCard className="w-6 h-6" />
              Payment Instruction
            </h3>
            <p className="text-blue-800 text-sm sm:text-base leading-relaxed font-medium">
              We have initiated a MoMo payment request to <span className="font-black border-b-2 border-blue-200">{formData.phone}</span>.
              Please check your phone and enter your PIN to confirm the payment of <span className="font-black text-black text-lg">{totalAmount.toLocaleString()} XAF</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/store" className="bg-black text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-xl hover:shadow-black/20">
              Continue Shopping
            </Link>
            <Link href="/" className="bg-gray-50 text-gray-500 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-all border border-gray-100">
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20">
          {/* Checkout Form */}
          <div className="space-y-10">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-black mb-4 uppercase tracking-tighter leading-none">Checkout</h1>
              <p className="text-gray-400 font-medium text-sm sm:text-lg">Provide your details to complete the order.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white rounded-[2rem] border border-gray-50 p-8 sm:p-10 shadow-2xl shadow-black/5 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 flex items-center gap-2">
                      <User className="w-3 h-3" /> Full Name
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Glenn Dev"
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all font-bold text-black placeholder:text-gray-200 placeholder:font-medium"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="hello@wi-con.com"
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all font-bold text-black placeholder:text-gray-200 placeholder:font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 flex items-center gap-2">
                    <Phone className="w-3 h-3" /> MoMo / Orange Number
                  </label>
                  <input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="6xxxxxxxx"
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all font-black text-black tracking-widest placeholder:text-gray-200 placeholder:font-medium text-lg placeholder:text-sm"
                  />
                  <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Confirmed instantly via SMS and MoMo Push.</p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Delivery Address
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Describe your location (e.g. Molyko, Buea)"
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 h-32 focus:ring-2 focus:ring-black outline-none transition-all resize-none font-bold text-black placeholder:text-gray-200 placeholder:font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.2)] disabled:opacity-20 group active:scale-95"
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

          <div className="lg:pl-16 border-t lg:border-t-0 lg:border-l border-gray-100 pt-12 lg:pt-0">
            <div className="sticky top-24 space-y-10">
              <h2 className="text-lg font-black text-black uppercase tracking-tighter border-b border-gray-50 pb-6">Order Summary</h2>

              <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 scrollbar-hide">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-2xl border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden group-hover:border-black transition-colors duration-500">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="text-[8px] font-black text-gray-300 text-center uppercase p-2 leading-tight">{item.name}</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <p className="text-sm sm:text-base font-bold text-black truncate leading-tight mb-1">{item.name}</p>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <div className="py-1 text-right">
                      <p className="text-sm sm:text-base font-black text-black tracking-tight">{(item.price * item.quantity).toLocaleString()}</p>
                      <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest leading-none">XAF</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-50">
                <div className="flex justify-between text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                  <span>Subtotal</span>
                  <span className="text-black">{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                  <span>Shipping</span>
                  <span className="text-green-600">Free Promo</span>
                </div>
                <div className="pt-8 border-t-2 border-dashed border-gray-100 flex justify-between items-end text-black">
                  <span className="text-sm font-black uppercase tracking-widest text-gray-400">Total Due</span>
                  <div className="text-right">
                    <span className="block text-4xl font-black tracking-tighter leading-none">{totalAmount.toLocaleString()}</span>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mt-2 block">CFA Francs</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-950 p-8 rounded-[2rem] flex items-center gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-6 h-6 text-white/20" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Secure Transaction</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase tracking-tight">Encrypted by Fapshi Cameroon. Your data is protected by WiCon security protocols.</p>
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
