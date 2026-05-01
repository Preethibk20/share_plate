'use client'

import { useEffect, useMemo, useState } from 'react'
import { Clock3, MapPin, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/status-badge'
import { RatingStars } from '@/components/shared/rating-stars'
import type { Listing } from '@/types'

function formatTimeLeft(expiryAt: string) {
  const totalSeconds = Math.max(0, Math.floor((new Date(expiryAt).getTime() - Date.now()) / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  if (hours === 0 && minutes === 0) {
    return 'Expired soon'
  }

  return `${hours}h ${minutes}m left`
}

export function FoodListingCard({
  listing,
  actionLabel = 'Reserve',
  onAction,
}: {
  listing: Listing
  actionLabel?: string
  onAction?: (listing: Listing) => void
}) {
  const [timeLeft, setTimeLeft] = useState(() => formatTimeLeft(listing.expiryAt))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(formatTimeLeft(listing.expiryAt))
    }, 60_000)

    return () => window.clearInterval(timer)
  }, [listing.expiryAt])

  const timeLabel = useMemo(() => timeLeft, [timeLeft])

  return (
    <Card className="overflow-hidden border-slate-200/80">
      <div className="grid gap-0 md:grid-cols-[220px_1fr]">
        <img src={listing.image} alt={listing.foodType} className="h-52 w-full object-cover md:h-full" />
        <CardContent className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <StatusBadge status={listing.status} />
              <h3 className="mt-3 text-xl font-semibold text-slate-900">{listing.foodType}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Package className="h-4 w-4" />
                {listing.quantity} {listing.unit}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">{listing.distanceKm.toFixed(1)} km away</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                <Clock3 className="h-4 w-4" />
                {timeLabel}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-600" />
              {listing.pickupAddress}
            </span>
            <span>Donor: {listing.donor.name}</span>
            <RatingStars value={listing.donor.rating} readOnly />
          </div>

          {listing.expiryNote ? <p className="mt-4 text-sm text-slate-500">{listing.expiryNote}</p> : null}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button onClick={() => onAction?.(listing)}>{actionLabel}</Button>
            <p className="text-xs text-slate-400">Auto-expires in 2 hours after publishing.</p>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
