"use client"

import {
  LayoutGrid,
  Sun,
  Cpu,
  Zap,
  Battery,
  Wifi,
  Thermometer,
  Shield,
  Wrench,
  Cable,
  Box,
  Home,
  Building2,
  Settings2,
  MonitorSpeaker,
  Lightbulb,
  Gauge,
  Server,
  HardDrive,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface StoreCategoriesProps {
  categories: string[]
  activeCategory: string
  onSelect: (category: string) => void
  productCounts: Record<string, number>
}

// Map category keywords to icons using best-judgment for an electrical/automation company
const getCategoryIcon = (category: string) => {
  const lower = category.toLowerCase()
  if (lower === "all") return LayoutGrid
  if (lower.includes("solar") || lower.includes("photovoltaic") || lower.includes("pv")) return Sun
  if (lower.includes("automat") || lower.includes("plc") || lower.includes("control")) return Cpu
  if (lower.includes("electric") || lower.includes("power") || lower.includes("energy")) return Zap
  if (lower.includes("battery") || lower.includes("storage") || lower.includes("ups")) return Battery
  if (lower.includes("wifi") || lower.includes("network") || lower.includes("wireless") || lower.includes("iot")) return Wifi
  if (lower.includes("sensor") || lower.includes("therm") || lower.includes("temp")) return Thermometer
  if (lower.includes("secur") || lower.includes("cctv") || lower.includes("alarm")) return Shield
  if (lower.includes("tool") || lower.includes("install") || lower.includes("maint")) return Wrench
  if (lower.includes("cable") || lower.includes("wire") || lower.includes("wiring")) return Cable
  if (lower.includes("home") || lower.includes("residential") || lower.includes("smart home")) return Home
  if (lower.includes("industry") || lower.includes("industrial") || lower.includes("commercial")) return Building2
  if (lower.includes("light") || lower.includes("led") || lower.includes("lamp")) return Lightbulb
  if (lower.includes("meter") || lower.includes("measur") || lower.includes("monitor")) return Gauge
  if (lower.includes("server") || lower.includes("rack") || lower.includes("data")) return Server
  if (lower.includes("drive") || lower.includes("inverter") || lower.includes("vfd")) return HardDrive
  if (lower.includes("display") || lower.includes("hmi") || lower.includes("panel")) return MonitorSpeaker
  if (lower.includes("accessory") || lower.includes("accessories") || lower.includes("misc")) return Box
  if (lower.includes("config") || lower.includes("setting") || lower.includes("system")) return Settings2
  return Box // fallback
}

const getCategoryLabel = (category: string) => {
  if (category === "all") return "All Products"
  // Capitalize each word
  return category
    .split(/[\s_-]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export function StoreCategories({
  categories,
  activeCategory,
  onSelect,
  productCounts,
}: StoreCategoriesProps) {
  return (
    <aside className="w-full lg:w-64 xl:w-72 shrink-0">
      {/* Desktop: sticky vertical list */}
      <div className="hidden lg:flex flex-col sticky top-6">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4 px-1">
          Browse Catalog
        </p>

        <nav className="flex flex-col gap-1">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat)
            const isActive = activeCategory === cat
            const count = productCounts[cat] ?? 0

            return (
              <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={cn(
                  "group flex items-center gap-3.5 w-full text-left px-4 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer",
                  isActive
                    ? "bg-black text-white shadow-xl shadow-black/10"
                    : "text-gray-500 hover:bg-white hover:text-black hover:shadow-md hover:shadow-black/5"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                  isActive
                    ? "bg-white/10"
                    : "bg-gray-100 group-hover:bg-gray-900 group-hover:text-white"
                )}>
                  <Icon className="w-4 h-4" />
                </div>

                <span className={cn(
                  "text-[11px] font-black uppercase tracking-widest flex-1 leading-tight",
                  isActive ? "text-white" : "text-gray-600 group-hover:text-black"
                )}>
                  {getCategoryLabel(cat)}
                </span>

                {cat !== "all" && (
                  <span className={cn(
                    "text-[9px] font-black rounded-full px-2 py-0.5 tabular-nums shrink-0 transition-all duration-300",
                    isActive
                      ? "bg-white/15 text-white/80"
                      : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                  )}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Visual divider */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 px-1">
            {categories.length - 1} Categories
          </p>
        </div>
      </div>

      {/* Mobile / Tablet: horizontal scrollable pills */}
      <div className="lg:hidden relative">
        {/* Fade mask on the right */}
        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat)
            const isActive = activeCategory === cat
            const count = productCounts[cat] ?? 0

            return (
              <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap shrink-0 transition-all duration-300 cursor-pointer border text-[10px] font-black uppercase tracking-widest",
                  isActive
                    ? "bg-black text-white border-black shadow-lg shadow-black/15"
                    : "bg-white text-gray-500 border-gray-100 hover:border-black hover:text-black"
                )}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{getCategoryLabel(cat)}</span>
                {cat !== "all" && (
                  <span className={cn(
                    "text-[8px] font-black rounded-full w-4 h-4 flex items-center justify-center",
                    isActive ? "bg-white/15 text-white" : "bg-gray-100 text-gray-400"
                  )}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
