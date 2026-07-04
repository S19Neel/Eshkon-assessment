"use client";

import React from "react";
import { SectionRenderer } from "@/components/registry/sectionRegistry";
import { SiteHeader } from "./SiteHeader";
import { SiteReleaseViewProps } from "@/types/pages";

export const SiteReleaseView: React.FC<SiteReleaseViewProps> = ({
  release,
  version,
  slug,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <SiteHeader title={release.title} version={version} slug={slug} />

      <main className="flex-1 w-full max-w-7xl mx-auto py-12 px-4 sm:px-6">
        <SectionRenderer sections={release.sections} interactive={false} />
      </main>
    </div>
  );
};
