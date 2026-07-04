"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { QuickRole } from "@/types/auth";

export const QUICK_ROLES: QuickRole[] = [
  {
    label: "Viewer",
    email: "viewer@example.com",
    color: "bg-slate-700 hover:bg-slate-600",
  },
  {
    label: "Editor",
    email: "editor@example.com",
    color: "bg-blue-600 hover:bg-blue-500",
  },
  {
    label: "Publisher",
    email: "publisher@example.com",
    color: "bg-purple-600 hover:bg-purple-500",
  },
];

export function useLoginAuth() {
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

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
    handleQuickLogin,
  };
}
