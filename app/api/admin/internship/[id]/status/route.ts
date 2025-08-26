import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

function checkAdminAuth(req: NextRequest) {
  const username = req.headers.get('x-admin-username')
  const passcode = req.headers.get('x-admin-passcode')
  return username === process.env.ADMIN_USERNAME && passcode === process.env.ADMIN_PASSCODE
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { status, reviewMessage } = await req.json()
    
    if (!['pending', 'accepted', 'declined'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const { data, error } = await supabaseServer
      .from('internship_applications')
      .update({
        status,
        reviewed_at: new Date().toISOString(),
        review_message: reviewMessage
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error
    if (!data) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, item: data })
  } catch (error: any) {
    console.error('Error updating application status:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update status' },
      { status: 500 }
    )
  }
}
