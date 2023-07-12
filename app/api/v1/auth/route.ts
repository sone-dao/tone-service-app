import { NextResponse } from 'next/server'
import authEmail from './authEmail'
import genAttempt from './genAttempt'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email') || ''

  const data = await genAttempt(email)
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email') || ''
  const { nonce, otp } = await request.json()

  const data = await authEmail(email, nonce, otp)
  return NextResponse.json(data)
}
