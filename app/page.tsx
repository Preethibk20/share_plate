import Link from 'next/link'
import { ArrowRight, CheckCircle2, MapPinned, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const stats = [
  { label: 'Meals rescued', value: '28K+' },
  { label: 'Verified NGOs', value: '540+' },
  { label: 'Avg. pickup time', value: '42 min' },
  { label: 'Cities live', value: '18' },
]

const steps = [
  {
    title: 'Donors post surplus food',
    description: 'Restaurants, stores, and events list available food with quantity, expiry, and location.',
  },
  {
    title: 'Receivers reserve nearby listings',
    description: 'NGOs and shelters filter by distance, reserve donations, and prepare distribution.',
  },
  {
    title: 'Transporters complete delivery',
    description: 'Volunteers and delivery partners move food when pickup or last-mile support is needed.',
  },
  {
    title: 'Admins keep it safe',
    description: 'Verification, moderation, and activity oversight keep the network reliable.',
  },
]

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-20 px-4 py-8 pb-16 sm:px-6 lg:px-8">
      <section className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            <Sparkles className="h-4 w-4" />
            Food donation that moves faster than waste.
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Connect surplus food with the people and partners who can use it now.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              SharePlate helps donors, NGOs, transporters, and admins coordinate food rescue with secure
              authentication, location-aware listings, and role-based workflows.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="h-12 px-6 text-base">
              <Link href="/register">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-6 text-base">
              <Link href="/login">I already have an account</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="rounded-3xl bg-white/90 shadow-soft">
                <CardContent className="p-5">
                  <p className="text-3xl font-black text-slate-950">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="relative overflow-hidden border-brand-100 bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-950 text-white shadow-2xl">
          <CardContent className="space-y-6 p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              <MapPinned className="h-4 w-4" />
              Nearby donation map
            </div>
            <div className="space-y-4 rounded-3xl border border-white/15 bg-white/8 p-6 backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-emerald-100">Live listing</p>
                  <h2 className="mt-2 text-2xl font-bold">48 meal packs available</h2>
                </div>
                <ShieldCheck className="h-10 w-10 text-emerald-200" />
              </div>
              <div className="space-y-3 text-sm text-emerald-50/90">
                <p>Pickup window: 2 hours remaining</p>
                <p>Distance: 1.4 km from receiver hub</p>
                <p>Status: verified donor, reserved by nearby NGO</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/8 p-4">
                <p className="text-sm text-emerald-100">Role-aware access</p>
                <p className="mt-1 text-lg font-semibold">Four workflows, one platform</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/8 p-4">
                <p className="text-sm text-emerald-100">Trusted handoffs</p>
                <p className="mt-1 text-lg font-semibold">Verification and live updates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-700">How it works</p>
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Simple steps that keep food moving.</h2>
          <p className="text-slate-600">Every role sees the same donation network through a different lens.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={step.title} className="h-full rounded-3xl border-slate-200 bg-white/90">
              <CardContent className="space-y-4 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-brand-700">0{index + 1}</p>
                <h3 className="text-xl font-semibold text-slate-950">{step.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-[2rem] border border-brand-100 bg-white p-8 shadow-soft lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-700">Ready to start</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">Build the food rescue workflow your city needs.</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Use SharePlate to coordinate listings, reservations, transport, verification, and reporting from a single interface.
          </p>
        </div>
        <Button asChild className="h-12 px-6 text-base">
          <Link href="/register">Create an account</Link>
        </Button>
      </section>
    </main>
  )
}
