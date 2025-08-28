import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

function checkPass(req: Request) {
  const user = req.headers.get('x-admin-username') || ''
  const pass = req.headers.get('x-admin-passcode') || ''
  const expectedUser = process.env.ADMIN_USERNAME || ''
  const expectedPass = process.env.ADMIN_PASSCODE || ''
  if (!expectedUser || !expectedPass) return false
  return user === expectedUser && pass === expectedPass
}

export async function GET(req: Request) {
  try {
    if (!checkPass(req)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const q = (searchParams.get('q') || '').trim()

    let query = supabaseServer
      .from('partnership_interests')
      .select('id, name, organization, email, phone, partnership_type, status, reviewed_at, created_at')
      .order('created_at', { ascending: false })
      .limit(200)

    if (q) {
      const like = `%${q}%`
      query = query.or(
        `name.ilike.${like},organization.ilike.${like},email.ilike.${like},phone.ilike.${like},partnership_type.ilike.${like}`
      ) as any
    }

    const { data, error } = await query
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true, items: data || [] })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}
