import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export const runtime = 'nodejs'

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
    const q = (searchParams.get('q') || '').trim().toLowerCase()

    // Build filter for Supabase
    let query = supabaseServer
      .from('newsletter_subscribers')
      .select('id,email,status,source,created_at,unsubscribed_at')
      .order('created_at', { ascending: false })
      .limit(500)

    if (q) {
      // Apply ilike filters via or()
      query = query.or(
        `email.ilike.%${q}%,source.ilike.%${q}%,status.ilike.%${q}%`
      )
    }

    const { data, error } = await query
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

    const items = (data || []).map((r: any) => ({
      id: r.id as string,
      email: r.email as string,
      status: r.status as string,
      source: (r.source as string) || null,
      created_at: r.created_at as string | null,
      unsubscribed_at: r.unsubscribed_at as string | null,
    }))

    return NextResponse.json({ ok: true, items })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}
