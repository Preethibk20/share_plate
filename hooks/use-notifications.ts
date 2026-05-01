import { useQuery } from '@tanstack/react-query'
import { mockNotifications } from '@/lib/mock-data'
import { queryKeys } from '@/lib/query-keys'

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: async () => mockNotifications,
    initialData: mockNotifications,
  })
}
