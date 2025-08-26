import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  // This file runs only in client contexts; avoid throwing during build
  // but log to help diagnose missing envs.
  // eslint-disable-next-line no-console
  console.warn('Supabase client: missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
