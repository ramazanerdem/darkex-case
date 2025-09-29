'use client'

import { login } from '@/actions/auth-actions'
import { FormState } from '@/types/auth.types'
import { useActionState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Fingerprint, Lock, User, AlertCircle } from 'lucide-react'

export default function LoginForm() {
  const initialState: FormState = { error: null }
  const [state, action, pending] = useActionState(login, initialState)

  return (
    <div className="h-full flex items-center justify-center p-4 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950">
      <Card className="w-full max-w-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50 shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
              <Fingerprint className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to your account to continue
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form action={action} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <User className="h-4 w-4 text-muted-foreground" />
                Username
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                className="h-11 bg-background/50 border-border/50 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200"
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Lock className="h-4 w-4 text-muted-foreground" />
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="h-11 bg-background/50 border-border/50 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200"
                autoComplete="current-password"
              />
            </div>

            {state?.error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-medium">{state.error}</span>
              </div>
            )}

            <Button
              disabled={pending}
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-medium shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
