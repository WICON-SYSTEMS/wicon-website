import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/email'

function unauthorized() {
  return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
}

function checkPass(req: Request) {
  const user = req.headers.get('x-admin-username') || ''
  const pass = req.headers.get('x-admin-passcode') || ''
  const expectedUser = process.env.ADMIN_USERNAME || ''
  const expectedPass = process.env.ADMIN_PASSCODE || ''
  if (!expectedUser || !expectedPass) return false
  return user === expectedUser && pass === expectedPass
}

export async function POST(req: Request) {
  try {
    if (!checkPass(req)) return unauthorized()
    const { to, subject, html, text } = await req.json()
    if (!to || !subject || (!html && !text)) {
      return NextResponse.json({ ok: false, error: 'Missing to/subject/body' }, { status: 400 })
    }
    const res = await sendMail({ to, subject, html, text })
    if ((res as any).ok === false) {
      return NextResponse.json({ ok: false, error: (res as any).error || 'Email failed' }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}
