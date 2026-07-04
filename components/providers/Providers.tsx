"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from "@/lib/redux/provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </SessionProvider>
  );
}
