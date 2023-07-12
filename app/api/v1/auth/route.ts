import { NextResponse } from 'next/server'
import authEmail from './authEmail'
import genAttempt from './genAttempt'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email') || ''

  const data: any = await genAttempt(email).catch((error) => error)
  return NextResponse.json(data, { status: data.status })
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email') || ''
  const { nonce, otp } = await request.json()

  const data: any = await authEmail(email, nonce, otp).catch((error) => error)
  return NextResponse.json(data, { status: data.status })
}
