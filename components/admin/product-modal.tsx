"use client"

import { useState, useEffect } from "react"
import { Loader2, X, Upload, Check } from "lucide-react"
import { toast } from "sonner"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  product?: any // If provided, we are editing
  adminHeaders: { "x-admin-username": string; "x-admin-passcode": string }
}

export function ProductModal({ isOpen, onClose, onSuccess, product, adminHeaders }: ProductModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    stock: "0",
    status: "active",
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        imageUrl: product.imageUrl || "",
        category: product.category || "",
        stock: product.stock?.toString() || "0",
        status: product.status || "active",
      })
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "",
        stock: "0",
        status: "active",
      })
    }
  }, [product, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products"
      const method = product ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...adminHeaders,
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.ok) {
        toast.success(product ? "Product updated" : "Product created")
        onSuccess()
        onClose()
      } else {
        toast.error(data.error || "Failed to save product")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between p-8 border-b border-gray-50">
          <div>
            <h2 className="text-2xl font-black text-black">
              {product ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-gray-400 text-sm font-medium">Capture the details of your hardware solution.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-fill bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Product Name</label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. WiCon Smart Hub"
                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all font-medium appearance-none"
              >
                <option value="">Select Category</option>
                <option value="Security">Security</option>
                <option value="Automation">Automation</option>
                <option value="Energy">Energy</option>
                <option value="Hardware">Other Hardware</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us about this product..."
              className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 h-32 focus:ring-2 focus:ring-black outline-none transition-all font-medium resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Price (XAF)</label>
              <input
                required
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="50000"
                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Stock Level</label>
              <input
                required
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="10"
                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all font-bold appearance-none"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Image URL</label>
            <div className="flex gap-4">
              <input
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..."
                className="flex-1 bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all font-medium text-sm"
              />
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-dashed border-gray-200">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-6 h-6 text-gray-300" />
                )}
              </div>
            </div>
          </div>
        </form>

        <div className="p-8 pt-0 mt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-black text-white py-5 rounded-[1.5rem] font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-black/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                {product ? "Update Product" : "Create Product"}
                <Check className="w-6 h-6" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
