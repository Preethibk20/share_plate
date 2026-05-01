'use client'

import Link from 'next/link'
import { Bell, LogOut, Menu } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { useNotifications } from '@/hooks/use-notifications'
import { getRoleDashboard } from '@/lib/auth'
import { RoleBadge } from '@/components/shared/role-badge'

const baseLinks = [
  { href: '/', label: 'Home' },
  { href: '/register', label: 'Register' },
  { href: '/login', label: 'Login' },
  { href: '/notifications', label: 'Notifications' },
  { href: '/profile', label: 'Profile' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { currentUser, role } = useAuth()
  const notifications = useNotifications()
  const unreadCount = useMemo(
    () => notifications.data?.filter((notification) => !notification.read).length ?? 0,
    [notifications.data],
  )

  const dashboardHref = role ? getRoleDashboard(role) : '/login'
  const links = currentUser
    ? [{ href: dashboardHref, label: 'Dashboard' }, ...baseLinks.slice(0, 1), ...baseLinks.slice(3)]
    : baseLinks

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-lg font-black text-white shadow-soft">
            S
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-700">SharePlate</p>
            <p className="text-xs text-slate-500">Food rescue network</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {role ? <RoleBadge role={role} /> : null}
          <div className="relative">
            <Button asChild variant="outline" size="icon" aria-label="Notifications">
              <Link href="/notifications">
                <Bell className="h-4 w-4" />
              </Link>
            </Button>
            {unreadCount > 0 ? (
              <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
                {unreadCount}
              </Badge>
            ) : null}
          </div>
          {currentUser ? (
            <Button variant="outline" className="hidden sm:inline-flex" onClick={() => setOpen((current) => !current)}>
              <Menu className="mr-2 h-4 w-4" />
              {currentUser.name.split(' ')[0]}
            </Button>
          ) : (
            <Button asChild className="hidden sm:inline-flex">
              <Link href={dashboardHref}>Get Started</Link>
            </Button>
          )}
          {currentUser ? (
            <Button asChild variant="ghost" size="icon" aria-label="Log out">
              <Link href="/login">
                <LogOut className="h-4 w-4" />
              </Link>
            </Button>
          ) : null}
        </div>
      </div>

      <div className={cn('border-t border-slate-200 bg-white px-4 pb-4 pt-2 lg:hidden', open ? 'block' : 'hidden')}>
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
