"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export default function RouteLoader() {
  const pathname = usePathname()
  const prevPath = useRef<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  // Show the overlay for at least 5 seconds on every route change
  useEffect(() => {
    if (prevPath.current === null) {
      // First render, just record path; app/loading.tsx covers initial load
      prevPath.current = pathname
      return
    }

    if (pathname !== prevPath.current) {
      prevPath.current = pathname
      setVisible(true)
      setElapsed(0)

      const tick = setInterval(() => setElapsed((e) => e + 1), 1000)
      const minShow = setTimeout(() => {
        // allow fade-out after minimum time
        setVisible(false)
      }, 3000)

      // Safety timeout: hide after 25s regardless
      const hardStop = setTimeout(() => setVisible(false), 25000)

      return () => {
        clearInterval(tick)
        clearTimeout(minShow)
        clearTimeout(hardStop)
      }
    }
  }, [pathname])

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-0 z-[60] transition-opacity duration-400 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-white/95" />
      <div className="relative z-[61] flex h-full w-full items-center justify-center text-black">
        <div className="flex w-full max-w-sm flex-col items-center gap-6 px-6">
          <div className="relative h-28 w-28">
            <div className="absolute inset-0 rounded-full border-2 border-black/10" aria-hidden="true" />
            <div
              className="absolute inset-2 rounded-full border-2 border-black/20 border-t-transparent animate-spin"
              style={{ animationDuration: "1.2s" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image src="/wicon-logo.png" alt="WiCon Systems" width={96} height={96} priority className="select-none" />
            </div>
          </div>

          <div className="w-full">
            <div className="h-1 w-full overflow-hidden rounded-full bg-black/10">
              <div className="h-full w-1/3 rounded-full bg-black animate-[loader_1.6s_ease-in-out_infinite]" />
            </div>
          </div>

          {/* <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-xs text-black/60">Preparing page…</p>
            <p className="text-[11px] text-black/50">Loading… {elapsed}s</p>
          </div> */}
        </div>
      </div>

      <style jsx>{`
        @keyframes loader {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}
