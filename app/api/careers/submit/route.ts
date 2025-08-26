import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// Buckets
const CV_BUCKET = 'applications-cv'
const PHOTO_BUCKET = 'applications-photos'

async function ensureBuckets() {
  // attempt to create; ignore errors if already exist
  const buckets = [
    { id: CV_BUCKET, options: { public: false } },
    { id: PHOTO_BUCKET, options: { public: false } },
  ] as const

  for (const b of buckets) {
    const { error } = await supabaseServer.storage.createBucket(b.id, b.options as any)
    if (error && !String(error.message || '').toLowerCase().includes('already exists')) {
      // non-fatal: continue, as bucket might exist but another error occurred
      // eslint-disable-next-line no-console
      console.warn('Bucket create error', b.id, error.message)
    }
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
    await ensureBuckets()

    const form = await req.formData()

    // primitive fields
    const fullName = String(form.get('fullName') || '')
    const address = String(form.get('address') || '')
    const email = String(form.get('email') || '')
    const phone = String(form.get('phone') || '')
    const dob = String(form.get('dob') || '')
    const sex = String(form.get('sex') || '')
    const position = String(form.get('position') || '')
    const availability = String(form.get('availability') || '')
    const startDate = String(form.get('startDate') || '')
    const endDate = String(form.get('endDate') || '')
    const skills = String(form.get('skills') || '')
    const certifications = String(form.get('certifications') || '')
    const languages = String(form.get('languages') || '')
    const agreeToTerms = String(form.get('agreeToTerms') || '') === 'true'

    // complex arrays (JSON)
    const academicEntries = JSON.parse(String(form.get('academicEntries') || '[]'))
    const experienceEntries = JSON.parse(String(form.get('experienceEntries') || '[]'))
    const references = JSON.parse(String(form.get('references') || '[]'))

    // Files
    const cvFile = form.get('cvFile') as File | null
    const photoFile = form.get('photoFile') as File | null

    if (!fullName || !address || !email || !phone || !dob || !sex || !position || !availability || !agreeToTerms || !cvFile) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    // upload files
    let cv_path: string | null = null
    if (cvFile) {
      const cvArrayBuffer = await cvFile.arrayBuffer()
      const cvBytes = new Uint8Array(cvArrayBuffer)
      const path = safePath('cv', cvFile.name)
      const { error: cvErr } = await supabaseServer.storage.from(CV_BUCKET).upload(path, cvBytes, {
        contentType: cvFile.type || 'application/octet-stream',
        upsert: false,
      })
      if (cvErr) {
        return NextResponse.json({ ok: false, error: `CV upload failed: ${cvErr.message}` }, { status: 500 })
      }
      cv_path = path
    }

    let photo_path: string | null = null
    if (photoFile) {
      const pArrayBuffer = await photoFile.arrayBuffer()
      const pBytes = new Uint8Array(pArrayBuffer)
      const path = safePath('photos', photoFile.name)
      const { error: pErr } = await supabaseServer.storage.from(PHOTO_BUCKET).upload(path, pBytes, {
        contentType: photoFile.type || 'application/octet-stream',
        upsert: false,
      })
      if (pErr) {
        return NextResponse.json({ ok: false, error: `Photo upload failed: ${pErr.message}` }, { status: 500 })
      }
      photo_path = path
    }

    // insert row
    const { data, error } = await supabaseServer.from('internship_applications').insert({
      id: crypto.randomUUID(),
      full_name: fullName,
      address,
      email,
      phone,
      dob,
      sex,
      position,
      availability,
      start_date: startDate || null,
      end_date: endDate || null,
      skills,
      certifications,
      languages,
      academic_entries: academicEntries,
      experience_entries: experienceEntries,
      references_list: references,
      cv_bucket: CV_BUCKET,
      cv_path,
      photo_bucket: PHOTO_BUCKET,
      photo_path,
    }).select('*').single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, id: data.id })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}
