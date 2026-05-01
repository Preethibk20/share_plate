import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { mockListings } from '@/lib/mock-data'
import { queryKeys } from '@/lib/query-keys'

export function useNearbyListings(radiusKm: number) {
  const filteredListings = useMemo(
    () => mockListings.filter((listing) => listing.distanceKm <= radiusKm),
    [radiusKm],
  )

  return useQuery({
    queryKey: queryKeys.nearbyListings(radiusKm),
    queryFn: async () => filteredListings,
    initialData: filteredListings,
  })
}
