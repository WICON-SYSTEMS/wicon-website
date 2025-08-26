import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

function checkAdminAuth(req: NextRequest) {
  const username = req.headers.get('x-admin-username')
  const passcode = req.headers.get('x-admin-passcode')
  return username === process.env.ADMIN_USERNAME && passcode === process.env.ADMIN_PASSCODE
}

function isStorageKey(value: string): boolean {
  return typeof value === 'string' && value.length > 0 && !value.startsWith('http') && !value.startsWith('data:') && !value.startsWith('/')
}

async function generateSignedUrl(bucket: string, path: string): Promise<string | null> {
  try {
    const { data, error } = await supabaseServer.storage
      .from(bucket)
      .createSignedUrl(path, 3600) // 1 hour expiry
    
    if (error) {
      console.warn(`Failed to generate signed URL for ${bucket}/${path}:`, error)
      return null
    }
    
    return data.signedUrl
  } catch (error) {
    console.warn(`Error generating signed URL for ${bucket}/${path}:`, error)
    return null
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data, error } = await supabaseServer
      .from('training_registrations')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) throw error
    if (!data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Generate signed URLs for attachments
    const enrichedData = { ...data }
    
    // Handle photo attachments using bucket+path structure
    if (data.photo_bucket && data.photo_path) {
      const signedUrl = await generateSignedUrl(data.photo_bucket, data.photo_path)
      if (signedUrl) {
        enrichedData.photo_signed_url = signedUrl
      }
    }
    
    // Handle document attachments using bucket+path structure
    if (data.cv_bucket && data.cv_path) {
      const signedUrl = await generateSignedUrl(data.cv_bucket, data.cv_path)
      if (signedUrl) {
        enrichedData.cv_signed_url = signedUrl
      }
    }
    
    // Fallback: Handle legacy URL fields
    const photoFields = ['photo_url', 'photo', 'image_url', 'avatar_url']
    for (const field of photoFields) {
      if (data[field] && isStorageKey(data[field])) {
        const signedUrl = await generateSignedUrl('applications-photos', data[field])
        if (signedUrl) {
          enrichedData[`${field}_signed`] = signedUrl
        }
      }
    }
    
    const docFields = ['cv_url', 'resume_url', 'cv', 'resume', 'document_url']
    for (const field of docFields) {
      if (data[field] && isStorageKey(data[field])) {
        const signedUrl = await generateSignedUrl('training-resumes', data[field])
        if (signedUrl) {
          enrichedData[`${field}_signed`] = signedUrl
        }
      }
    }

    return NextResponse.json({ item: enrichedData })
  } catch (error: any) {
    console.error('Error fetching training registration:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch training registration' },
      { status: 500 }
    )
  }
}
