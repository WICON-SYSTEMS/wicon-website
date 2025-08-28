"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

const STORAGE_PASS = "admin@wicon"
const STORAGE_USER = "admin"

const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "WiCon Systems"
const BRAND_LOGO = process.env.NEXT_PUBLIC_BRAND_LOGO_URL || "/wicon-logo.png"

function isImage(url: string) {
  return /(\.png|\.jpe?g|\.gif|\.webp|\.avif)$/i.test(url)
}
function isDoc(url: string) {
  return /(\.pdf|\.docx?|\.rtf)$/i.test(url)
}
function looksLikeUrl(val: string) {
  // accept http(s), absolute paths, data images, and bare paths ending with known extensions
  return /^https?:\/\//i.test(val) || val.startsWith('/') || /^data:image\//i.test(val) || isImage(val) || isDoc(val)
}
function cleanForExt(val: string) {
  try {
    const noHash = val.split('#')[0]
    const noQuery = noHash.split('?')[0]
    return noQuery
  } catch {
    return val
  }
}
function collectUrls(input: any): string[] {
  const out: string[] = []
  const visit = (v: any) => {
    if (!v && v !== 0) return
    if (typeof v === 'string') {
      const s = v.trim()
      if (s.startsWith('{') || s.startsWith('[')) {
        try {
          const parsed = JSON.parse(s)
          visit(parsed)
          return
        } catch {}
      }
      if (looksLikeUrl(s)) out.push(s)
      return
    }
    if (Array.isArray(v)) {
      v.forEach(visit)
      return
    }
    if (typeof v === 'object') {
      for (const key of Object.keys(v)) {
        visit((v as any)[key])
      }
    }
  }
  visit(input)
  return out
}

