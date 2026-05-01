'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RatingStars({
  value,
  onChange,
  readOnly = false,
}: {
  value: number
  onChange?: (value: number) => void
  readOnly?: boolean
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1
        const active = starValue <= Math.round(value)

        return (
          <button
            key={starValue}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(starValue)}
            className={cn(
              'rounded-full p-1 transition-transform hover:scale-110 disabled:cursor-default',
              readOnly && 'pointer-events-none',
            )}
            aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
          >
            <Star className={cn('h-4 w-4', active ? 'fill-amber-400 text-amber-400' : 'text-slate-300')} />
          </button>
        )
      })}
      <span className="ml-2 text-sm font-medium text-slate-600">{value.toFixed(1)}</span>
    </div>
  )
}
