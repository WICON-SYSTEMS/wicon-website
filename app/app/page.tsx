import { ControllerAppDownload } from "@/components/controller-app-download"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "WiCon Controller App",
  description:
    "Download the WiCon Controller app for Android. Control your WiCon Wireless Controller from your phone.",
}

export default function ControllerAppPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-xl">
          <Link
            href="/products#controller-app"
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            WiCon Wireless Controllers
          </Link>
          <ControllerAppDownload variant="standalone" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
