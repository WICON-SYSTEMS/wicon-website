"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type CartItem = {
  id: string
  name: string
  price: number
  imageUrl?: string | null
  quantity: number
  slug: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: any) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, q: number) => void
  clearCart: () => void
  totalCount: number
  totalAmount: number
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  toggleCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wicon-cart")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        localStorage.removeItem("wicon-cart")
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("wicon-cart", JSON.stringify(items))
  }, [items])

  const [isOpen, setIsOpen] = useState(false)
  const toggleCart = () => setIsOpen((v) => !v)

  const addItem = (product: any) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        imageUrl: product.imageUrl || product.image_url,
        quantity: 1,
        slug: product.slug
      }]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, q: number) => {
    if (q < 1) {
      removeItem(id)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: q } : i))
    )
  }

  const clearCart = () => setItems([])

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalAmount = items.reduce((sum, i) => sum + i.quantity * i.price, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        totalAmount,
        isOpen,
        setIsOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
