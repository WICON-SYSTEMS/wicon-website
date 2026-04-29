"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/components/cart-context"
import { toast } from "sonner"
import { Loader2, CheckCircle2, ShoppingBag, CreditCard, User, Mail, Phone, MapPin, FileText, X, RefreshCw } from "lucide-react"

import Link from "next/link"
import { useRouter } from "next/navigation"

const SHIPPING_THRESHOLD: number = 50000
const SHIPPING_FEE: number = 0

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalAmount, clearCart } = useCart()

  const shippingCost = totalAmount >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const finalTotal = totalAmount + shippingCost
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [orderInfo, setOrderInfo] = useState<any>(null)
  // "pending" | "paid" | "failed" | "expired"
  const [paymentStatus, setPaymentStatus] = useState<string>("pending")
  const [pollTimeout, setPollTimeout] = useState(false) // true if 5min elapsed without confirmation
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)

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
          amount: finalTotal,
          shipping: shippingCost
        }),
      })

      const data = await res.json()
      if (data.ok) {
        setOrderInfo({ ...data, amount: finalTotal, subtotal: totalAmount, shipping: shippingCost, items: [...items] })
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

  /**
   * Payment Status Polling (Optimized)
   * 
   * Features:
   * 1. Visibility Check: Stops polling if user switches tabs to save resources.
   * 2. Exponential Backoff: Reduces frequency over time (4s -> 8s -> 15s).
   * 3. Hard Timeout: Stops after 5 minutes with a fallback "Check Again" button.
   */
  useEffect(() => {
    if (!success || !orderInfo?.orderId || paymentStatus !== "pending") return;

    let stopped = false;
    let timeoutId: any;
    let currentInterval = 4000; // Start at 4 seconds
    const startTime = Date.now();
    const MAX_WAIT = 5 * 60 * 1000; // 5 minute hard limit

    const checkStatus = async () => {
      if (stopped || document.hidden) {
        // If tab is hidden, skip this check and wait for visibility
        timeoutId = setTimeout(checkStatus, currentInterval);
        return;
      }

      if (Date.now() - startTime > MAX_WAIT) {
        setPollTimeout(true);
        stopped = true;
        clearTimeout(timeoutId);
        return;
      }

      try {
        const res = await fetch(`/api/orders/${orderInfo.orderId}`);
        const data = await res.json();
        
        if (data.ok) {
          const status = data.order.paymentStatus;
          if (status === "paid") {
            setPaymentStatus("paid");
            stopped = true;
            return;
          } else if (status === "failed") {
            setPaymentStatus("failed");
            stopped = true;
            return;
          }
        }
      } catch (e) {
        console.error("Polling error:", e);
      }

      // Backoff logic: increase interval slowly up to 15 seconds
      if (currentInterval < 15000) {
        currentInterval += 1000; 
      }
      
      timeoutId = setTimeout(checkStatus, currentInterval);
    };

    // Start polling
    timeoutId = setTimeout(checkStatus, currentInterval);

    // Event listener for tab visibility
    const handleVisibilityChange = () => {
      if (!document.hidden && !stopped) {
        // User came back! Reset interval and check immediately
        currentInterval = 4000;
        checkStatus();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopped = true;
      clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [success, orderInfo?.orderId, paymentStatus]);

  const handleDownloadReceipt = async () => {
    if (isGeneratingPdf) return
    if (paymentStatus !== "paid") {
      toast.error("Receipts are only available after successful payment confirmation.")
      return
    }
    setIsGeneratingPdf(true)

    try {
      // Dynamically import jsPDF to keep bundle small
      const { default: jsPDF } = await import('jspdf')
      const { default: autoTable } = await import('jspdf-autotable')

      const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
      const pageW = doc.internal.pageSize.getWidth()
      const pageH = doc.internal.pageSize.getHeight()
      const margin = 15
      const contentW = pageW - margin * 2

      // ── Header bar ──────────────────────────────────────────
      doc.setFillColor(17, 24, 39) // #111827
      doc.rect(0, 0, pageW, 28, 'F')

      // Logo image (base64 fetch from public)
      try {
        const logoRes = await fetch('/wicon-logo.png')
        const logoBlob = await logoRes.blob()
        const logoB64 = await new Promise<string>((res) => {
          const reader = new FileReader()
          reader.onload = () => res(reader.result as string)
          reader.readAsDataURL(logoBlob)
        })
        doc.addImage(logoB64, 'PNG', margin, 4, 40, 18)
      } catch {
        // Logo failed to load – just show text
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('WiCon Ltd.', margin, 17)
      }

      // RECEIPT label on right of header
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(18)
      doc.setFont('helvetica', 'bold')
      doc.text('RECEIPT', pageW - margin, 16, { align: 'right' })

      // ── Order meta ──────────────────────────────────────────
      let y = 36
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(107, 114, 128) // gray-500
      const orderId = (orderInfo?.orderId || '').slice(0, 8).toUpperCase() || 'N/A'
      const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      doc.text(`ORDER ID: ${orderId}`, pageW - margin, y, { align: 'right' })
      doc.text(`DATE: ${dateStr}`, pageW - margin, y + 5, { align: 'right' })

      // ── Company & Customer Info ──────────────────────────────
      y = 48

      // Company (left)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(156, 163, 175)
      doc.text('FROM', margin, y)

      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(17, 24, 39)
      doc.text('WiCon Ltd.', margin, y + 6)

      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(75, 85, 99)
      doc.text('Cameroon', margin, y + 12)
      doc.text('office@wiconltd.com', margin, y + 17)
      doc.text('+237 670791815', margin, y + 22)

      // Customer (right)
      const colRight = pageW / 2 + 5
      doc.setFontSize(7)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(156, 163, 175)
      doc.text('BILLED TO', colRight, y)

      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(17, 24, 39)
      doc.text(formData.name || 'Customer', colRight, y + 6)

      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(75, 85, 99)
      if (formData.address) doc.text(formData.address, colRight, y + 12)
      doc.text(formData.phone, colRight, formData.address ? y + 17 : y + 12)
      if (formData.email) doc.text(formData.email, colRight, formData.address ? y + 22 : y + 17)

      // ── Divider ─────────────────────────────────────────────
      y = 80
      doc.setDrawColor(229, 231, 235)
      doc.setLineWidth(0.3)
      doc.line(margin, y, pageW - margin, y)

      // ── Items Table ─────────────────────────────────────────
      y = 84

      const receiptItems: any[] = orderInfo?.items || []
      const tableBody = receiptItems.map((item: any) => [
        item.name,
        String(item.quantity),
        `${(item.price || 0).toLocaleString()} XAF`,
        `${((item.price || 0) * (item.quantity || 1)).toLocaleString()} XAF`,
      ])

      autoTable(doc, {
        startY: y,
        head: [['DESCRIPTION', 'QTY', 'UNIT PRICE', 'TOTAL']],
        body: tableBody,
        margin: { left: margin, right: margin },
        styles: {
          fontSize: 9,
          cellPadding: 4,
          textColor: [17, 24, 39],
          lineColor: [229, 231, 235],
          lineWidth: 0.2,
        },
        headStyles: {
          fillColor: [249, 250, 251],
          textColor: [107, 114, 128],
          fontStyle: 'bold',
          halign: 'left',
        },
        columnStyles: {
          0: { cellWidth: contentW * 0.45 },
          1: { halign: 'center', cellWidth: contentW * 0.1 },
          2: { halign: 'right', cellWidth: contentW * 0.22 },
          3: { halign: 'right', cellWidth: contentW * 0.23, fontStyle: 'bold' },
        },
        alternateRowStyles: { fillColor: [255, 255, 255] },
      })

      // ── Totals block ────────────────────────────────────────
      const afterTable = (doc as any).lastAutoTable?.finalY ?? y + 20
      const totalsX = pageW - margin - 80
      let ty = afterTable + 8

      const subtotal = orderInfo?.subtotal ?? 0
      const shipping = orderInfo?.shipping ?? 0
      const total = orderInfo?.amount ?? 0

      const drawTotalRow = (label: string, value: string, bold = false, highlight = false) => {
        doc.setFont('helvetica', bold ? 'bold' : 'normal')
        doc.setFontSize(bold ? 10 : 9)
        doc.setTextColor(highlight ? 22 : (bold ? 17 : 107), highlight ? 163 : (bold ? 24 : 114), highlight ? 74 : (bold ? 39 : 128))
        doc.text(label, totalsX, ty)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(17, 24, 39)
        doc.text(value, pageW - margin, ty, { align: 'right' })
        ty += 6
      }

      drawTotalRow('Subtotal', `${subtotal.toLocaleString()} XAF`)
      drawTotalRow('Shipping', shipping === 0 ? 'Free' : `${shipping.toLocaleString()} XAF`, false, shipping === 0)

      // Divider above total
      ty += 1
      doc.setDrawColor(229, 231, 235)
      doc.line(totalsX, ty, pageW - margin, ty)
      ty += 4

      drawTotalRow('TOTAL PAID', `${total.toLocaleString()} XAF`, true)

      // ── Footer ──────────────────────────────────────────────
      const footerY = pageH - 18
      doc.setDrawColor(229, 231, 235)
      doc.line(margin, footerY, pageW - margin, footerY)
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(107, 114, 128)
      doc.text('Thank you for your business! This is an automated payment receipt generated by WiCon Ltd.', pageW / 2, footerY + 5, { align: 'center' })

      const filename = `WiCon_Ltd_Receipt_${orderId}.pdf`
      doc.save(filename)
      toast.success('Receipt downloaded!')
    } catch (err) {
      console.error('PDF Error:', err)
      toast.error('Failed to generate receipt. Please try again.')
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const handleManualRefresh = async () => {
    if (isCheckingStatus || !orderInfo?.orderId) return;
    setIsCheckingStatus(true);
    try {
      const res = await fetch(`/api/orders/${orderInfo.orderId}`);
      const data = await res.json();
      if (data.ok) {
        const updatedStatus = data.order.paymentStatus;
        if (updatedStatus === "paid") {
          setPaymentStatus("paid");
          toast.success("Payment confirmed!");
        } else if (updatedStatus === "failed") {
          setPaymentStatus("failed");
          toast.error("Payment failed or cancelled.");
        } else {
          toast.info("Payment is still pending. Please wait or check your phone.");
        }
      }
    } catch (e) {
      console.error("Manual refresh error:", e);
      toast.error("Could not verify status.");
    } finally {
      setIsCheckingStatus(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-16 sm:py-24">

          {/* ── STATE: PAYMENT PENDING ──────────────────────────────── */}
          {paymentStatus === "pending" && (
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                <Loader2 className="w-10 h-10 animate-spin" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-black mb-4 uppercase tracking-tighter leading-none">Awaiting Payment</h1>
              <p className="text-gray-400 text-sm sm:text-base mb-10 font-medium">
                Order <code className="bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-lg font-mono font-black text-black text-xs">{orderInfo?.orderId?.slice(0, 8).toUpperCase()}</code> is ready.
              </p>

              <div className="bg-blue-50/60 border border-blue-100 rounded-[2rem] p-8 sm:p-10 text-left">
                <h3 className="font-black text-blue-900 mb-3 flex items-center gap-3 uppercase tracking-tighter">
                  <CreditCard className="w-5 h-5" />
                  Complete Your Payment
                </h3>
                <p className="text-blue-800 text-sm leading-relaxed font-medium mb-6">
                  A MoMo push notification has been sent to <span className="font-black border-b-2 border-blue-300">{formData.phone}</span>. Open your MoMo app or approve via SMS to pay <span className="font-black text-black">{orderInfo?.amount?.toLocaleString()} XAF</span>.
                </p>
                <div className="flex flex-wrap items-center gap-3 bg-white/70 py-3 px-4 rounded-2xl border border-blue-100/60">
                  {pollTimeout ? (
                    <button
                      onClick={handleManualRefresh}
                      disabled={isCheckingStatus}
                      className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px] hover:underline"
                    >
                      {isCheckingStatus ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                      Session timed out — check status manually
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-blue-500 font-black uppercase tracking-widest text-[10px]">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Waiting for confirmation... this page updates automatically
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── STATE: PAYMENT FAILED ───────────────────────────────── */}
          {paymentStatus === "failed" && (
            <div className="text-center">
              <div className="w-20 h-20 bg-red-50 text-red-400 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                <X className="w-10 h-10" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-black mb-4 uppercase tracking-tighter leading-none">Payment Failed</h1>
              <p className="text-gray-400 text-sm sm:text-base mb-10 font-medium max-w-sm mx-auto">
                The payment for order <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-black text-xs">{orderInfo?.orderId?.slice(0, 8).toUpperCase()}</code> was not completed. Please contact our team to resolve this.
              </p>
              <Link href="/store" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all">
                Return to Store
              </Link>
            </div>
          )}

          {/* ── STATE: PAYMENT CONFIRMED — RECEIPT PREVIEW ─────────── */}
          {paymentStatus === "paid" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-black mb-2 uppercase tracking-tighter leading-none">Payment Confirmed!</h1>
                <p className="text-gray-400 text-sm font-medium">Your receipt is ready. Review it below and download a copy.</p>
              </div>

              {/* ── Inline Receipt Preview ─────────────────────────── */}
              <div className="border border-gray-100 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/5 mb-8">
                {/* Header */}
                <div className="bg-gray-950 px-8 py-6 flex items-center justify-between">
                  <div>
                    <p className="text-white font-black text-lg tracking-tight">WiCon Ltd.</p>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Official Receipt</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-2xl tracking-tighter">RECEIPT</p>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">#{orderInfo?.orderId?.slice(0, 8).toUpperCase()}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="bg-gray-50 px-8 py-4 flex flex-wrap gap-x-8 gap-y-2 justify-between border-b border-gray-100 text-xs">
                  <div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] mb-0.5">Billed To</p>
                    <p className="font-black text-black">{formData.name}</p>
                    {formData.email && <p className="text-gray-500 font-medium">{formData.email}</p>}
                    <p className="text-gray-500 font-medium">{formData.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] mb-0.5">Date</p>
                    <p className="font-black text-black">{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] mt-1 mb-0.5">Status</p>
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Paid
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="px-8 py-6">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left text-[9px] font-black text-gray-400 uppercase tracking-widest pb-3 pr-4">Item</th>
                        <th className="text-center text-[9px] font-black text-gray-400 uppercase tracking-widest pb-3 w-10">Qty</th>
                        <th className="text-right text-[9px] font-black text-gray-400 uppercase tracking-widest pb-3 w-24">Unit Price</th>
                        <th className="text-right text-[9px] font-black text-gray-400 uppercase tracking-widest pb-3 w-24">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(orderInfo?.items || []).map((item: any, i: number) => (
                        <tr key={i} className="border-b border-gray-50">
                          <td className="py-3 pr-4 font-bold text-black text-xs">{item.name}</td>
                          <td className="py-3 text-center text-gray-500 font-bold">{item.quantity}</td>
                          <td className="py-3 text-right text-gray-500 font-bold">{(item.price || 0).toLocaleString()} XAF</td>
                          <td className="py-3 text-right font-black text-black">{((item.price || 0) * item.quantity).toLocaleString()} XAF</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="px-8 pb-8">
                  <div className="ml-auto w-56 space-y-2">
                    <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                      <span>Subtotal</span>
                      <span>{(orderInfo?.subtotal || 0).toLocaleString()} XAF</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-gray-500">Shipping</span>
                      <span className="text-green-600">{orderInfo?.shipping === 0 ? "Free" : `${(orderInfo?.shipping || 0).toLocaleString()} XAF`}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-black text-black">
                      <span>Total Paid</span>
                      <span>{(orderInfo?.amount || 0).toLocaleString()} XAF</span>
                    </div>
                  </div>
                </div>

                {/* Footer note */}
                <div className="bg-gray-50 border-t border-gray-100 px-8 py-4 text-center">
                  <p className="text-gray-400 text-[10px] font-medium">Thank you for your business! This is an official receipt from WiCon Ltd. · office@wiconltd.com · +237 670791815</p>
                </div>
              </div>

              {/* ── Actions ─────────────────────────────────────────── */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDownloadReceipt}
                  disabled={isGeneratingPdf}
                  className="bg-black text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-xl hover:shadow-black/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                  {isGeneratingPdf ? "Generating PDF..." : "Download PDF Receipt"}
                </button>
                <Link href="/store" className="bg-gray-50 text-gray-500 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-all border border-gray-100 flex items-center justify-center">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}

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
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-3xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none">Checkout</h1>
                <img src="/icons/checkout.png" alt="Checkout" className="w-12 h-12" />
              </div>
              <p className="text-gray-700 text-center font-medium text-sm sm:text-lg">Provide your details to complete the order.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white rounded-[2rem] border border-gray-50 p-8 sm:p-10 shadow-2xl shadow-black/5 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 flex items-center gap-2">
                      <User className="w-3 h-3" /> Full Name
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all font-bold text-black placeholder:text-gray-400 placeholder:font-medium"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all font-bold text-black placeholder:text-gray-400 placeholder:font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 flex items-center gap-2">
                    <Phone className="w-3 h-3" /> MoMo / Orange Number
                  </label>
                  <input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="6xxxxxxxx"
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all font-black text-black tracking-widest placeholder:text-gray-400 placeholder:font-medium text-lg placeholder:text-sm"
                  />
                  <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Confirmed instantly via SMS and MoMo Push.</p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Delivery Address
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Describe your location (e.g. Molyko, Buea)"
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 h-32 focus:ring-2 focus:ring-black outline-none transition-all resize-none font-bold text-black placeholder:text-gray-400 placeholder:font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black cursor-pointer text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.2)] disabled:opacity-20 group active:scale-95"
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
              <div className="flex items-center justify-center gap-4">
                <h2 className="text-lg font-black text-black uppercase tracking-tighter">Order Summary</h2>
                <img src="/icons/order-summary.png" alt="Order Summary" className="w-12 h-12" />
              </div>

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
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <div className="py-1 text-right">
                      <p className="text-sm sm:text-base font-black text-black tracking-tight">{(item.price * item.quantity).toLocaleString()}</p>
                      <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest leading-none">XAF</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-50">
                <div className="flex justify-between text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
                  <span>Subtotal</span>
                  <span className="text-black">{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? "text-green-600" : "text-black"}>
                    {shippingCost === 0 ? "Free Promo" : `${shippingCost.toLocaleString()} XAF`}
                  </span>
                </div>
                <div className="pt-8 border-t-2 border-dashed border-gray-100 flex justify-between items-end text-black">
                  <span className="text-sm font-black uppercase tracking-widest text-gray-600">Total Due</span>
                  <div className="text-right">
                    <span className="block text-4xl font-black tracking-tighter leading-none">{finalTotal.toLocaleString()}</span>
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mt-2 block">CFA Francs</span>
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
                  <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase tracking-tight">Encrypted. Your data is protected by WiCon security protocols.</p>
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
