import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { getPageData } from "@/lib/contentful/adapter";
import { StudioClient } from "@/components/studio/StudioClient";
import { redirect } from "next/navigation";
import { StudioPageProps } from "@/types/pages";

export default async function StudioPage({ params }: StudioPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(`/api/auth/signin?callbackUrl=/studio/${slug}`);
  }

  const pageData = await getPageData(slug, false);

  return (
    <StudioClient
      slug={slug}
      initialPage={pageData}
      role={session.user.role || "VIEWER"}
    />
  );
}
