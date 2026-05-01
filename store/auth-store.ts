import { create } from 'zustand'
import type { SessionUser, UserRole } from '@/types'

type AuthState = {
  token: string | null
  currentUser: SessionUser | null
  role: UserRole | null
  setSession: (user: SessionUser | null, token?: string | null) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  currentUser: null,
  role: null,
  setSession: (user, token = null) =>
    set({
      currentUser: user,
      role: user?.role ?? null,
      token,
    }),
  clearSession: () => set({ token: null, currentUser: null, role: null }),
}))
