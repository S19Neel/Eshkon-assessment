"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PageSlugCardProps } from "@/types/pages";

export const PageSlugCard: React.FC<PageSlugCardProps> = ({ slug }) => {
  return (
    <Card className="bg-slate-900/60 border-slate-800 hover:border-slate-700 rounded-2xl shadow-xl flex flex-col justify-between transition-all">
      <div>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-1">
            <Badge className="text-[10px] font-mono px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800 uppercase font-bold">
              page slug
            </Badge>
          </div>
          <CardTitle className="text-xl font-extrabold text-white capitalize">
            {slug} Page
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-slate-400">
          Manage structured Zod sections, test responsive previews, or publish
          semver releases.
        </CardContent>
      </div>

      <CardFooter className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800/80">
        <Link
          href={`/studio/${slug}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border-blue-800/40 rounded-xl text-center text-xs font-bold transition-all h-8 px-0"
          )}
        >
          🎨 Studio
        </Link>
        <Link
          href={`/preview/${slug}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border-amber-800/40 rounded-xl text-center text-xs font-bold transition-all h-8 px-0"
          )}
        >
          👁️ Preview
        </Link>
        <Link
          href={`/site/${slug}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border-emerald-800/40 rounded-xl text-center text-xs font-bold transition-all h-8 px-0"
          )}
        >
          🌐 Site
        </Link>
      </CardFooter>
    </Card>
  );
};
