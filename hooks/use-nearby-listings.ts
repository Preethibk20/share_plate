import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { mockListings } from '@/lib/mock-data'
import { queryKeys } from '@/lib/query-keys'
import { calculateDistance } from '@/lib/utils'

export function useNearbyListings(userCoords: { lat: number; lng: number } | null, radiusKm: number) {
  const filteredListings = useMemo(() => {
    if (!userCoords) return []

    // Calculate real distances
    const withDistances = mockListings.map((listing) => ({
      ...listing,
      distanceKm: calculateDistance(
        userCoords.lat,
        userCoords.lng,
        listing.coordinates.lat,
        listing.coordinates.lng,
      ),
    }))

    const nearby = withDistances.filter((listing) => listing.distanceKm <= radiusKm)

    // PROTOTYPE ENHANCEMENT: If the user is in a different city (e.g. Bangalore),
    // we generate a few mock pins near them so they can see the Haversine algorithm in action.
    if (nearby.length === 0) {
      return [
        {
          ...mockListings[0],
          id: 'demo_1',
          foodType: 'Fresh surplus meals (Local Demo)',
          distanceKm: radiusKm * 0.4,
          pickupAddress: 'Local Community Center',
          donor: { ...mockListings[0].donor, location: 'Nearby' },
          coordinates: {
            lat: userCoords.lat + 0.005,
            lng: userCoords.lng + 0.005,
          },
        },
        {
          ...mockListings[1],
          id: 'demo_2',
          foodType: 'Bakery items (Local Demo)',
          distanceKm: radiusKm * 0.7,
          pickupAddress: 'Neighborhood Hub',
          donor: { ...mockListings[1].donor, location: 'Nearby' },
          coordinates: {
            lat: userCoords.lat - 0.008,
            lng: userCoords.lng + 0.002,
          },
        },
      ]
    }

    return nearby.sort((a, b) => a.distanceKm - b.distanceKm)
  }, [userCoords, radiusKm])

  return useQuery({
    queryKey: [...queryKeys.nearbyListings(radiusKm), userCoords?.lat, userCoords?.lng],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400))
      return filteredListings
    },
    enabled: !!userCoords,
  })
}
