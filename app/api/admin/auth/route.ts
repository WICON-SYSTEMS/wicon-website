import { NextResponse } from 'next/server'

function checkPass(req: Request) {
  const user = req.headers.get('x-admin-username') || ''
  const pass = req.headers.get('x-admin-passcode') || ''
  const expectedUser = process.env.ADMIN_USERNAME || ''
  const expectedPass = process.env.ADMIN_PASSCODE || ''
  if (!expectedUser || !expectedPass) return false
  return user === expectedUser && pass === expectedPass
}

export async function GET(req: Request) {
  if (!checkPass(req)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({ ok: true })
}
