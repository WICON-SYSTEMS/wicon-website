import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/email'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, organization, email, phone, partnershipType, message, agree } = body || {}

    if (!name || !organization || !email || !phone || !partnershipType || !message || !agree) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email address' }, { status: 400 })
    }

    // Persist to database via Supabase
    const id = crypto.randomUUID()
    const { data: inserted, error: insertError } = await supabaseServer
      .from('partnership_interests')
      .insert({
        id,
        name,
        organization,
        email,
        phone,
        partnership_type: partnershipType,
        message,
        agreed_terms: !!agree,
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ ok: false, error: insertError.message }, { status: 500 })
    }

    // Send confirmation email to partner
    const userSubject = 'Thank you for your interest in partnering with WiCon Systems'
    const userHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); padding: 28px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">WiCon Systems</h1>
          <p style="color: #d1d5db; margin: 8px 0 0 0;">Training Partnerships</p>
        </div>
        <div style="padding: 24px; background: #f9fafb;">
          <h2 style="color: #111827; margin-top: 0; font-size: 20px;">Thanks, ${name}!</h2>
          <p style="color: #374151; line-height: 1.6;">We have received your partnership interest. Our team will reach out shortly to discuss collaboration opportunities.</p>
          <div style="background: white; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #111827;">
            <h3 style="color: #111827; margin-top: 0;">Summary</h3>
            <p style="margin: 4px 0; color: #374151;"><strong>Organization:</strong> ${organization}</p>
            <p style="margin: 4px 0; color: #374151;"><strong>Interest:</strong> ${partnershipType}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">You can reply to this email with any additional details.</p>
        </div>
        <div style="background: #111827; padding: 16px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">WiCon Systems • Buea, Cameroon</p>
        </div>
      </div>
    `

    try {
      await sendMail({ to: email, subject: userSubject, html: userHtml })
    } catch (e) {
      console.error('Failed to send partner confirmation email:', e)
    }

    // Notify admin
    try {
      const adminEmail = process.env.ADMIN_EMAIL
      if (adminEmail) {
        const adminSubject = `New Partnership Interest - ${organization} (${name})`
        const adminHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #111827; border-bottom: 2px solid #111827; padding-bottom: 8px;">New Partnership Inquiry</h2>
            <div style="background: #f3f4f6; padding: 16px; border-radius: 8px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Organization:</strong> ${organization}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Interest:</strong> ${partnershipType}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
              <p style="margin-top: 8px; color: #6b7280; font-size: 12px;">Submitted: ${new Date().toLocaleString()}</p>
              <p style="margin-top: 8px; color: #6b7280; font-size: 12px;">ID: ${inserted?.id || ''}</p>
            </div>
          </div>
        `
        await sendMail({ to: adminEmail, subject: adminSubject, html: adminHtml })
      }
    } catch (e) {
      console.error('Failed to send admin notification email:', e)
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('Partnership form error:', e)
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}
