"use client";

import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SiteHeaderProps } from "@/types/pages";

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  title,
  version,
  slug,
}) => {
  return (
    <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-40 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
      <div className="flex items-center gap-2">
        <span className="font-bold text-slate-300">{title}</span>
        <Badge className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono font-bold text-xs">
          v{version}
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href={`/preview/${slug}`}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "text-xs text-slate-400 hover:text-white h-7 inline-flex items-center"
          )}
        >
          View Live Draft →
        </Link>
        <Link
          href={`/studio/${slug}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700 h-7 inline-flex items-center"
          )}
        >
          Edit in Studio →
        </Link>
      </div>
    </header>
  );
};
