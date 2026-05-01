'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth-store'
import type { SessionUser } from '@/types'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const setSession = useAuthStore((state) => state.setSession)

  useEffect(() => {
    let mounted = true

    fetch('/api/auth/me')
      .then((response) => response.json() as Promise<{ user: SessionUser | null }>)
      .then((payload) => {
        if (mounted) {
          setSession(payload.user)
        }
      })
      .catch(() => {
        if (mounted) {
          setSession(null)
        }
      })

    return () => {
      mounted = false
    }
  }, [setSession])

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
