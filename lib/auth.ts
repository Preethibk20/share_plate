import type { SessionUser, UserRole } from '@/types'

const header = { alg: 'HS256', typ: 'JWT' }

function encodeBase64Url(value: string) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value).toString('base64url')
  }

  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padding = '='.repeat((4 - (normalized.length % 4)) % 4)

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value, 'base64url').toString('utf8')
  }

  return atob(`${normalized}${padding}`)
}

export function createMockJwt(user: SessionUser) {
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }

  return [header, payload, 'shareplate-signature']
    .map((part) => encodeBase64Url(JSON.stringify(part)))
    .join('.')
}

export function decodeMockJwt(token?: string | null): SessionUser | null {
  if (!token) {
    return null
  }

  const [, payload] = token.split('.')
  if (!payload) {
    return null
  }

  try {
    const parsed = JSON.parse(decodeBase64Url(payload)) as {
      sub: string
      name: string
      email: string
      role: UserRole
    }

    return {
      id: parsed.sub,
      name: parsed.name,
      email: parsed.email,
      role: parsed.role,
    }
  } catch {
    return null
  }
}

export function getRoleDashboard(role: UserRole) {
  const paths: Record<UserRole, string> = {
    donor: '/donor/dashboard',
    receiver: '/receiver/dashboard',
    transporter: '/transporter/dashboard',
    admin: '/admin/dashboard',
  }

  return paths[role]
}

export function isRolePath(pathname: string, role: UserRole) {
  const prefixes: Record<UserRole, string[]> = {
    donor: ['/donor'],
    receiver: ['/receiver'],
    transporter: ['/transporter'],
    admin: ['/admin'],
  }

  return prefixes[role].some((prefix) => pathname.startsWith(prefix))
}
