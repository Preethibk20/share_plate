'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type DialogContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

function useDialogContext() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within Dialog')
  }
  return context
}

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  return <DialogContext.Provider value={{ open, setOpen: onOpenChange }}>{children}</DialogContext.Provider>
}

export function DialogTrigger({ children }: { children: React.ReactElement }) {
  const { setOpen } = useDialogContext()
  return React.cloneElement(children, { onClick: () => setOpen(true) })
}

export function DialogContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const { open, setOpen } = useDialogContext()

  if (!open || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
      <div className={cn('relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl', className)}>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-full"
          onClick={() => setOpen(false)}
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </Button>
        {children}
      </div>
    </div>,
    document.body,
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4 pr-10', className)} {...props} />
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-2xl font-semibold text-slate-900', className)} {...props} />
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('mt-2 text-sm text-slate-500', className)} {...props} />
}
