import nodemailer from "nodemailer"

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com"
const SMTP_PORT = Number(process.env.SMTP_PORT || 465)
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const SMTP_FROM = process.env.SMTP_FROM || "WiCon Systems <no-reply@example.com>"
const BRAND_NAME = process.env.BRAND_NAME || "WiCon Systems"
const BRAND_PRIMARY = process.env.BRAND_PRIMARY || "#000000"
const BRAND_ACCENT = process.env.BRAND_ACCENT || "#111827" // slate-900
const BRAND_BG = process.env.BRAND_BG || "#F9FAFB" // gray-50
const BRAND_LOGO_URL = process.env.BRAND_LOGO_URL || ""

let transporter: nodemailer.Transporter | null = null
if (SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465, false for 587
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

export type MailPayload = {
  to: string | string[]
  subject: string
  html?: string
  text?: string
}

export async function sendMail({ to, subject, html, text }: MailPayload) {
  if (!transporter) {
    console.warn("SMTP not configured; set SMTP_USER and SMTP_PASS. Skipping email send.")
    return { skipped: true }
  }
  try {
    const rawHtml = html || (text ? `<pre>${escapeHtml(text)}</pre>` : "")
    const finalHtml = brandedHtml(rawHtml)
    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject,
      html: finalHtml,
      text,
    })
    return { ok: true, id: info.messageId }
  } catch (err) {
    console.error("Email send failed", err)
    return { ok: false, error: (err as Error).message }
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function brandedHtml(inner: string) {
  // Normalize minimal bodies
  const body = inner?.trim() ? inner : `<p>Thank you for your submission.</p>`
  const logoBlock = BRAND_LOGO_URL
    ? `<div style="font-weight:700;font-size:20px;color:#FFFFFF;">${BRAND_NAME}</div>`
    : `<img src="${BRAND_LOGO_URL}" alt="${BRAND_NAME} logo" width="140" height="40" style="display:block;height:auto;max-width:140px;" />`

  return `<!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtmlTitle(BRAND_NAME)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND_BG};font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${BRAND_BG};padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background:${BRAND_PRIMARY};padding:20px 24px;">
                <div style="display:flex;align-items:center;gap:12px;">
                  ${logoBlock}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 8px 24px;color:#111827;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;color:#6b7280;">
                <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
                <p style="margin:6px 0 0 0;font-size:12px;line-height:1.5;">This is an automated message from ${BRAND_NAME}. Please do not reply to this email. If you have questions, contact contactwiconsystems@gmail.com</p>
              </td>
            </tr>
            <tr>
              <td style="background:${BRAND_ACCENT};padding:16px 24px;color:#9ca3af;font-size:12px;">
                <div style="text-align:center">© ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`
}

function escapeHtmlTitle(s: string) {
  return s.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

// === Domain templates ===
export type TrainingRegistrationEmailData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  track: string
  education: string
  experience?: string | null
}

export function buildTrainingRegistrationEmail(d: TrainingRegistrationEmailData) {
  const fullName = `${d.firstName} ${d.lastName}`.trim()
  const html = `
    <h1 style="margin:0 0 8px 0;font-size:20px;">Hi ${escapeHtml(fullName)},</h1>
    <p style="margin:0 0 12px 0;">Thanks for registering for the ${escapeHtml(BRAND_NAME)} Digital Education program. We've received your registration. Here is a quick summary:</p>
    ${summaryTable([
      ['Full name', fullName],
      ['Email', d.email],
      ['Phone', d.phone],
      ['Track', d.track],
      ['Education level', d.education],
      ['Experience', d.experience || '—'],
    ])}
    ${nextSteps()}
  `
  return { subject: `${BRAND_NAME} Training Registration Received`, html: brandedHtml(html) }
}

export type TrainingVolunteerEmailData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  expertise: string
  years: string
  availability: string
}

export function buildTrainingVolunteerEmail(d: TrainingVolunteerEmailData) {
  const fullName = `${d.firstName} ${d.lastName}`.trim()
  const html = `
    <h1 style="margin:0 0 8px 0;font-size:20px;">Hi ${escapeHtml(fullName)},</h1>
    <p style="margin:0 0 12px 0;">Thank you for applying to volunteer with ${escapeHtml(BRAND_NAME)}. Your application has been received. Summary:</p>
    ${summaryTable([
      ['Full name', fullName],
      ['Email', d.email],
      ['Phone', d.phone],
      ['Expertise', d.expertise],
      ['Years of experience', d.years],
      ['Availability', d.availability],
    ])}
    ${nextSteps('Our team will review your experience and get back to you with opportunities that match your skills.')}
  `
  return { subject: `${BRAND_NAME} Volunteer Application Received`, html: brandedHtml(html) }
}

export type InternshipApplicationEmailData = {
  fullName: string
  email: string
  phone: string
  position: string
  availability: string
  startDate?: string | null
  endDate?: string | null
}

export function buildInternshipApplicationEmail(d: InternshipApplicationEmailData) {
  const html = `
    <h1 style="margin:0 0 8px 0;font-size:20px;">Hi ${escapeHtml(d.fullName)},</h1>
    <p style="margin:0 0 12px 0;">Thanks for applying for an internship at ${escapeHtml(BRAND_NAME)}. We've received your application. Summary:</p>
    ${summaryTable([
      ['Applicant', d.fullName],
      ['Email', d.email],
      ['Phone', d.phone],
      ['Position', d.position],
      ['Availability', d.availability],
      ['Preferred start', d.startDate || '—'],
      ['Preferred end', d.endDate || '—'],
    ])}
    ${nextSteps('We will review your application, including your CV and any supporting materials. If shortlisted, we will contact you to schedule a conversation.')}
  `
  return { subject: `${BRAND_NAME} Internship Application Received`, html: brandedHtml(html) }
}

// === Helpers ===
function summaryTable(rows: Array<[string, string]>) {
  const items = rows
    .map(([k, v]) => `
      <tr>
        <td style="padding:6px 8px;border:1px solid #e5e7eb;background:#f9fafb;width:40%;font-weight:600;">${escapeHtml(k)}</td>
        <td style="padding:6px 8px;border:1px solid #e5e7eb;">${escapeHtml(v)}</td>
      </tr>`)
    .join('')
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:8px 0 4px 0;font-size:14px;">${items}</table>`
}

function nextSteps(custom?: string) {
  const text = custom || 'Our team will review your submission and send next steps shortly. You can reply to this email if you have any questions.'
  return `
    <p style="margin:12px 0 8px 0;">${escapeHtml(text)}</p>
    <p style="margin:0;">If this wasn\'t you, please ignore this message or contact <a href="mailto:support@wiconsystems.com">support@wiconsystems.com</a>.</p>
  `
}
