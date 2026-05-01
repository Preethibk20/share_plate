import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', {
  variants: {
    variant: {
      default: 'bg-brand-100 text-brand-800',
      secondary: 'bg-slate-100 text-slate-700',
      outline: 'border border-slate-200 bg-white text-slate-700',
      donor: 'bg-amber-100 text-amber-900',
      receiver: 'bg-brand-100 text-brand-800',
      transporter: 'bg-sky-100 text-sky-900',
      admin: 'bg-slate-200 text-slate-800',
      available: 'bg-brand-100 text-brand-800',
      reserved: 'bg-amber-100 text-amber-900',
      expired: 'bg-rose-100 text-rose-800',
      delivered: 'bg-sky-100 text-sky-900',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