export default function InternshipDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [passcode, setPasscode] = useState("")
  const headers = useMemo(() => ({ "x-admin-username": username, "x-admin-passcode": passcode }), [username, passcode])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [item, setItem] = useState<any | null>(null)
  const [message, setMessage] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState<'accept' | 'decline' | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const u = localStorage.getItem(STORAGE_USER) || ""
    const p = localStorage.getItem(STORAGE_PASS) || ""
    setUsername(u)
    setPasscode(p)
  }, [])

  useEffect(() => {
    async function load() {
      if (!username || !passcode) return
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/admin/internship/${id}`, { headers })
        if (!res.ok) throw new Error(await res.text())
        const data = await res.json()
        setItem(data.item)
      } catch (e: any) {
        setError(e?.message || "Failed to load")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, username, passcode])

  async function updateStatus(type: "accept" | "decline") {
    if (!item) return
    setIsUpdating(true)
    try {
      // Update status in database
      const statusRes = await fetch(`/api/admin/internship/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify({ 
          status: type === 'accept' ? 'accepted' : 'declined',
          reviewMessage: message || null
        })
      })
      if (!statusRes.ok) throw new Error(await statusRes.text())
      
      // Send email
      const name = item.full_name || `${item.first_name || ''} ${item.last_name || ''}`.trim() || "there"
      const subject = type === "accept" ? "Your internship application" : "Your internship application"
      const body = type === "accept"
        ? `<p>Hi ${name},</p><p>We are pleased to inform you that your internship application has been accepted.</p>${message ? `<p>${message}</p>` : ""}`
        : `<p>Hi ${name},</p><p>Thank you for applying. After review, we won't be moving forward at this time.</p>${message ? `<p>${message}</p>` : ""}`
      
      const emailRes = await fetch('/api/admin/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify({ to: item.email, subject, html: body })
      })
      if (!emailRes.ok) throw new Error(await emailRes.text())
      
      // Update local state
      setItem((prev: any) => ({ ...prev, status: type === 'accept' ? 'accepted' : 'declined', reviewMessage: message }))
      setMessage("")
      setShowConfirmDialog(null)
      toast.success(`Application ${type === 'accept' ? 'accepted' : 'declined'} and email sent successfully!`)
    } catch (e: any) {
      toast.error(`Failed to ${type} application: ${e?.message || 'Unknown error'}`)
    } finally {
      setIsUpdating(false)
    }
  }

  const imageUrls: string[] = []
  const fileUrls: { url: string; label: string }[] = []
  if (item) {
    console.log('Debug: Processing attachments for item:', item.id, item)
    
    // Priority: Check for signed URLs first
    if (item.photo_signed_url) {
      console.log('Debug: Found photo_signed_url:', item.photo_signed_url)
      imageUrls.push(item.photo_signed_url)
    }
    if (item.cv_signed_url) {
      console.log('Debug: Found cv_signed_url:', item.cv_signed_url)
      fileUrls.push({ url: item.cv_signed_url, label: 'CV/Resume' })
    }
    
    // Fallback: Check other fields (skip bucket/path fields to avoid duplicates)
    const skipFields = ['photo_signed_url', 'cv_signed_url', 'photo_bucket', 'photo_path', 'cv_bucket', 'cv_path']
    for (const [k, v] of Object.entries(item)) {
      if (skipFields.includes(k)) continue
      const urls = collectUrls(v)
      const lk = k.toLowerCase()
      for (const original of urls) {
        const val = cleanForExt(original)
        if (isImage(val) || lk.includes('photo') || lk.includes('image') || lk.includes('avatar') || lk.includes('picture')) {
          if (!imageUrls.includes(original)) {
            console.log('Debug: Adding fallback image from field', k, ':', original)
            imageUrls.push(original)
          }
        } else if (isDoc(val) || lk.includes('cv') || lk.includes('resume') || lk.includes('document') || lk.includes('file')) {
          if (!fileUrls.some(f => f.url === original)) {
            console.log('Debug: Adding fallback file from field', k, ':', original)
            fileUrls.push({ url: original, label: k })
          }
        }
      }
    }
    
    console.log('Debug: Final imageUrls:', imageUrls)
    console.log('Debug: Final fileUrls:', fileUrls)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={BRAND_LOGO} alt="Logo" className="h-8 w-8 object-contain" />
            <span className="font-semibold">{BRAND_NAME} • Internship</span>
          </div>
          <button className="text-sm underline cursor-pointer" onClick={() => router.push('/admin')}>Back to Admin</button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        {(!username || !passcode) && (
          <div className="rounded border p-4 bg-yellow-50 text-yellow-800">Please sign in at <a className="underline" href="/admin">/admin</a> to view details.</div>
        )}
        {loading && (
          <div className="py-12 text-center" role="status" aria-live="polite">Loading…</div>
        )}
        {error && (
          <div className="rounded border p-4 bg-red-50 text-red-700">{error}</div>
        )}
        {!loading && !error && item && (
          <div className="space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold">Application Details</h1>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  item.status === 'declined' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'accepted' ? '✓ Accepted' :
                   item.status === 'declined' ? '✗ Declined' :
                   '⏳ Pending Review'}
                </div>
              </div>
              {item.reviewedAt && (
                <div className="text-sm text-gray-500">
                  Reviewed: {new Date(item.reviewedAt).toLocaleDateString()}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 rounded-lg bg-white p-4 shadow">
                <h2 className="mb-4 text-lg font-semibold">Applicant Information</h2>
                <div className="space-y-2">
                  {Object.entries(item).map(([k, v]) => {
                    // Special handling for structured data
                    if (k === 'academic_entries' && Array.isArray(v)) {
                      return (
                        <div key={k} className="col-span-3 mb-4">
                          <h3 className="text-sm font-semibold text-gray-700 mb-2">Academic Background</h3>
                          <div className="space-y-3">
                            {v.map((entry: any, idx: number) => (
                              <div key={idx} className="rounded-lg border bg-blue-50 p-3">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div><span className="font-medium">Degree:</span> {entry.degree || 'N/A'}</div>
                                  <div><span className="font-medium">Major:</span> {entry.major || 'N/A'}</div>
                                  <div><span className="font-medium">Institution:</span> {entry.institution || 'N/A'}</div>
                                  <div><span className="font-medium">Graduation:</span> {entry.graduationDate || 'N/A'}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    }
                    
                    if (k === 'experience_entries' && Array.isArray(v)) {
                      return (
                        <div key={k} className="col-span-3 mb-4">
                          <h3 className="text-sm font-semibold text-gray-700 mb-2">Professional Experience</h3>
                          <div className="space-y-3">
                            {v.map((entry: any, idx: number) => (
                              <div key={idx} className="rounded-lg border bg-green-50 p-3">
                                <div className="text-sm space-y-2">
                                  <div className="font-medium text-gray-900">{entry.title || 'N/A'} at {entry.company || 'N/A'}</div>
                                  <div className="text-gray-600">{entry.duration || 'N/A'}</div>
                                  {entry.responsibilities && (
                                    <div className="text-gray-700">
                                      <span className="font-medium">Responsibilities:</span> {entry.responsibilities}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    }
                    
                    if (k === 'references_list' && Array.isArray(v)) {
                      return (
                        <div key={k} className="col-span-3 mb-4">
                          <h3 className="text-sm font-semibold text-gray-700 mb-2">References</h3>
                          <div className="space-y-3">
                            {v.map((ref: any, idx: number) => (
                              <div key={idx} className="rounded-lg border bg-purple-50 p-3">
                                <div className="grid grid-cols-1 gap-2 text-sm">
                                  <div><span className="font-medium">Name:</span> {ref.referee || 'N/A'}</div>
                                  <div><span className="font-medium">Relationship:</span> {ref.relationship || 'N/A'}</div>
                                  <div><span className="font-medium">Contact:</span> {ref.contact || 'N/A'}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    }
                    
                    // Skip structured fields that are handled above
                    if (['academic_entries', 'experience_entries', 'references_list'].includes(k)) {
                      return null
                    }
                    
                    // Standard field display
                    let displayValue: React.ReactNode
                    if (v === null || v === undefined) {
                      displayValue = <span className="text-gray-400 italic">Not provided</span>
                    } else if (Array.isArray(v)) {
                      displayValue = (
                        <div className="space-y-2">
                          {v.map((item, idx) => (
                            <div key={idx} className="rounded border bg-gray-50 p-2 text-sm">
                              {typeof item === 'object' ? (
                                <pre className="whitespace-pre-wrap text-xs">{JSON.stringify(item, null, 2)}</pre>
                              ) : (
                                String(item)
                              )}
                            </div>
                          ))}
                        </div>
                      )
                    } else if (typeof v === 'object') {
                      displayValue = (
                        <div className="rounded border bg-gray-50 p-2">
                          <pre className="whitespace-pre-wrap text-xs">{JSON.stringify(v, null, 2)}</pre>
                        </div>
                      )
                    } else {
                      displayValue = String(v)
                    }
                    
                    return (
                      <div key={k} className="grid grid-cols-3 gap-3">
                        <div className="col-span-1 text-sm font-medium text-gray-600 break-words">{k}</div>
                        <div className="col-span-2 break-words">{displayValue}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="mb-3 font-medium">Attachments</h3>
                {imageUrls.length === 0 && fileUrls.length === 0 && (
                  <div className="text-sm text-gray-500">No attachments found.</div>
                )}
                {imageUrls.length > 0 && (
                  <div className="mb-4">
                    <div className="mb-2 text-sm text-gray-600">Images</div>
                    <div className="grid grid-cols-2 gap-3">
                      {imageUrls.map((u, idx) => (
                        <a key={u+idx} href={u} target="_blank" rel="noreferrer" className="block">
                          <img src={u} alt={`Image ${idx+1}`} className="h-40 w-full rounded border object-cover" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {fileUrls.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Files</div>
                    {fileUrls.map(f => (
                      <div key={f.url} className="flex items-center justify-between gap-3 rounded border px-3 py-2">
                        <span className="truncate text-sm" title={f.url}>{f.label}</span>
                        <a href={f.url} target="_blank" rel="noreferrer" download className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200">Download</a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="mb-2 font-medium">Review Decision</h3>
              {item.status !== 'pending' && item.reviewMessage && (
                <div className="mb-4 rounded border bg-gray-50 p-3">
                  <div className="text-sm font-medium text-gray-600">Previous Review Message:</div>
                  <div className="text-sm">{item.reviewMessage}</div>
                </div>
              )}
              <textarea 
                value={message} 
                onChange={(e)=>setMessage(e.target.value)} 
                className="w-full rounded border p-2 text-sm" 
                rows={4} 
                placeholder="Optional message to include in the email"
                disabled={isUpdating}
              />
              <div className="mt-3 flex flex-wrap gap-3">
                {item.status === 'pending' ? (
                  <>
                    <button 
                      onClick={()=>setShowConfirmDialog('decline')} 
                      disabled={isUpdating}
                      className="rounded border border-red-300 px-4 py-2 text-sm cursor-pointer text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      {isUpdating ? 'Processing...' : 'Decline Application'}
                    </button>
                    <button 
                      onClick={()=>setShowConfirmDialog('accept')} 
                      disabled={isUpdating}
                      className="rounded bg-green-600 px-4 py-2 text-sm cursor-pointer text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      {isUpdating ? 'Processing...' : 'Accept Application'}
                    </button>
                  </>
                ) : (
                  <div className="text-sm text-gray-500">
                    Application has been {item.status}. Status changes are not currently supported.
                  </div>
                )}
              </div>
            </div>
            
            {/* Confirmation Dialog */}
            {showConfirmDialog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="mx-4 max-w-md rounded-lg bg-white p-6 shadow-xl">
                  <h3 className="mb-2 text-lg font-semibold">
                    {showConfirmDialog === 'accept' ? 'Accept Application' : 'Decline Application'}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Are you sure you want to {showConfirmDialog} this application? 
                    {showConfirmDialog === 'accept' 
                      ? 'The applicant will receive an acceptance email.' 
                      : 'The applicant will receive a decline notification.'}
                  </p>
                  {message && (
                    <div className="mb-4 rounded border bg-gray-50 p-2">
                      <div className="text-xs font-medium text-gray-600">Message to include:</div>
                      <div className="text-sm">{message}</div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowConfirmDialog(null)}
                      disabled={isUpdating}
                      className="flex-1 rounded border px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => updateStatus(showConfirmDialog)}
                      disabled={isUpdating}
                      className={`flex-1 rounded px-3 py-2 text-sm cursor-pointer text-white disabled:opacity-50 ${
                        showConfirmDialog === 'accept' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {isUpdating ? 'Processing...' : `Confirm ${showConfirmDialog === 'accept' ? 'Accept' : 'Decline'}`}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
