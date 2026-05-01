'use client'

import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { FoodListingCard } from '@/components/shared/food-listing-card'
import { useNearbyListings } from '@/hooks/use-nearby-listings'

const MapView = dynamic(() => import('@/components/shared/map-view').then((module) => module.MapView), {
  ssr: false,
})

export default function ReceiverDashboardPage() {
  const router = useRouter()
  const [radius, setRadius] = useState(8)
  const [view, setView] = useState<'map' | 'list'>('map')
  const { data: listings = [] } = useNearbyListings(radius)

  const listingCount = useMemo(() => listings.length, [listings])

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-8 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-700">Receiver dashboard</p>
        <h1 className="mt-4 text-4xl font-black text-slate-950">Discover nearby food listings.</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Browse the map, filter by distance, and reserve food for shelters and NGOs that need it now.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Radius: {radius} km</span>
              <span>{listingCount} listings found</span>
            </div>
            <Slider min={1} max={20} value={radius} onChange={(event) => setRadius(Number(event.target.value))} />
          </div>
          <div className="flex gap-3">
            <Button variant={view === 'map' ? 'default' : 'outline'} onClick={() => setView('map')}>
              Map view
            </Button>
            <Button variant={view === 'list' ? 'default' : 'outline'} onClick={() => setView('list')}>
              List view
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          {view === 'map' ? (
            <MapView
              listings={listings}
              radiusKm={radius}
              onReserve={(listing) => router.push(`/receiver/reserve/${listing.id}`)}
              className="h-[620px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft"
            />
          ) : (
            <div className="space-y-4">
              {listings.map((listing) => (
                <FoodListingCard
                  key={listing.id}
                  listing={listing}
                  onAction={(selectedListing) => router.push(`/receiver/reserve/${selectedListing.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        <Card className="rounded-[2rem] bg-white/95 shadow-soft">
          <CardContent className="space-y-4 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-700">Quick overview</p>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Matching by distance</p>
              <p className="mt-1">Listings update as you move the radius slider from 1 km to 20 km.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Popup actions</p>
              <p className="mt-1">Each marker can open a reservation flow without leaving the map.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
