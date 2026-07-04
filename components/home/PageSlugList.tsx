"use client";

import React from "react";
import { PageSlugCard } from "./PageSlugCard";
import { PageSlugListProps } from "@/types/pages";

export const PageSlugList: React.FC<PageSlugListProps> = ({ slugs }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h2 className="text-lg font-bold text-white">
          Available Page Slugs ({slugs.length})
        </h2>
        <span className="text-xs text-slate-400">
          Select an environment below to inspect or edit
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slugs.map((slug) => (
          <PageSlugCard key={slug} slug={slug} />
        ))}
      </div>
    </section>
  );
};
