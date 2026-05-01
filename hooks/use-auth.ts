import { useMutation, useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { useAuthStore } from '@/store/auth-store'
import type { SessionUser } from '@/types'

export function useAuth() {
  return useAuthStore()
}

export function useSession() {
  return useQuery({
    queryKey: queryKeys.auth,
    queryFn: async () => {
      const response = await fetch('/api/auth/me')
      const payload = (await response.json()) as { user: SessionUser | null }
      return payload.user
    },
  })
}

export function useLoginMutation() {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: async (payload: { email: string; password: string; role: SessionUser['role'] }) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Unable to sign in.')
      }

      return (await response.json()) as { user: SessionUser; token: string }
    },
    onSuccess: (data) => {
      setSession(data.user, data.token)
    },
  })
}

export function useLogoutMutation() {
  const clearSession = useAuthStore((state) => state.clearSession)

  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/logout', { method: 'POST' })

      if (!response.ok) {
        throw new Error('Unable to sign out.')
      }

      return response.json()
    },
    onSuccess: () => clearSession(),
  })
}
