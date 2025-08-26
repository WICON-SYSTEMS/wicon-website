import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
import { sendMail, buildInternshipApplicationEmail } from '@/lib/email'

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

    // send confirmation email (fire and forget)
    try {
      const { subject, html } = buildInternshipApplicationEmail({
        fullName,
        email,
        phone,
        position,
        availability,
        startDate: startDate || null,
        endDate: endDate || null,
      })
      await sendMail({ to: email, subject, html })
    } catch (e) {
      // do not fail request due to email errors
    }

    // send admin notification email (fire and forget)
    try {
      const adminEmail = process.env.ADMIN_EMAIL
      if (adminEmail) {
        const adminSubject = `New Internship Application - ${fullName}`
        const adminHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Internship Application</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Applicant Details:</h3>
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Position:</strong> ${position}</p>
              <p><strong>Availability:</strong> ${availability}</p>
              ${startDate ? `<p><strong>Start Date:</strong> ${startDate}</p>` : ''}
              ${endDate ? `<p><strong>End Date:</strong> ${endDate}</p>` : ''}
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e40af;"><strong>Action Required:</strong> Please review this application in the admin panel.</p>
            </div>
          </div>
        `
        await sendMail({ to: adminEmail, subject: adminSubject, html: adminHtml })
      }
    } catch (e) {
      // do not fail request due to admin email errors
    }

    return NextResponse.json({ ok: true, id: data.id })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}
