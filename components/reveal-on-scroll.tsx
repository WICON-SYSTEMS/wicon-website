"use client"

import { useEffect } from "react"

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight * 0.9 && rect.bottom > 0
}

export default function RevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return

    document.documentElement.classList.add("reveal-enhanced")

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    )
    if (elements.length === 0) return

    const reveal = (el: HTMLElement) => {
      el.classList.add("inView")
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement)
            io.unobserve(entry.target)
          }
        })
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    )

    elements.forEach((el) => {
      if (isInViewport(el)) {
        reveal(el)
      } else {
        io.observe(el)
      }
    })

    return () => {
      document.documentElement.classList.remove("reveal-enhanced")
      io.disconnect()
    }
  }, [])

  return null
}
