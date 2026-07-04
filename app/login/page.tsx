"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLoginAuth, QUICK_ROLES } from "@/hooks/useLoginAuth";
import { LoginPageProps } from "@/types/auth";

export default function LoginPage(_props: LoginPageProps) {
  const {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
    handleQuickLogin,
  } = useLoginAuth();

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800 shadow-2xl space-y-2">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            Sign In to Page Studio
          </CardTitle>
          <CardDescription className="text-xs text-slate-400">
            Select a role or enter your credentials to test RBAC features.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col gap-2">
            <span
              id="quick-login-label"
              className="text-xs font-semibold text-slate-400 uppercase tracking-wider block"
            >
              Quick Test Roles
            </span>
            <div
              className="grid grid-cols-3 gap-2"
              role="group"
              aria-labelledby="quick-login-label"
            >
              {QUICK_ROLES.map((role) => (
                <Button
                  key={role.label}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin(role.email)}
                  className={`py-2 text-xs font-bold text-white border-0 shadow ${role.color} transition-all`}
                >
                  {role.label}
                </Button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-950/60 border-red-500 text-red-200"
              >
                <AlertDescription className="text-xs font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-1.5">
              <Label
                htmlFor="email-input"
                className="text-xs font-bold text-slate-300"
              >
                Email Address
              </Label>
              <Input
                id="email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 text-sm"
                placeholder="editor@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password-input"
                className="text-xs font-bold text-slate-300"
              >
                Password
              </Label>
              <Input
                id="password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 text-sm"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-xl transition-all border-0 mt-2 text-sm"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
