'use client'

import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RoleBadge } from '@/components/shared/role-badge'
import { useLoginMutation } from '@/hooks/use-auth'
import { getRoleDashboard } from '@/lib/auth'
import type { UserRole } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  organization: z.string().optional(),
  phone: z.string().optional(),
  role: z.enum(['donor', 'receiver', 'transporter', 'admin']),
})

type RegisterForm = z.infer<typeof schema>

const roleDescriptions: Record<UserRole, string> = {
  donor: 'List surplus food from stores, restaurants, or events.',
  receiver: 'Reserve nearby food listings for distribution.',
  transporter: 'Pick up and deliver food when direct pickup is not possible.',
  admin: 'Verify users, manage listings, and monitor the platform.',
}

export default function RegisterPage() {
  const router = useRouter()
  const loginMutation = useLoginMutation()
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedRole, setSelectedRole] = useState<UserRole>('donor')

  const form = useForm<RegisterForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: 'Aarav Sharma',
      email: 'aarav@shareplate.org',
      password: 'password123',
      organization: 'Neighborhood Bakery',
      phone: '+91 98765 43210',
      role: 'donor',
    },
  })

  useEffect(() => {
    form.setValue('role', selectedRole)
  }, [form, selectedRole])

  const selectedDescription = useMemo(() => roleDescriptions[selectedRole], [selectedRole])

  async function onSubmit(values: RegisterForm) {
    await loginMutation.mutateAsync({
      email: values.email,
      password: values.password,
      role: values.role,
    })
    router.push(getRoleDashboard(values.role))
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-950 p-8 text-white shadow-soft">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-100">Create account</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight">Join SharePlate in two quick steps.</h1>
          <p className="mt-4 max-w-xl text-white/85">
            Choose a role first, then add the details needed to connect your food rescue workflow.
          </p>
          <div className="mt-8 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
            <RoleBadge role={selectedRole} />
            <h2 className="mt-4 text-2xl font-bold">{selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</h2>
            <p className="mt-2 text-white/80">{selectedDescription}</p>
          </div>
        </section>

        <Card className="rounded-[2rem] bg-white/95 shadow-soft">
          <CardHeader>
            <CardTitle className="text-3xl">Register</CardTitle>
            <CardDescription>Step {step} of 2. Start by choosing how you’ll use the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="space-y-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {(['donor', 'receiver', 'transporter', 'admin'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setSelectedRole(role)
                        form.setValue('role', role)
                      }}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        selectedRole === role
                          ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/20'
                          : 'border-slate-200 bg-white hover:border-brand-200'
                      }`}
                    >
                      <RoleBadge role={role} />
                      <p className="mt-3 text-lg font-semibold capitalize text-slate-950">{role}</p>
                      <p className="mt-1 text-sm text-slate-500">{roleDescriptions[role]}</p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button type="button" onClick={() => setStep(2)}>
                    Continue
                  </Button>
                </div>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" {...form.register('name')} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...form.register('email')} />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" {...form.register('password')} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" {...form.register('phone')} />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="organization">Organization / Store</Label>
                  <Input id="organization" {...form.register('organization')} />
                </div>

                <div className="grid gap-2">
                  <Label>Role</Label>
                  <RoleBadge role={selectedRole} />
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? 'Creating account...' : 'Create account'}
                  </Button>
                </div>
                <p className="text-sm text-slate-500">
                  Already registered?{' '}
                  <Link href="/login" className="font-semibold text-brand-700 hover:underline">
                    Sign in
                  </Link>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
