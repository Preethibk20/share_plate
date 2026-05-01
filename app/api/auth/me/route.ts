import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { decodeMockJwt } from '@/lib/auth'

export async function GET() {
  const token = cookies().get('shareplate_token')?.value
  const user = decodeMockJwt(token)
  return NextResponse.json({ user })
}
