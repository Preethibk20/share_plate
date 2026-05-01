'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RatingStars } from '@/components/shared/rating-stars'
import { useProfile } from '@/hooks/use-profile'
import { Badge } from '@/components/ui/badge'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  address: z.string().optional(),
})

type ProfileForm = z.infer<typeof schema>

export default function ProfilePage() {
  const { data: profile } = useProfile()
  const [rating, setRating] = useState(profile.rating ?? 4.8)

  const form = useForm<ProfileForm>({
    resolver: zodResolver(schema),
    values: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? '',
      organization: profile.organization ?? '',
      address: profile.address ?? '',
    },
  })

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[2rem] bg-white/95 shadow-soft">
          <CardHeader>
            <CardTitle className="text-3xl">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-5">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...form.register('name')} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...form.register('email')} />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" {...form.register('phone')} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" {...form.register('organization')} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" {...form.register('address')} />
              </div>
              <Button type="button">Save changes</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[2rem] bg-white/95 shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Rating</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RatingStars value={rating} onChange={setRating} />
              <p className="text-sm text-slate-600">Current rating based on completed donation interactions.</p>
              <Badge variant="available">{profile.ratingCount ?? 0} reviews</Badge>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] bg-white/95 shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Donation history</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.donationHistory?.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.date}</p>
                    </div>
                    <Badge variant={item.status === 'Completed' ? 'available' : item.status === 'Reserved' ? 'reserved' : 'expired'}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{item.quantity} meals</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
