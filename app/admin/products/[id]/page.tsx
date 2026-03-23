"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"

const STORAGE_PASS = "admin@wicon"
const STORAGE_USER = "admin"

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    stock: "0",
    status: "active",
  })

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
        const res = await fetch(`/api/admin/products/${id}`, {
          headers: {
            "x-admin-username": creds.user,
            "x-admin-passcode": creds.pass,
          },
        })
        if (!res.ok) throw new Error("Failed to load product")
        const data = await res.json()
        const p = data.item
        setFormData({
          name: p.name,
          description: p.description || "",
          price: String(p.price),
          imageUrl: p.imageUrl || "",
          category: p.category || "",
          stock: String(p.stock),
          status: p.status,
        })
      } catch (e: any) {
        toast.error(e?.message)
        router.push("/admin")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, creds, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-username": creds.user,
          "x-admin-passcode": creds.pass,
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error(await res.text())

      toast.success("Product updated successfully")
      router.push("/admin")
    } catch (e: any) {
      toast.error(e?.message || "Failed to update product")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product?")) return
    setSaving(true)

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-username": creds.user,
          "x-admin-passcode": creds.pass,
        },
      })

      if (!res.ok) throw new Error(await res.text())

      toast.success("Product deleted successfully")
      router.push("/admin")
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete product")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-12 text-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:underline"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 h-32 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (XAF) *
                </label>
                <input
                  required
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              disabled={saving}
              type="button"
              onClick={handleDelete}
              className="flex-1 border border-red-300 text-red-700 rounded-lg py-3 font-semibold hover:bg-red-50 transition disabled:opacity-50"
            >
              Delete
            </button>
            <button
              disabled={saving}
              type="submit"
              className="flex-[2] bg-black text-white rounded-lg py-3 font-semibold hover:bg-gray-800 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
