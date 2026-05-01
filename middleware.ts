import { NextRequest, NextResponse } from 'next/server'
import { decodeMockJwt, getRoleDashboard, isRolePath } from '@/lib/auth'

const publicRoutes = ['/', '/login', '/register']
const protectedRoutes = ['/donor', '/receiver', '/transporter', '/admin', '/notifications', '/profile']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
  if (!isProtected) {
    return NextResponse.next()
  }

  const token = request.cookies.get('shareplate_token')?.value
  const user = decodeMockJwt(token)

  if (!user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname === '/login' || pathname === '/register') {
    return NextResponse.redirect(new URL(getRoleDashboard(user.role), request.url))
  }

  if (isRolePath(pathname, user.role)) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/notifications') || pathname.startsWith('/profile')) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(getRoleDashboard(user.role), request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
}
