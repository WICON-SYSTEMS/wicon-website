export const WICON_CONTROLLER_APP = {
  name: "WiCon Controller",
  tagline: "Control your wireless controller from your phone.",
  description:
    "Switch circuits, monitor status, and manage your WiCon Wireless Controller from anywhere.",
  downloadPath: "/downloads/Smart-Home.apk",
  fileName: "Smart-Home.apk",
  version: "1.0.0",
  platform: "Android",
  minAndroid: "8.0",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wiconltd.com",
} as const

export function getControllerAppDownloadUrl() {
  const base = WICON_CONTROLLER_APP.siteUrl.replace(/\/$/, "")
  return `${base}${WICON_CONTROLLER_APP.downloadPath}`
}
