import { cn } from "@/lib/utils"
import { WICON_CONTROLLER_APP } from "@/lib/wicon-app"
import { ArrowRight, Smartphone } from "lucide-react"
import Link from "next/link"

type ControllerAppHeroPillProps = {
  className?: string
}

export function ControllerAppHeroPill({ className }: ControllerAppHeroPillProps) {
  return (
    <Link
      href="/app"
      className={cn(
        "group flex w-full items-center gap-3 rounded-2xl border border-gray-200/80 bg-white/90 px-3.5 py-3 shadow-sm backdrop-blur-sm transition-all hover:border-gray-300 hover:shadow-md sm:w-auto sm:max-w-md sm:gap-4 sm:px-4 sm:py-3.5",
        className
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white sm:h-10 sm:w-10">
        <Smartphone className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.5} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-[10px]">
          Companion app
        </p>
        <p className="truncate text-sm font-semibold leading-tight text-black">
          {WICON_CONTROLLER_APP.name} for Android
        </p>
      </div>
      <span className="hidden shrink-0 items-center gap-1 text-xs font-medium text-gray-500 transition-colors group-hover:text-black sm:inline-flex">
        Download
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
      <ArrowRight
        className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 sm:hidden"
        aria-hidden
      />
    </Link>
  )
}
