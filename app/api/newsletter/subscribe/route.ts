import { NextResponse } from "next/server"
import { sendMail } from "@/lib/email"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.SMTP_FROM || "admin@example.com"
const BRAND_NAME = process.env.BRAND_NAME || "WiCon Systems"

function isValidEmail(email: string) {
  return /^(?:[a-zA-Z0-9_'^&\+`{}~!#$%*?\/|\-]+(?:\.[a-zA-Z0-9_'^&\+`{}~!#$%*?\/|\-]+)*|"(?:[^"\\]|\\.)*")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
    email.trim()
  )
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    // Send confirmation email to subscriber
    await sendMail({
      to: email,
      subject: `${BRAND_NAME} Newsletter Subscription Confirmed`,
      html: `
        <h1 style="margin:0 0 8px 0;font-size:20px;">You're subscribed!</h1>
        <p style="margin:0 0 12px 0;">Thanks for subscribing to ${BRAND_NAME}. You'll receive updates on electrical technology, energy solutions, and smart security.</p>
        <p style="margin:0;">If this wasn't you, you can ignore this email.</p>
      `,
    })

    // Notify admin
    await sendMail({
      to: ADMIN_EMAIL,
      subject: `${BRAND_NAME} Newsletter: New subscriber`,
      html: `
        <p>New newsletter subscription:</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr><td style="padding:6px 8px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;">Email</td><td style="padding:6px 8px;border:1px solid #e5e7eb;">${email}</td></tr>
          <tr><td style="padding:6px 8px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;">Time</td><td style="padding:6px 8px;border:1px solid #e5e7eb;">${new Date().toISOString()}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Newsletter subscribe failed", err)
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 })
  }
}
