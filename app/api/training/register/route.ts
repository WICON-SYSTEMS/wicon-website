import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
import { sendMail, buildTrainingRegistrationEmail } from '@/lib/email'

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
    }).select('id, first_name, email').single()

    if (error) {
      console.error("Training registration technical error:", error);
      return NextResponse.json({ ok: false, error: "Failed to process your registration. Please try again later." }, { status: 500 })
    }

    // ... lines 43-89 unchanged ...

    return NextResponse.json({ ok: true, id: data.id })
  } catch (e: any) {
    console.error("Training registration root error:", e);
    return NextResponse.json({ ok: false, error: "An unexpected error occurred. Please try again later." }, { status: 500 })
  }
}
