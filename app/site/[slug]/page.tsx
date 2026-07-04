import React from "react";
import { Metadata } from "next";
import { getLatestReleaseAction } from "@/app/actions/publishAction";
import { SectionRenderer } from "@/components/registry/sectionRegistry";
import Link from "next/link";

interface SitePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { release, version } = await getLatestReleaseAction(slug);
  if (!release) {
    return { title: "Unpublished Page | Page Studio" };
  }
  return {
    title: `${release.title} | v${version}`,
    description: `Published landing page '${release.title}' (release v${version}).`,
  };
}

export default async function SitePage({ params }: SitePageProps) {
  const { slug } = await params;
  const { release, version } = await getLatestReleaseAction(slug);

  if (!release) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl shadow-xl">
          📦
        </div>
        <div className="space-y-2 max-w-md">
          <h1 className="text-2xl font-black text-white">No Release Published Yet</h1>
          <p className="text-sm text-slate-400">
            The page <strong className="text-white">'{slug}'</strong> has not been published to production yet. Head over to the Page Studio to create and release version 0.1.0!
          </p>
        </div>
        <Link
          href={`/studio/${slug}`}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Open Studio Editor →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-40 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-300">{release.title}</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-bold">v{version}</span>
        </div>
        <div className="flex items-center gap-4">
          <Link hover-underline="true" href={`/preview/${slug}`} className="hover:text-white transition-colors">
            View Live Draft →
          </Link>
          <Link hover-underline="true" href={`/studio/${slug}`} className="hover:text-white transition-colors">
            Edit in Studio →
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto py-12 px-4 sm:px-6">
        <SectionRenderer sections={release.sections} interactive={false} />
      </main>
    </div>
  );
}
