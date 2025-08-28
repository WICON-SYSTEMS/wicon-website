"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const tips = [
  "Preparing content…",
  "Fetching data…",
  "Optimizing for performance…",
]

export default function Loading() {
  const [elapsed, setElapsed] = useState(0)
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000)
    const r = setInterval(() => setTipIndex((i) => (i + 1) % tips.length), 3000)
    return () => {
      clearInterval(t)
      clearInterval(r)
    }
  }, [])

  const showSlowNote = elapsed >= 5

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white text-black">
      {/* Live region for screen readers */}
      <span className="sr-only" role="status" aria-live="polite">
        Loading, {elapsed} seconds elapsed
      </span>

      <div className="flex w-full max-w-sm flex-col items-center gap-6 px-6">
        <div className="relative h-28 w-28">
          {/* Spinning halo */}
          <div
            className="absolute inset-0 rounded-full border-2 border-black/10"
            aria-hidden="true"
          />
          <div
            className="absolute inset-2 rounded-full border-2 border-black/20 border-t-transparent animate-spin"
            aria-hidden="true"
            style={{ animationDuration: "1.2s" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/wicon-logo.png"
              alt="WiCon Systems"
              width={96}
              height={96}
              priority
              className="select-none"
            />
          </div>
        </div>

        {/* Indeterminate progress bar */}
        <div className="w-full">
          <div className="h-1 w-full overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full w-1/3 rounded-full bg-black animate-[loader_1.6s_ease-in-out_infinite]"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Text feedback */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium tracking-wide">
            {tips[tipIndex]}
          </p>
          <p className="text-xs text-black/60">
            Loading… {elapsed}s
          </p>
          {showSlowNote && (
            <p className="text-xs text-black/60">
              Still working. Your network may be slow — please wait.
            </p>
          )}
        </div>
      </div>

      {/* Keyframes for the indeterminate bar */}
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
