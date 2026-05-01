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
import type { SessionUser } from '@/types'

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['donor', 'receiver', 'transporter', 'admin']),
})

type LoginForm = z.infer<typeof schema>

const roleOptions: SessionUser['role'][] = ['donor', 'receiver', 'transporter', 'admin']

export default function LoginPage() {
  const router = useRouter()
  const loginMutation = useLoginMutation()

  const [selectedRole, setSelectedRole] = useState<LoginForm['role']>('donor')

  const form = useForm<LoginForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'aarav@shareplate.org',
      password: 'password123',
      role: 'donor',
    },
  })

  useEffect(() => {
    form.setValue('role', selectedRole)
  }, [form, selectedRole])

  const redirectPath = useMemo(() => getRoleDashboard(selectedRole), [selectedRole])

  async function onSubmit(values: LoginForm) {
    await loginMutation.mutateAsync(values)
    router.push(getRoleDashboard(values.role))
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-6 rounded-[2rem] border border-brand-100 bg-brand-600 p-8 text-white shadow-soft">
          <RoleBadge role={selectedRole} />
          <div className="space-y-3">
            <h1 className="text-4xl font-black tracking-tight">Welcome back to SharePlate</h1>
            <p className="max-w-xl text-white/85">
              Sign in to see role-specific dashboards, notification updates, and your donation workflow.
            </p>
          </div>
          <div className="grid gap-4 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-100">Role redirect</p>
            <p className="text-2xl font-bold">{redirectPath}</p>
            <p className="text-sm text-white/80">After login you’ll land in the matching dashboard for your role.</p>
          </div>
          <div className="grid gap-3 text-sm text-white/85">
            <p>• Donors list surplus food</p>
            <p>• Receivers reserve nearby food</p>
            <p>• Transporters manage pickups</p>
            <p>• Admins verify and moderate</p>
          </div>
        </section>

        <Card className="rounded-[2rem] bg-white/95 shadow-soft">
          <CardHeader>
            <CardTitle className="text-3xl">Sign in</CardTitle>
            <CardDescription>Use the role that matches your SharePlate account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {roleOptions.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setSelectedRole(role)
                        form.setValue('role', role)
                      }}
                      className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                        selectedRole === role
                          ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/20'
                          : 'border-slate-200 bg-white hover:border-brand-200'
                      }`}
                    >
                      <RoleBadge role={role} />
                      <p className="mt-2 text-sm text-slate-500">Continue as {role}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...form.register('email')} />
                {form.formState.errors.email ? <p className="text-sm text-rose-600">{form.formState.errors.email.message}</p> : null}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" {...form.register('password')} />
                {form.formState.errors.password ? <p className="text-sm text-rose-600">{form.formState.errors.password.message}</p> : null}
              </div>

              <Button type="submit" className="h-12 w-full text-base" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
              </Button>
              <p className="text-center text-sm text-slate-500">
                No account yet?{' '}
                <Link href="/register" className="font-semibold text-brand-700 hover:underline">
                  Create one
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
