"use client"

import { useEffect } from "react"

export default function RevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    if (elements.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            el.classList.add("inView")
            // Stop observing once revealed
            io.unobserve(el)
          }
        })
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    )

    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
