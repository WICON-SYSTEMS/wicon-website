"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"

const STORAGE_PASS = "admin@wicon"
const STORAGE_USER = "admin"

const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "WiCon Systems"
const BRAND_LOGO = process.env.NEXT_PUBLIC_BRAND_LOGO_URL || "/wicon-logo.png"

type BaseItem = { id: string }

type Internship = BaseItem & {
  full_name: string
  email: string
  phone: string
  position: string
  availability: string
  status?: string
  reviewed_at?: string
  review_message?: string
  created_at?: string
}

type TrainingRegistration = BaseItem & {
  first_name: string
  last_name: string
  email: string
  phone: string
  track: string
  status?: string
  reviewed_at?: string
  review_message?: string
  created_at?: string
}

type TrainingVolunteer = BaseItem & {
  first_name: string
  last_name: string
  email: string
  phone: string
  expertise: string
  years_experience: number
  status?: string
  reviewed_at?: string
  review_message?: string
  created_at?: string
}

type Subscriber = BaseItem & {
  email: string
  status?: string
  source?: string | null
  created_at?: string | null
  unsubscribed_at?: string | null
}

function Pagination({ total, page, pageSize, onPageChange }: { total: number; page: number; pageSize: number; onPageChange: (p: number) => void }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  if (totalPages <= 1) return null
  const canPrev = page > 1
  const canNext = page < totalPages
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
      <div className="flex items-center gap-2">
        <button disabled={!canPrev} onClick={()=>onPageChange(page-1)} className={`rounded border px-3 py-1 text-sm ${canPrev? 'hover:bg-gray-50':'opacity-50 cursor-not-allowed'}`}>Previous</button>
        <button disabled={!canNext} onClick={()=>onPageChange(page+1)} className={`rounded border px-3 py-1 text-sm ${canNext? 'hover:bg-gray-50':'opacity-50 cursor-not-allowed'}`}>Next</button>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [username, setUsername] = useState("")
  const [passcode, setPasscode] = useState("")
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<"internships" | "registrations" | "volunteers" | "subscribers">("internships")
  const [q, setQ] = useState("")
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "yesterday" | "week" | "month">("all")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authError, setAuthError] = useState<string | null>(null)

  // pagination state
  const [pageIntern, setPageIntern] = useState(1)
  const [pageReg, setPageReg] = useState(1)
  const [pageVol, setPageVol] = useState(1)
  const [pageSub, setPageSub] = useState(1)
  const pageSize = 10
  
  function StatusBadge({ status }: { status: string }) {
    const config = {
      accepted: { bg: 'bg-green-100', text: 'text-green-800', icon: '✓', label: 'Accepted' },
      declined: { bg: 'bg-red-100', text: 'text-red-800', icon: '✗', label: 'Declined' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳', label: 'Pending' }
    }
    const { bg, text, icon, label } = config[status as keyof typeof config] || config.pending
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
        <span>{icon}</span>
        {label}
      </span>
    )
  }

  const [internships, setInternships] = useState<Internship[]>([])
  const [registrations, setRegistrations] = useState<TrainingRegistration[]>([])
  const [volunteers, setVolunteers] = useState<TrainingVolunteer[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])

  useEffect(() => {
    const storedUser = typeof window !== "undefined" ? localStorage.getItem(STORAGE_USER) : null
    const storedPass = typeof window !== "undefined" ? localStorage.getItem(STORAGE_PASS) : null
    const lastValidated = typeof window !== "undefined" ? localStorage.getItem('admin-last-validated') : null
    
    // Check if we validated recently (within 30 minutes)
    const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000)
    const recentlyValidated = lastValidated && parseInt(lastValidated) > thirtyMinutesAgo
    
    async function tryValidate(u: string, p: string, skipServerCheck = false) {
      if (skipServerCheck && recentlyValidated) {
        // Use cached validation if recent
        setUsername(u)
        setPasscode(p)
        setSaved(true)
        return
      }
      
      try {
        const res = await fetch('/api/admin/auth', { headers: { 'x-admin-username': u, 'x-admin-passcode': p } })
        if (res.ok) {
          setSaved(true)
          localStorage.setItem('admin-last-validated', Date.now().toString())
        } else {
          setSaved(false)
          localStorage.removeItem('admin-last-validated')
        }
      } catch {
        setSaved(false)
        localStorage.removeItem('admin-last-validated')
      }
    }
    if (storedUser && storedPass) {
      setUsername(storedUser)
      setPasscode(storedPass)
      // Use cached validation if recent, otherwise validate with server
      tryValidate(storedUser, storedPass, true)
    }
  }, [])

  const headers = useMemo(() => ({ "x-admin-username": username, "x-admin-passcode": passcode }), [username, passcode])

  async function fetchTab() {
    if (!passcode) return
    setLoading(true)
    setError(null)
    try {
      const urlBase = activeTab === "internships"
        ? "/api/admin/internship"
        : activeTab === "registrations"
        ? "/api/admin/training/registrations"
        : activeTab === "volunteers"
        ? "/api/admin/training/volunteers"
        : "/api/admin/subscribers"
      const url = q ? `${urlBase}?q=${encodeURIComponent(q)}` : urlBase
      const res = await fetch(url, { headers })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      if (activeTab === "internships") setInternships(data.items)
      if (activeTab === "registrations") setRegistrations(data.items)
      if (activeTab === "volunteers") setVolunteers(data.items)
      if (activeTab === "subscribers") setSubscribers(data.items)
    } catch (e: any) {
      setError(e?.message || "Failed to load")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTab()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, saved])

  async function saveCreds() {
    setAuthError(null)
    if (!username || !passcode) return
    try {
      const res = await fetch('/api/admin/auth', { headers })
      if (!res.ok) {
        setAuthError('Wrong credentials')
        setSaved(false)
        return
      }
      localStorage.setItem(STORAGE_USER, username)
      localStorage.setItem(STORAGE_PASS, passcode)
      setSaved(true)
      fetchTab()
    } catch {
      setAuthError('Unable to verify credentials')
    }
  }

  function signOut() {
    localStorage.removeItem(STORAGE_USER)
    localStorage.removeItem(STORAGE_PASS)
    localStorage.removeItem('admin-last-validated')
    setUsername("")
    setPasscode("")
    setSaved(false)
  }

  async function sendEmail(to: string, subject: string, html: string) {
    try {
      const res = await fetch("/api/admin/email", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ to, subject, html })
      })
      if (!res.ok) throw new Error(await res.text())
      toast.success("Email sent")
    } catch (e: any) {
      toast.error(`Email failed: ${e?.message || "Unknown error"}`)
    }
  }

  function paginate<T>(items: T[], page: number) {
    const start = (page - 1) * pageSize
    return items.slice(start, start + pageSize)
  }

  function filterByDate<T extends { created_at?: string | null }>(items: T[], filter: string): T[] {
    if (filter === "all") return items
    
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
    
    return items.filter(item => {
      if (!item.created_at) return false // Skip items without created_at
      const itemDate = new Date(item.created_at)
      switch (filter) {
        case "today":
          return itemDate >= today
        case "yesterday":
          return itemDate >= yesterday && itemDate < today
        case "week":
          return itemDate >= weekAgo
        case "month":
          return itemDate >= monthAgo
        default:
          return true
      }
    })
  }

  async function downloadCSV() {
    try {
      const res = await fetch('/api/admin/subscribers/csv', { headers })
      if (!res.ok) throw new Error(await res.text())
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `newsletter-subscribers-${new Date().toISOString().slice(0,10)}.csv`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e: any) {
      toast.error(`Download failed: ${e?.message || 'Unknown error'}`)
    }
  }

  const tabButtons = (
    <div className="flex gap-2 mb-4">
      {(["internships","registrations","volunteers","subscribers"] as const).map(t => (
        <button
          key={t}
          onClick={() => setActiveTab(t)}
          className={`px-3 py-2 rounded border cursor-pointer hover:bg-slate-200 ${activeTab===t?"bg-black text-white border-black":"bg-white text-black border-gray-300"}`}
        >{t}</button>
      ))}
    </div>
  )

  const dateFilterButtons = (
    <div className="flex gap-2 mb-4">
      {([
        { key: "all", label: "All Time" },
        { key: "today", label: "Today" },
        { key: "yesterday", label: "Yesterday" },
        { key: "week", label: "Last Week" },
        { key: "month", label: "Last Month" }
      ] as const).map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setDateFilter(key)}
          className={`px-3 py-1.5 rounded text-sm border cursor-pointer ${
            dateFilter === key
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )

  const searchBar = (
    <div className="flex items-center gap-2 mb-4">
      <input
        value={q}
        onChange={e=>setQ(e.target.value)}
        placeholder="Search name, email, phone, or source"
        className="w-full max-w-md border rounded px-3 py-2"
      />
      <button onClick={fetchTab} className="px-3 py-2 rounded border bg-white">Search</button>
    </div>
  )

  if (!saved) {
    return (
      <main className="min-h-screen flex flex-col">
        <HeaderBar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm border rounded-lg p-6 shadow-sm">
            <h1 className="text-xl font-semibold mb-1 text-center">Admin Sign In</h1>
            <p className="text-sm text-gray-500 mb-4 text-center">Enter your admin username and passcode</p>
            <label className="block text-sm mb-1">Username</label>
            <input value={username} onChange={e=>setUsername(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" placeholder="Username" autoComplete="username" />
            <label className="block text-sm mb-1">Passcode</label>
            <input value={passcode} onChange={e=>setPasscode(e.target.value)} type="password" className="w-full border rounded px-3 py-2 mb-4" placeholder="Passcode" autoComplete="current-password" />
            {authError && <div className="text-sm text-red-600 mb-3" role="alert" aria-live="assertive">{authError}</div>}
            <button onClick={saveCreds} className="w-full px-3 py-2 rounded border bg-black text-white cursor-pointer">Continue</button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <HeaderBar onSignOut={signOut} />
      <div className="max-w-6xl mx-auto w-full p-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Admin</h1>
          <div className="flex items-center gap-3">
            {activeTab === "subscribers" && (
              <button onClick={downloadCSV} className="text-sm px-3 py-1.5 border rounded bg-white hover:bg-gray-50 cursor-pointer ">Download CSV</button>
            )}
            <div className="text-sm text-gray-500" aria-live="polite">{loading?"Loading...":""}</div>
          </div>
        </div>
      {tabButtons}
      {dateFilterButtons}
      {searchBar}
      {error && (<div className="text-red-600 mb-4">{error}</div>)}

      {activeTab === "internships" && (() => {
        const filtered = filterByDate(internships, dateFilter)
        return (
          <>
            <Table
              headers={["Name","Email","Phone","Position","Status","Actions"]}
              rows={paginate(filtered, pageIntern).map(i=>[
                i.full_name,
                i.email,
                i.phone,
                i.position,
                <StatusBadge key={`status-${i.id}`} status={i.status || 'pending'} />,
                <div key={i.id} className="flex flex-wrap gap-3">
                  <Link className="underline" href={`/admin/internship/${i.id}`}>View</Link>
                </div>
              ])}
            />
            {filtered.length > pageSize && (
              <Pagination total={filtered.length} page={pageIntern} pageSize={pageSize} onPageChange={setPageIntern} />
            )}
            <div className="mt-2 text-sm text-gray-500">
              Showing {filtered.length} of {internships.length} internship applications
            </div>
          </>
        )
      })()}

      {activeTab === "registrations" && (() => {
        const filtered = filterByDate(registrations, dateFilter)
        return (
          <>
            <Table
              headers={["Name","Email","Phone","Track","Status","Actions"]}
              rows={paginate(filtered, pageReg).map(r=>[
                `${r.first_name} ${r.last_name}`,
                r.email,
                r.phone,
                r.track,
                <StatusBadge key={`status-${r.id}`} status={r.status || 'pending'} />,
                <div key={r.id} className="flex flex-wrap gap-3">
                  <Link className="underline" href={`/admin/training/registrations/${r.id}`}>View</Link>
                </div>
              ])}
            />
            {filtered.length > pageSize && (
              <Pagination total={filtered.length} page={pageReg} pageSize={pageSize} onPageChange={setPageReg} />
            )}
            <div className="mt-2 text-sm text-gray-500">
              Showing {filtered.length} of {registrations.length} training registrations
            </div>
          </>
        )
      })()}

      {activeTab === "volunteers" && (() => {
        const filtered = filterByDate(volunteers, dateFilter)
        return (
          <>
            <Table
              headers={["Name","Email","Phone","Expertise","Years","Status","Actions"]}
              rows={paginate(filtered, pageVol).map(v=>[
                `${v.first_name} ${v.last_name}`,
                v.email,
                v.phone,
                v.expertise,
                v.years_experience,
                <StatusBadge key={`status-${v.id}`} status={v.status || 'pending'} />,
                <div key={v.id} className="flex flex-wrap gap-3">
                  <Link className="underline" href={`/admin/training/volunteers/${v.id}`}>View</Link>
                </div>
              ])}
            />
            {filtered.length > pageSize && (
              <Pagination total={filtered.length} page={pageVol} pageSize={pageSize} onPageChange={setPageVol} />
            )}
            <div className="mt-2 text-sm text-gray-500">
              Showing {filtered.length} of {volunteers.length} volunteer applications
            </div>
          </>
        )
      })()}

      {activeTab === "subscribers" && (() => {
        const filtered = filterByDate(subscribers, dateFilter)
        return (
          <>
            <Table
              headers={["Email","Status","Source","Subscribed","Actions"]}
              rows={paginate(filtered, pageSub).map(s=>[
                s.email,
                s.status || 'subscribed',
                s.source || '',
                s.created_at ? new Date(s.created_at).toLocaleString() : '',
                <div key={s.id} className="flex flex-wrap gap-3">
                  <button onClick={()=>copyToClipboard(s.email)} className="underline cursor-pointer">Copy Email</button>
                </div>
              ])}
            />
            {filtered.length > pageSize && (
              <Pagination total={filtered.length} page={pageSub} pageSize={pageSize} onPageChange={setPageSub} />
            )}
            <div className="mt-2 text-sm text-gray-500">
              Showing {filtered.length} of {subscribers.length} subscribers
            </div>
          </>
        )
      })()}
      </div>
      {loading && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center" aria-live="polite">
          <div className="bg-black/60 text-white px-4 py-2 rounded">Loading...</div>
        </div>
      )}
    </main>
  )
}

function HeaderBar({ onSignOut }: { onSignOut?: ()=>void }) {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {BRAND_LOGO ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/wicon-logo.png" alt={`${BRAND_NAME} logo`} className="h-8 w-auto" />
          ) : (
            <span className="font-semibold">{BRAND_NAME}</span>
          )}
          <span className="text-gray-400">Admin Panel</span>
        </div>
        {onSignOut && (
          <button onClick={onSignOut} className="text-sm underline cursor-pointer hover:text-slate-600">Sign out</button>
        )}
      </div>
    </header>
  )
}
function Table({ headers, rows }: { headers: string[]; rows: any[][] }) {
  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            {headers.map(h => (
              <th key={h} className="px-3 py-2 border-b">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={headers.length} className="px-3 py-6 text-center text-gray-500">No results</td></tr>
          ) : rows.map((r, idx) => (
            <tr key={idx} className="odd:bg-white even:bg-gray-50">
              {r.map((cell, i) => (
                <td key={i} className="px-3 py-2 border-b align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  } catch {
    toast.error("Failed to copy")
  }
}

 
