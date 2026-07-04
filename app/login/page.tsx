"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("editor@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/studio/home");
    }
  };

  const handleQuickLogin = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword("password123");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 p-4">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">Sign In to Page Studio</h1>
          <p className="text-sm text-slate-400">
            Select a role or enter your credentials to test RBAC features.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span id="quick-login-label" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Quick Test Roles
          </span>
          <div className="grid grid-cols-3 gap-2" role="group" aria-labelledby="quick-login-label">
            <button
              type="button"
              onClick={() => handleQuickLogin("viewer@example.com")}
              className="py-2 px-3 text-xs font-semibold bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Viewer
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("editor@example.com")}
              className="py-2 px-3 text-xs font-semibold bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Editor
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("publisher@example.com")}
              className="py-2 px-3 text-xs font-semibold bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Publisher
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error && (
            <div
              role="alert"
              className="p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-lg text-sm"
            >
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="email-input" className="block text-sm font-medium text-slate-300">
              Email Address
            </label>
            <input
              id="email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="editor@example.com"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password-input" className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              id="password-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
