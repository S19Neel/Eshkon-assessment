import React from "react";
import { Metadata } from "next";
import { getPageData } from "@/lib/contentful/adapter";
import { SectionRenderer } from "@/components/registry/sectionRegistry";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PreviewPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageData(slug, true);
  if (!page) {
    return { title: "Page Not Found | Page Studio" };
  }
  return {
    title: `${page.title} (Live Preview) | Page Studio`,
    description: `Previewing latest content and section layouts for '${slug}' before publishing.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PreviewPage({ params, searchParams }: PreviewPageProps) {
  const { slug } = await params;
  const resolvedQuery = await searchParams;
  const usePreviewApi = resolvedQuery?.preview !== "false";

  const pageData = await getPageData(slug, usePreviewApi);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <div className="bg-amber-500 text-black px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
          <span>Live Draft / Contentful Preview Mode</span>
          <span className="font-mono bg-black/10 px-2 py-0.5 rounded">slug: {slug}</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/studio/${slug}`}
            className="bg-black text-white px-3 py-1 rounded hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
          >
            ← Back to Studio Editor
          </Link>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <SectionRenderer sections={pageData.sections} interactive={false} />
      </main>
    </div>
  );
}
