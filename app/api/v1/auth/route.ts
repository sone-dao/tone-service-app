import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const sb = createClient(
  process.env.SB_URL as string,
  process.env.SB_KEY as string
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email') || ''

  const data = { ok: true, email }
  return NextResponse.json(data)
}
