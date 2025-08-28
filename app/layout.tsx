import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "WiCon Systems - Wireless Electrical Controllers | Cameroon",
    template: "WiCon • %s",
  },
  description:
    "Professional automation company in Buea, Cameroon. Specializing in wireless controllers, solar PV systems, electrical wiring, and CCTV security systems.",
  generator: "wicon",
  themeColor: "#000000",
  manifest: "/favicons/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon.ico" },
    ],
    apple: "/favicons/apple-touch-icon.png",
    shortcut: "/favicons/favicon.ico",
  },
  openGraph: {
    title: "WiCon Systems - Wireless Electrical Controllers | Cameroon",
    description:
      "Professional automation company in Buea, Cameroon. Specializing in wireless controllers, solar PV systems, electrical wiring, and CCTV security systems.",
    url: "/",
    siteName: "WiCon Systems",
    images: [
      {
        url: "/wicon.png",
        width: 1200,
        height: 630,
        alt: "WiCon Systems",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WiCon Systems - Wireless Electrical Controllers | Cameroon",
    description:
      "Professional automation company in Buea, Cameroon. Specializing in wireless controllers, solar PV systems, electrical wiring, and CCTV security systems.",
    images: ["/wicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
}
        `}</style>
      </head>
      <body className={inter.className}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
