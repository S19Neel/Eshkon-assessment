"use client";

import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { HomeHeroProps } from "@/types/pages";

export const HomeHero: React.FC<HomeHeroProps> = ({ session }) => {
  return (
    <section className="text-center space-y-4 max-w-3xl mx-auto py-4">
      <Badge
        variant="outline"
        className="px-3 py-1 bg-blue-950/80 border-blue-500/30 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider"
      >
        Eshkon Assessment Architecture
      </Badge>
      <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
        Schema-Driven Landing Page Studio
      </h1>
      <p className="text-base text-slate-300 leading-relaxed">
        A full-stack WYSIWYG studio powered by Next.js App Router, Redux
        Toolkit, Contentful, PostgreSQL, and Zod. Experience role-based access
        control, live section drag-and-drop, and automated SemVer JSON
        snapshots.
      </p>
      {!session && (
        <div className="pt-3">
          <Link
            href="/api/auth/signin"
            className={cn(
              buttonVariants({ size: "lg" }),
              "px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-xl transition-all text-base border-0"
            )}
          >
            🔑 Log In to Experience Studio
          </Link>
        </div>
      )}
    </section>
  );
};
