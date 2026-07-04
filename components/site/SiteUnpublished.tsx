"use client";

import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiteUnpublishedProps } from "@/types/pages";

export const SiteUnpublished: React.FC<SiteUnpublishedProps> = ({ slug }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl shadow-xl">
        📦
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-black text-white">
          No Release Published Yet
        </h1>
        <p className="text-sm text-slate-400">
          The page <strong className="text-white">'{slug}'</strong> has not been
          published to production yet. Head over to the Page Studio to create
          and release version 0.1.0!
        </p>
      </div>
      <Link
        href={`/studio/${slug}`}
        className={cn(
          buttonVariants({ size: "lg" }),
          "px-6 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg transition-all border-0 inline-flex items-center"
        )}
      >
        Open Studio Editor →
      </Link>
    </div>
  );
};
