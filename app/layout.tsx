import type { Metadata } from 'next'
import 'leaflet/dist/leaflet.css'
import './globals.css'
import { Navbar } from '@/components/shared/navbar'
import { Providers } from '@/app/providers'

export const metadata: Metadata = {
  title: 'SharePlate',
  description: 'Food donation platform connecting donors, NGOs, transporters, and admins.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-warm-grid text-slate-900">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
