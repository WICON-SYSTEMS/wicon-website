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
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    // send confirmation email (fire and forget)
    try {
      const { subject, html } = buildTrainingRegistrationEmail({
        firstName,
        lastName,
        email,
        phone,
        track,
        education,
        experience,
      })
      await sendMail({ to: email, subject, html })
    } catch (e) {
      // ignore email errors
    }

    // send admin notification email (fire and forget)
    try {
      const adminEmail = process.env.ADMIN_EMAIL
      if (adminEmail) {
        const adminSubject = `New Training Registration - ${firstName} ${lastName}`
        const adminHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #10b981; padding-bottom: 10px;">New Training Registration</h2>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Registrant Details:</h3>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Track:</strong> ${track}</p>
              <p><strong>Education Level:</strong> ${education}</p>
              ${experience ? `<p><strong>Experience Level:</strong> ${experience}</p>` : ''}
              ${employer ? `<p><strong>Employer:</strong> ${employer}</p>` : ''}
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <div style="background: #dcfce7; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
              <p style="margin: 0; color: #166534;"><strong>Action Required:</strong> Please review this registration in the admin panel.</p>
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
