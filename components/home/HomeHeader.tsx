"use client";

import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { HomeHeaderProps } from "@/types/pages";

export const HomeHeader: React.FC<HomeHeaderProps> = ({ session }) => {
  return (
    <header className="border-b border-slate-900 px-6 py-4 flex items-center justify-between bg-slate-950/80 backdrop-blur sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-black text-white shadow-lg text-lg">
          S
        </div>
        <div>
          <span className="font-extrabold tracking-tight text-lg block leading-tight text-white">
            Page Studio
          </span>
          <span className="text-xs text-slate-400 block">
            Advanced Agentic Content Engine
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <div className="text-right">
              <span className="text-white font-bold block">
                {session.user?.name || session.user?.email}
              </span>
              <Badge className="text-[10px] font-mono font-extrabold uppercase bg-blue-950 text-blue-400 border border-blue-800 px-1.5 py-0">
                {session.user?.role}
              </Badge>
            </div>
            <Link
              href="/api/auth/signout"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "bg-red-950 hover:bg-red-900 text-red-200 border-red-800 text-xs h-7"
              )}
            >
              Sign Out
            </Link>
          </div>
        ) : (
          <Link
            href="/api/auth/signin"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow transition-all"
            )}
          >
            Sign In with Test Role
          </Link>
        )}
      </div>
    </header>
  );
};
