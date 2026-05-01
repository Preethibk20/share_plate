'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockPickups } from '@/lib/mock-data'
import type { DeliveryStatus } from '@/types'

const steps: DeliveryStatus[] = ['Assigned', 'Picked Up', 'Delivered']

export default function TransporterDashboardPage() {
  const [statuses, setStatuses] = useState<Record<string, DeliveryStatus>>(
    Object.fromEntries(mockPickups.map((pickup) => [pickup.id, pickup.status])) as Record<string, DeliveryStatus>,
  )

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-8 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-sky-700">Transporter dashboard</p>
        <h1 className="mt-4 text-4xl font-black text-slate-950">Manage assigned pickups and delivery status.</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Track routes, mark handoffs, and keep the delivery flow visible for donors and receivers.
        </p>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {mockPickups.map((pickup) => (
          <Card key={pickup.id} className="rounded-[2rem] bg-white/95 shadow-soft">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-sky-700">{pickup.routeInfo}</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-950">{pickup.donorName} to {pickup.receiverName}</h2>
                </div>
                <Badge variant="transporter">{statuses[pickup.id]}</Badge>
              </div>
              <div className="grid gap-2 text-sm text-slate-600">
                <p>Pickup address: {pickup.pickupAddress}</p>
                <p>Scheduled for: {new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(pickup.scheduledFor))}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {steps.map((step) => (
                  <Button
                    key={step}
                    variant={statuses[pickup.id] === step ? 'default' : 'outline'}
                    onClick={() => setStatuses((current) => ({ ...current, [pickup.id]: step }))}
                  >
                    {step}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
