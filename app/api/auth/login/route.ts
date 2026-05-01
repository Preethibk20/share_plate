import { NextResponse } from 'next/server'
import { createMockJwt } from '@/lib/auth'
import { mockSessionUsers } from '@/lib/mock-data'
import type { SessionUser, UserRole } from '@/types'

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string
    password?: string
    role?: UserRole
  }

  if (!body.email || !body.password || !body.role) {
    return NextResponse.json({ message: 'Email, password, and role are required.' }, { status: 400 })
  }

  const user = mockSessionUsers[body.role]
  const sessionUser: SessionUser = {
    ...user,
    email: body.email,
    role: body.role,
  }
  const token = createMockJwt(sessionUser)

  const response = NextResponse.json({ user: sessionUser, token })
  response.cookies.set('shareplate_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  })

  return response
}
