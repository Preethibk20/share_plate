 'use client'

import Link from 'next/link'
import { ArrowRight, TrendingUp, UtensilsCrossed, Warehouse } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FoodListingCard } from '@/components/shared/food-listing-card'
import { useListings } from '@/hooks/use-listings'

export default function DonorDashboardPage() {
  const { data: listings = [] } = useListings()
  const activeListings = listings.filter((listing) => listing.status !== 'Expired')
  const totalDonated = 1240
  const pickupRate = 92

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4 rounded-[2rem] border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-8 shadow-soft">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-amber-700">Donor dashboard</p>
          <h1 className="text-4xl font-black text-slate-950">Manage active surplus food listings.</h1>
          <p className="max-w-2xl text-slate-600">
            Track current donations, create new listings, and review pickup performance for restaurants, stores, and events.
          </p>
          <Button asChild className="h-12 px-6 text-base">
            <Link href="/donor/new-listing">
              Create a new listing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="rounded-3xl bg-white/95">
            <CardContent className="space-y-3 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                <UtensilsCrossed className="h-5 w-5" />
              </div>
              <p className="text-sm text-slate-500">Total donated</p>
              <p className="text-3xl font-black text-slate-950">{totalDonated} meals</p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl bg-white/95">
            <CardContent className="space-y-3 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                <TrendingUp className="h-5 w-5" />
              </div>
              <p className="text-sm text-slate-500">Pickup rate</p>
              <p className="text-3xl font-black text-slate-950">{pickupRate}%</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-10 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-amber-700">Active listings</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Recent donation activity</h2>
          </div>
          <Card className="hidden rounded-2xl border-slate-200 bg-white px-5 py-4 lg:block">
            <div className="flex items-center gap-3 text-slate-600">
              <Warehouse className="h-5 w-5 text-amber-700" />
              <span>{activeListings.length} live listings</span>
            </div>
          </Card>
        </div>

        <div className="grid gap-5">
          {activeListings.map((listing) => (
            <FoodListingCard key={listing.id} listing={listing} actionLabel="View listing" />
          ))}
        </div>
      </section>
    </main>
  )
}
