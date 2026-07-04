"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from "@/lib/redux/provider";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider>
        {children}
        <Toaster position="top-right" richColors theme="dark" />
      </ReduxProvider>
    </SessionProvider>
  );
}
