import { Badge } from '@/components/ui/badge'
import type { UserRole } from '@/types'

const roleVariants: Record<UserRole, 'donor' | 'receiver' | 'transporter' | 'admin'> = {
  donor: 'donor',
  receiver: 'receiver',
  transporter: 'transporter',
  admin: 'admin',
}

const labels: Record<UserRole, string> = {
  donor: 'Donor',
  receiver: 'Receiver',
  transporter: 'Transporter',
  admin: 'Admin',
}

export function RoleBadge({ role }: { role: UserRole }) {
  return <Badge variant={roleVariants[role]}>{labels[role]}</Badge>
}
