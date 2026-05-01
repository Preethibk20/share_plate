import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: number
}

export function Slider({ className, value, ...props }: SliderProps) {
  return (
    <input
      type="range"
      value={value}
      className={cn('h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-100 accent-brand-600', className)}
      {...props}
    />
  )
}
