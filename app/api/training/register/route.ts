import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    const firstName = String(form.get('firstName') || '')
    const lastName = String(form.get('lastName') || '')
    const email = String(form.get('email') || '')
    const phone = String(form.get('phone') || '')
    const track = String(form.get('track') || '')
    const education = String(form.get('education') || '')
    const experience = String(form.get('experience') || '')
    const motivation = String(form.get('motivation') || '')
    const employer = String(form.get('employer') || '')
    const terms = String(form.get('terms') || '') === 'true'
    const updates = String(form.get('updates') || '') === 'true'

    if (!firstName || !lastName || !email || !phone || !track || !education || !motivation || !terms) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabaseServer.from('training_registrations').insert({
      id: crypto.randomUUID(),
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      track,
      education_level: education,
      experience_level: experience || null,
      motivation,
      employer: employer || null,
      agreed_terms: terms,
      wants_updates: updates,
    }).select('*').single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, id: data.id })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}
