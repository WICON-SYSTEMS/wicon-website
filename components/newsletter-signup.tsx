"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function isValidEmail(email: string) {
  return /^(?:[a-zA-Z0-9_'^&\+`{}~!#$%*?\/|\-]+(?:\.[a-zA-Z0-9_'^&\+`{}~!#$%*?\/|\-]+)*|"(?:[^"\\]|\\.)*")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
    email.trim()
  )
}

export function NewsletterSignup({
  className,
  inputClassName,
  buttonClassName,
}: {
  className?: string
  inputClassName?: string
  buttonClassName?: string
}) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const value = email.trim()
    if (!value || !isValidEmail(value)) {
      setError("Please enter a valid email address.")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.error || "Subscription failed. Please try again.")
      }
      setEmail("")
      setOpen(true)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={className} aria-busy={loading}>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-md mx-auto w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={
              inputClassName ||
              "flex-1 px-4 py-3 rounded-lg text-white bg-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/30"
            }
            aria-invalid={!!error}
            aria-describedby={error ? "newsletter-error" : undefined}
            disabled={loading}
            required
          />
          <Button
            type="submit"
            className={buttonClassName || "bg-white text-black hover:bg-gray-100 px-6 py-3"}
            disabled={loading}
          >
            {loading ? "Subscribing…" : "Subscribe"}
          </Button>
        </div>
        {error && (
          <p id="newsletter-error" className="mt-3 text-sm text-red-300 text-center">
            {error}
          </p>
        )}
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>You're subscribed!</DialogTitle>
            <DialogDescription>
              Thanks for subscribing to our newsletter. You'll receive updates on electrical technology, energy solutions,
              and smart home security in Cameroon.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} className="bg-black text-white hover:bg-gray-800">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NewsletterSignup
