"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export default function TopProgress() {
  const pathname = usePathname()
  const prevPath = useRef<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    if (prevPath.current === null) {
      prevPath.current = pathname
      return
    }
    if (pathname !== prevPath.current) {
      prevPath.current = pathname
      // Show the bar and restart animation
      setVisible(true)
      setAnimKey((k) => k + 1)

      // Keep it visible briefly to cover render
      const minShow = setTimeout(() => setVisible(false), 1200)
      return () => clearTimeout(minShow)
    }
  }, [pathname])

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative h-full w-full bg-black/10">
        <div
          key={animKey}
          className="absolute left-0 top-0 h-full w-1/3 bg-black animate-[tp_1.2s_ease-in-out_infinite]"
        />
      </div>
      <style jsx>{`
        @keyframes tp {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(200%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-[tp_1.2s_ease-in-out_infinite] { animation: none; }
        }
      `}</style>
    </div>
  )
}
