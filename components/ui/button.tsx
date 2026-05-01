import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-brand-600 text-white shadow-soft hover:bg-brand-700',
        secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50',
        outline: 'border border-slate-200 bg-transparent text-slate-900 hover:bg-white',
        ghost: 'text-slate-700 hover:bg-brand-50',
        destructive: 'bg-rose-600 text-white hover:bg-rose-700',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    const resolvedClassName = cn(buttonVariants({ variant, size, className }))

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(resolvedClassName, children.props.className),
        ...props,
      })
    }

    return (
      <button ref={ref} className={resolvedClassName} {...props}>
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
