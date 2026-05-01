import { Badge } from '@/components/ui/badge'
import type { ListingStatus } from '@/types'

const variants: Record<ListingStatus, 'available' | 'reserved' | 'expired' | 'delivered'> = {
  Available: 'available',
  Reserved: 'reserved',
  Expired: 'expired',
  Delivered: 'delivered',
}

export function StatusBadge({ status }: { status: ListingStatus }) {
  return <Badge variant={variants[status]}>{status}</Badge>
}
