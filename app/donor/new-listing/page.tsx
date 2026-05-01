'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCreateListingMutation } from '@/hooks/use-listings'
import { cn } from '@/lib/utils'

const LocationPicker = dynamic(() => import('@/components/shared/location-picker').then((module) => module.LocationPicker), {
  ssr: false,
})

const schema = z.object({
  foodType: z.string().min(2, 'Enter a food type'),
  quantity: z.coerce.number().min(1, 'Quantity is required'),
  pickupAddress: z.string().min(5, 'Enter a pickup address'),
  expiryNote: z.string().optional(),
})

type ListingForm = z.infer<typeof schema>

const defaultLocation: [number, number] = [19.076, 72.8777]

export default function NewListingPage() {
  const router = useRouter()
  const createListing = useCreateListingMutation()
  const [location, setLocation] = useState<[number, number]>(defaultLocation)
  const [photoName, setPhotoName] = useState('No file chosen')

  const form = useForm<ListingForm>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      foodType: 'Packed meals',
      quantity: 60,
      pickupAddress: 'Andheri East, Mumbai',
      expiryNote: 'Available for pickup within the next 2 hours.',
    },
  })

  async function onSubmit(values: ListingForm) {
    await createListing.mutateAsync({
      ...values,
      unit: 'meals',
      distanceKm: 0,
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
      pickupAddress: values.pickupAddress,
      expiryNote: values.expiryNote,
      donor: { name: 'You', role: 'Donor', location: values.pickupAddress, rating: 5 },
      coordinates: { lat: location[0], lng: location[1] },
      expiryAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    })
    router.push('/donor/dashboard')
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <Card className="rounded-[2rem] bg-white/95 shadow-soft">
          <CardHeader>
            <CardTitle className="text-3xl">Create a food listing</CardTitle>
            <p className="text-sm text-slate-500">Listings automatically expire 2 hours after publishing.</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="foodType">Food type</Label>
                <Input id="foodType" {...form.register('foodType')} />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" min="1" {...form.register('quantity')} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="photo">Photo upload</Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      setPhotoName(file?.name ?? 'No file chosen')
                    }}
                  />
                  <p className="text-xs text-slate-500">{photoName}</p>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pickupAddress">Pickup address</Label>
                <Textarea id="pickupAddress" rows={3} {...form.register('pickupAddress')} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="expiryNote">Expiry note</Label>
                <Textarea id="expiryNote" rows={3} {...form.register('expiryNote')} />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="submit" disabled={createListing.isPending}>
                  {createListing.isPending ? 'Publishing...' : 'Publish listing'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push('/donor/dashboard')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] bg-white/95 shadow-soft">
          <CardHeader>
            <CardTitle className="text-2xl">Drop a map pin</CardTitle>
            <p className="text-sm text-slate-500">Click on the map to update the pickup location marker.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <LocationPicker value={location} onChange={setLocation} />
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Selected coordinates</p>
              <p className="mt-1">Lat: {location[0].toFixed(4)}</p>
              <p>Lng: {location[1].toFixed(4)}</p>
              <p className={cn('mt-2', 'text-xs text-slate-500')}>The listing will auto-expire 2 hours after submit.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
