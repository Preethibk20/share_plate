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
  })
}

export function useListing(listingId: string) {
  return useQuery({
    queryKey: [...queryKeys.listings, listingId],
    queryFn: async () => listings.find((listing) => listing.id === listingId) ?? null,
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
