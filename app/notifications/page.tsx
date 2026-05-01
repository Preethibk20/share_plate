 'use client'

import { Bell } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNotifications } from '@/hooks/use-notifications'

const typeLabels = {
  nearby_listing: 'Nearby listing',
  reservation_confirmed: 'Reservation',
  delivery_update: 'Delivery',
  verification: 'Verification',
} as const

export default function NotificationsPage() {
  const { data: notifications = [] } = useNotifications()

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-brand-100 bg-white p-8 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-700">Notifications</p>
            <h1 className="text-4xl font-black text-slate-950">Live updates from SharePlate.</h1>
          </div>
        </div>
      </section>

      <div className="mt-6 space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="rounded-[2rem] bg-white/95 shadow-soft">
            <CardContent className="flex items-start justify-between gap-4 p-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={notification.read ? 'secondary' : 'default'}>{typeLabels[notification.type]}</Badge>
                  {!notification.read ? <Badge variant="reserved">Unread</Badge> : null}
                </div>
                <h2 className="text-xl font-semibold text-slate-950">{notification.title}</h2>
                <p className="text-slate-600">{notification.message}</p>
              </div>
              <p className="text-sm text-slate-400">{new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(notification.createdAt))}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
