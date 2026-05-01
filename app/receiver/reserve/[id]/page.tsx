'use client'

import { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ConfirmModal } from '@/components/shared/confirm-modal'
import { FoodListingCard } from '@/components/shared/food-listing-card'
import { RatingStars } from '@/components/shared/rating-stars'
import { StatusBadge } from '@/components/shared/status-badge'
import { useListing } from '@/hooks/use-listings'

export default function ReserveListingPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { data: listing } = useListing(params.id)
  const [open, setOpen] = useState(false)
  const [reserved, setReserved] = useState(false)

  const donorInfo = useMemo(
    () =>
      listing
        ? {
            name: listing.donor.name,
            location: listing.donor.location,
            rating: listing.donor.rating,
          }
        : null,
    [listing],
  )

  if (!listing) {
    return <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">Listing not found.</main>
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <FoodListingCard listing={listing} actionLabel="Reserve now" onAction={() => setOpen(true)} />
          <Card className="rounded-[2rem] bg-white/95 shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Reservation details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p>Food type: {listing.foodType}</p>
              <p>Pickup address: {listing.pickupAddress}</p>
              <p>Distance: {listing.distanceKm.toFixed(1)} km</p>
              <p>Availability: <StatusBadge status={listing.status} /></p>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[2rem] bg-white/95 shadow-soft">
          <CardHeader>
            <CardTitle className="text-2xl">Donor information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reserved && donorInfo ? (
              <>
                <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-950">{donorInfo.name}</p>
                  <p className="mt-1">{donorInfo.location}</p>
                </div>
                <RatingStars value={donorInfo.rating} readOnly />
                <p className="text-sm text-slate-500">
                  Reservation confirmed. The donor contact details will become available after approval.
                </p>
              </>
            ) : (
              <p className="text-sm text-slate-500">
                Reserve this listing to reveal donor details and coordinate pickup.
              </p>
            )}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button onClick={() => setOpen(true)} disabled={reserved}>
                {reserved ? 'Reserved' : 'Reserve'}
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                Go back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ConfirmModal
        open={open}
        onOpenChange={setOpen}
        title="Reserve this donation?"
        description={`You are about to reserve ${listing.foodType} from ${listing.donor.name}.`}
        confirmLabel="Confirm reservation"
        onConfirm={() => {
          setReserved(true)
          setOpen(false)
        }}
      />
    </main>
  )
}
