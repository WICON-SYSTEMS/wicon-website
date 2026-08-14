"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import {
  getControllerAppDownloadUrl,
  WICON_CONTROLLER_APP,
} from "@/lib/wicon-app"
import { Download, Smartphone, Wifi } from "lucide-react"
import Link from "next/link"

const steps = [
  { label: "Download", detail: "Tap the button to get the APK" },
  { label: "Install", detail: "Open the file and confirm install" },
  { label: "Connect", detail: "Launch the app and pair your controller" },
]

type ControllerAppDownloadProps = {
  variant?: "inline" | "standalone"
  className?: string
}

export function ControllerAppDownload({
  variant = "inline",
  className,
}: ControllerAppDownloadProps) {
  const downloadUrl = getControllerAppDownloadUrl()
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&margin=8&data=${encodeURIComponent(downloadUrl)}`

  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white shadow-2xl shadow-black/10 sm:rounded-3xl",
        variant === "standalone" ? "p-6 sm:p-8 lg:p-10" : "p-5 sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 sm:h-14 sm:w-14 sm:rounded-2xl">
              <Smartphone className="h-6 w-6 text-white sm:h-7 sm:w-7" strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-[10px] sm:tracking-[0.25em]">
                Companion app
              </p>
              <h3
                className={cn(
                  "truncate font-bold tracking-tight text-white",
                  variant === "standalone"
                    ? "text-xl sm:text-2xl lg:text-3xl"
                    : "text-lg sm:text-xl lg:text-2xl"
                )}
              >
                {WICON_CONTROLLER_APP.name}
              </h3>
            </div>
          </div>

          <p className="mb-6 max-w-md text-sm leading-relaxed text-gray-400 sm:mb-8 sm:text-base">
            {WICON_CONTROLLER_APP.description}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={WICON_CONTROLLER_APP.downloadPath}
              download={WICON_CONTROLLER_APP.fileName}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-black transition-all hover:bg-gray-100 active:scale-[0.98] sm:w-auto"
            >
              <Download className="h-4 w-4 shrink-0" />
              Download for Android
            </a>
            <p className="text-center text-xs text-gray-500 sm:text-left">
              v{WICON_CONTROLLER_APP.version} · APK · Android{" "}
              {WICON_CONTROLLER_APP.minAndroid}+
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-6">
            {steps.map((step, index) => (
              <div key={step.label} className="min-w-0">
                <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold text-white ring-1 ring-white/10 sm:mb-2 sm:h-8 sm:w-8 sm:text-xs">
                  {index + 1}
                </div>
                <p className="text-[11px] font-semibold text-white sm:text-sm">
                  {step.label}
                </p>
                <p className="mt-1 hidden text-[11px] leading-snug text-gray-500 md:block">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex">
          <div className="rounded-2xl bg-white p-4 text-center shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt="QR code to download WiCon Controller app"
              width={140}
              height={140}
              className="mx-auto rounded-lg"
            />
            <p className="mt-3 text-[10px] font-medium uppercase tracking-widest text-gray-500">
              Scan to download
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="install" className="border-white/10">
            <AccordionTrigger className="py-4 text-sm text-gray-300 hover:text-white hover:no-underline">
              First time installing on Android?
            </AccordionTrigger>
            <AccordionContent className="space-y-3 text-sm leading-relaxed text-gray-400">
              <p>
                Download the APK, then open it from your notification shade or
                Downloads folder.
              </p>
              <p>
                If your phone asks for permission, allow installs from your
                browser or file manager in Settings, then tap Install.
              </p>
              <p className="flex items-start gap-2">
                <Wifi className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                <span>
                  Open the app, sign in if required, and connect to your WiCon
                  controller on the same network.
                </span>
              </p>
              {variant === "standalone" && (
                <Link
                  href="/products#controller-app"
                  className="inline-block pt-1 text-sm text-white underline-offset-4 hover:underline"
                >
                  Learn more about WiCon Wireless Controllers
                </Link>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
