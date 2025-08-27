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

    const { data, error } = await supabaseServer
      .from('newsletter_subscribers')
      .select('id,email,status,source,created_at,unsubscribed_at')
      .order('created_at', { ascending: false })
      .limit(5000)
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

    const header: string[] = ['id','email','status','source','created_at','unsubscribed_at']
    const rows: string[][] = (data || []).map((r: any) => [
      String(r.id ?? ''),
      String(r.email ?? ''),
      String(r.status ?? ''),
      String(r.source ?? ''),
      String(r.created_at ?? ''),
      String(r.unsubscribed_at ?? ''),
    ])

    const csv = [header, ...rows]
      .map((cols: string[]) => cols.map((v: string) => {
        const s = String(v ?? '')
        if (s.includes(',') || s.includes('\"') || s.includes('\n')) {
          return '\"' + s.replace(/\"/g, '\"\"') + '\"'
        }
        return s
      }).join(','))
      .join('\n')

    const filename = `newsletter-subscribers-${new Date().toISOString().slice(0,10)}.csv`
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename=${filename}`,
      }
    })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}
