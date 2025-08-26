import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const {
      firstName,
      lastName,
      email,
      phone,
      service,
      projectType,
      budget,
      timeline,
      message,
      preferredContact,
      // Quote-specific fields
      propertyType,
      propertySize,
      urgency,
      additionalServices
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !service || !message) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send confirmation email to user
    const userSubject = 'Thank you for contacting WiCon Systems'
    const userHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">WiCon Systems</h1>
          <p style="color: #e5e7eb; margin: 10px 0 0 0;">Professional Electrical Solutions</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937; margin-top: 0;">Thank you for your inquiry!</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Hi ${firstName},
          </p>
          <p style="color: #4b5563; line-height: 1.6;">
            We've received your contact form submission and our team will get back to you within 24 hours with a detailed response.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1f2937; margin-top: 0;">${propertyType ? 'Your Quote Request Details:' : 'Your Inquiry Details:'}</h3>
            <p style="margin: 5px 0; color: #4b5563;"><strong>Service Interest:</strong> ${service}</p>
            ${propertyType ? `<p style="margin: 5px 0; color: #4b5563;"><strong>Property Type:</strong> ${propertyType}</p>` : ''}
            ${propertySize ? `<p style="margin: 5px 0; color: #4b5563;"><strong>Property Size:</strong> ${propertySize}</p>` : ''}
            ${projectType ? `<p style="margin: 5px 0; color: #4b5563;"><strong>Project Type:</strong> ${projectType}</p>` : ''}
            ${budget ? `<p style="margin: 5px 0; color: #4b5563;"><strong>Budget Range:</strong> ${budget}</p>` : ''}
            ${urgency ? `<p style="margin: 5px 0; color: #4b5563;"><strong>Timeline:</strong> ${urgency}</p>` : ''}
            ${timeline ? `<p style="margin: 5px 0; color: #4b5563;"><strong>Timeline:</strong> ${timeline}</p>` : ''}
            <p style="margin: 5px 0; color: #4b5563;"><strong>Preferred Contact:</strong> ${preferredContact || 'Email'}</p>
          </div>
          
          <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; color: #1e40af;">
              <strong>What's Next?</strong> Our electrical experts will review your requirements and contact you with a customized solution and free quote.
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              For urgent electrical issues, call our emergency line: <strong>+237 670791815</strong>
            </p>
          </div>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 14px;">
            WiCon Systems - Professional Electrical Solutions<br>
            Buea, Southwest Region, Cameroon
          </p>
        </div>
      </div>
    `

    try {
      await sendMail({ to: email, subject: userSubject, html: userHtml })
    } catch (e) {
      console.error('Failed to send user confirmation email:', e)
      // Don't fail the request if email sending fails
    }

    // Send notification email to admin
    try {
      const adminEmail = process.env.ADMIN_EMAIL
      if (adminEmail) {
        const adminSubject = `New ${propertyType ? 'Quote Request' : 'Contact Form'} Submission - ${firstName} ${lastName}`
        const adminHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">New ${propertyType ? 'Quote Request' : 'Contact Form'} Submission</h2>
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Service Interest:</strong> ${service}</p>
              ${propertyType ? `<p><strong>Property Type:</strong> ${propertyType}</p>` : ''}
              ${propertySize ? `<p><strong>Property Size:</strong> ${propertySize}</p>` : ''}
              ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
              ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
              ${urgency ? `<p><strong>Timeline:</strong> ${urgency}</p>` : ''}
              ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
              <p><strong>Preferred Contact:</strong> ${preferredContact || 'Email'}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
              <h4 style="color: #374151; margin-top: 0;">Message:</h4>
              <p style="color: #4b5563; white-space: pre-wrap;">${message}</p>
            </div>
            <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-top: 20px;">
              <p style="margin: 0; color: #b45309;"><strong>Action Required:</strong> Please respond to this inquiry within 24 hours.</p>
            </div>
          </div>
        `
        await sendMail({ to: adminEmail, subject: adminSubject, html: adminHtml })
      }
    } catch (e) {
      console.error('Failed to send admin notification email:', e)
      // Don't fail the request if admin email fails
    }

    return NextResponse.json({ ok: true, message: 'Contact form submitted successfully' })
  } catch (e: any) {
    console.error('Contact form error:', e)
    return NextResponse.json(
      { ok: false, error: e?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
