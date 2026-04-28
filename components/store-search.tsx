"use client"

import { useState, useRef } from "react"
import { Search, X, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface StoreSearchProps {
  onSearch: (query: string) => void
}

export function StoreSearch({ onSearch }: StoreSearchProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * Security Sanitization: Only allow alphanumeric, spaces, and basic punctuation.
   * This is performed silently in the background to prevent malicious scripts 
   * while maintaining a clean user experience.
   */
  const sanitize = (val: string) => {
    // 1. Strip HTML tags
    const noTags = val.replace(/<[^>]*>?/gm, "")
    // 2. Allow only: A-Z, a-z, 0-9, spaces, hyphens, and dots
    const sanitized = noTags.replace(/[^a-zA-Z0-9\s.-]/g, "")
    // 3. Limit length to 100 characters for safety
    return sanitized.slice(0, 100)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value
    const cleanVal = sanitize(rawVal)

    setQuery(cleanVal)
    onSearch(cleanVal)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-12 px-4 sm:px-0">
      <div
        className={cn(
          "relative group bg-white/70 backdrop-blur-xl border transition-all duration-500 rounded-3xl overflow-hidden",
          isFocused
            ? "border-black shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] scale-[1.02]"
            : "border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"
        )}
      >
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
          <Search className={cn(
            "w-5 h-5 transition-all duration-300",
            isFocused ? "text-black rotate-0" : "text-gray-400 -rotate-12"
          )} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search premium solutions..."
          className="w-full bg-transparent pl-16 pr-14 py-6 sm:py-7 text-sm sm:text-lg font-medium text-black placeholder:text-gray-400 focus:outline-none transition-all selection:bg-black selection:text-white"
        />

        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {query && (
            <button
              onClick={handleClear}
              className="p-2.5 hover:bg-black hover:text-white rounded-2xl transition-all duration-300 text-gray-400 active:scale-90 animate-in zoom-in fade-in"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Footer Info */}
      {/* <div className="mt-4 flex items-center justify-between px-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em]">
            {query ? `Refining results for "${query}"` : "Search Engine Active"}
          </p>
          <div className="h-0.5 w-full bg-gray-50 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-700 ease-out"
              style={{ width: query ? '100%' : '0%' }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 opacity-40 hover:opacity-100 transition-all cursor-help group">
           <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform" />
           <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Secure Input Active</span>
        </div>
      </div> */}
    </div>
  )
}
