'use client'

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { mockReports, mockSessionUsers, mockListings } from '@/lib/mock-data'
import type { Listing, ReportItem, SessionUser } from '@/types'

const initialUsers: Array<SessionUser & { status: 'Pending' | 'Verified' | 'Rejected' }> = [
  { ...mockSessionUsers.donor, status: 'Pending' },
  { ...mockSessionUsers.receiver, status: 'Verified' },
  { ...mockSessionUsers.transporter, status: 'Pending' },
]

export default function AdminDashboardPage() {
  const [users, setUsers] = useState(initialUsers)
  const [listings, setListings] = useState<(Listing & { flagged?: boolean })[]>(
    mockListings.map((listing, index) => ({ ...listing, flagged: index === 1 })),
  )
  const [reports] = useState<ReportItem[]>(mockReports)

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-100 to-white p-8 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-slate-700">Admin dashboard</p>
        <h1 className="mt-4 text-4xl font-black text-slate-950">Oversee users, listings, and reports.</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Monitor verification, moderate listings, and keep the platform trustworthy.
        </p>
      </section>

      <div className="mt-8 grid gap-6">
        <Card className="rounded-[2rem] bg-white/95 shadow-soft">
          <CardHeader>
            <CardTitle className="text-2xl">Users</CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium text-slate-900">{user.name}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Verified' ? 'available' : user.status === 'Rejected' ? 'expired' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => setUsers((current) => current.map((item) => (item.id === user.id ? { ...item, status: 'Verified' } : item)))}
                        >
                          Verify
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setUsers((current) => current.map((item) => (item.id === user.id ? { ...item, status: 'Rejected' } : item)))}
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] bg-white/95 shadow-soft">
          <CardHeader>
            <CardTitle className="text-2xl">Listings</CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Food</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Flagged</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium text-slate-900">{listing.foodType}</TableCell>
                    <TableCell>{listing.distanceKm.toFixed(1)} km</TableCell>
                    <TableCell>
                      <Badge variant={listing.flagged ? 'expired' : 'available'}>{listing.flagged ? 'Flagged' : 'Clear'}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setListings((current) => current.map((item) => (item.id === listing.id ? { ...item, flagged: true } : item)))}
                        >
                          Flag
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setListings((current) => current.filter((item) => item.id !== listing.id))}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] bg-white/95 shadow-soft">
          <CardHeader>
            <CardTitle className="text-2xl">Reports</CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium text-slate-900">{report.subject}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>
                      <Badge variant={report.status === 'Resolved' ? 'available' : 'secondary'}>{report.status}</Badge>
                    </TableCell>
                    <TableCell>{report.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
