import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

const RESUME_BUCKET = 'training-resumes'

async function ensureBucket() {
  const { error } = await supabaseServer.storage.createBucket(RESUME_BUCKET, { public: false } as any)
  if (error && !String(error.message || '').toLowerCase().includes('already exists')) {
    // eslint-disable-next-line no-console
    console.warn('Bucket create error', RESUME_BUCKET, error.message)
  }
}

function safePath(prefix: string, filename: string) {
  const ts = Date.now()
  const rand = Math.random().toString(36).slice(2, 10)
  const clean = filename.replace(/[^a-zA-Z0-9_.-]/g, '_')
  return `${prefix}/${ts}-${rand}-${clean}`
}

export async function POST(req: Request) {
  try {
    await ensureBucket()

    const form = await req.formData()

    const firstName = String(form.get('firstName') || '')
    const lastName = String(form.get('lastName') || '')
    const email = String(form.get('email') || '')
    const phone = String(form.get('phone') || '')
    const expertise = String(form.get('expertise') || '')
    const years = String(form.get('years') || '')
    const teaching = String(form.get('teaching') || '')
    const currentRole = String(form.get('currentRole') || '')
    const company = String(form.get('company') || '')
    const availability = String(form.get('availability') || '')
    const motivation = String(form.get('motivation') || '')
    const agree = String(form.get('agree') || '') === 'true'

    const resume = form.get('resume') as File | null

    if (!firstName || !lastName || !email || !phone || !expertise || !years || !availability || !motivation || !agree) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    let resume_path: string | null = null
    if (resume) {
      const arr = await resume.arrayBuffer()
      const bytes = new Uint8Array(arr)
      const path = safePath('resumes', resume.name)
      const { error: upErr } = await supabaseServer.storage.from(RESUME_BUCKET).upload(path, bytes, {
        contentType: resume.type || 'application/octet-stream',
        upsert: false,
      })
      if (upErr) return NextResponse.json({ ok: false, error: `Resume upload failed: ${upErr.message}` }, { status: 500 })
      resume_path = path
    }

    const { data, error } = await supabaseServer.from('training_volunteers').insert({
      id: crypto.randomUUID(),
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      expertise,
      years_experience: years,
      teaching_experience: teaching || null,
      current_role: currentRole,
      company: company || null,
      availability,
      motivation,
      resume_bucket: RESUME_BUCKET,
      resume_path,
      agreed_terms: agree,
    }).select('*').single()

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true, id: data.id })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}
