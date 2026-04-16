"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"

const STORAGE_PASS = "admin@wicon"
const STORAGE_USER = "admin"

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [order, setOrder] = useState<any>(null)

  const [creds, setCreds] = useState({ user: "", pass: "" })

  useEffect(() => {
    const u = localStorage.getItem(STORAGE_USER) || ""
    const p = localStorage.getItem(STORAGE_PASS) || ""
    if (!u || !p) {
      router.push("/admin")
      return
    }
    setCreds({ user: u, pass: p })
  }, [router])

  useEffect(() => {
    if (!creds.user || !creds.pass) return

    async function load() {
      try {
        const res = await fetch(`/api/admin/orders/${id}`, {
          headers: {
            "x-admin-username": creds.user,
            "x-admin-passcode": creds.pass,
          },
        })
        if (!res.ok) throw new Error("Failed to load order")
        const data = await res.json()
        setOrder(data.item)
      } catch (e: any) {
        toast.error(e?.message)
        router.push("/admin")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, creds, router])

  async function updateOrder(updates: any) {
    setUpdating(true)
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-username": creds.user,
          "x-admin-passcode": creds.pass,
        },
        body: JSON.stringify(updates),
      })

      if (!res.ok) throw new Error(await res.text())

      toast.success("Order updated successfully")
      setOrder({ ...order, ...updates })
    } catch (e: any) {
      toast.error(e?.message || "Failed to update order")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return <div className="p-12 text-center">Loading...</div>
  if (!order) return <div className="p-12 text-center">Order not found</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-mono">ORDER #{order.id.slice(0, 8).toUpperCase()}</h1>
          <button onClick={() => router.push("/admin")} className="text-sm underline cursor-pointer">Back to Dashboard</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Customer & Address */}
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium">{order.customer_name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{order.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">{order.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">{new Date(order.created_at).toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Shipping Address</p>
                  <p className="font-medium">{order.address}</p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              <div className="divide-y">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {item.product?.image_url && (
                        <img src={item.product.image_url} className="h-12 w-12 rounded object-cover border" alt="" />
                      )}
                      <div>
                        <p className="font-medium">{item.product?.name || "Unknown Product"}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity} × {item.price.toLocaleString()} XAF</p>
                      </div>
                    </div>
                    <p className="font-medium">{(item.quantity * item.price).toLocaleString()} XAF</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>{order.total_amount.toLocaleString()} XAF</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Payment Status */}
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Payment</h2>
              <div className="space-y-4">
                <div className={`text-center py-2 rounded-lg font-bold text-sm ${order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {order.payment_status.toUpperCase()}
                </div>
                {order.fapshi_trans_id && (
                  <div className="text-xs">
                    <p className="text-gray-500">Fapshi Trans ID</p>
                    <p className="font-mono break-all">{order.fapshi_trans_id}</p>
                  </div>
                )}
                <div className="pt-2">
                  <label className="text-xs text-gray-500 block mb-1">Update Payment Status</label>
                  <select
                    value={order.payment_status}
                    disabled={updating}
                    onChange={(e) => updateOrder({ paymentStatus: e.target.value })}
                    className="w-full border rounded text-sm px-2 py-1 outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Fulfillment Status */}
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Fulfillment</h2>
              <div className="space-y-4">
                <div className={`text-center py-2 rounded-lg font-bold text-sm ${order.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                  {order.status.toUpperCase()}
                </div>
                <div className="pt-2">
                  <label className="text-xs text-gray-500 block mb-1">Update Order Status</label>
                  <select
                    value={order.status}
                    disabled={updating}
                    onChange={(e) => updateOrder({ status: e.target.value })}
                    className="w-full border rounded text-sm px-2 py-1 outline-none"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
