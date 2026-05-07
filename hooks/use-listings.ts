import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mockListings } from '@/lib/mock-data'
import { queryKeys } from '@/lib/query-keys'
import type { Listing } from '@/types'

const listings = mockListings

export function useListings() {
  return useQuery({
    queryKey: queryKeys.listings,
    queryFn: async () => listings,
    initialData: listings,
    // Real-time synchronization: Poll every 10 seconds to simulate updates
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  })
}

export function useListing(listingId: string) {
  return useQuery({
    queryKey: [...queryKeys.listings, listingId],
    queryFn: async () => {
      // Handle demo IDs for local prototyping
      if (listingId === 'demo_1' || listingId === 'demo_2') {
        return {
          ...mockListings[listingId === 'demo_1' ? 0 : 1],
          id: listingId,
          foodType: listingId === 'demo_1' ? 'Fresh surplus meals (Local Demo)' : 'Bakery items (Local Demo)',
          pickupAddress: listingId === 'demo_1' ? 'Local Community Center' : 'Neighborhood Hub',
          donor: { ...mockListings[0].donor, location: 'Nearby' },
        }
      }
      return listings.find((listing) => listing.id === listingId) ?? null
    },
  })
}

export function useCreateListingMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (listing: Omit<Listing, 'id' | 'createdAt' | 'status'>) => ({
      ...listing,
      id: `list_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Available' as const,
    }),
    onSuccess: (createdListing) => {
      queryClient.setQueryData<Listing[]>(queryKeys.listings, (current = []) => [createdListing, ...current])
    },
  })
}
