import { useQuery } from '@tanstack/react-query'
import { mockUser } from '@/lib/mock-data'
import { queryKeys } from '@/lib/query-keys'

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: async () => mockUser,
    initialData: mockUser,
  })
}
