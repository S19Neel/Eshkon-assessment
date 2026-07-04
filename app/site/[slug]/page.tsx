import { Metadata } from "next";
import { getLatestReleaseAction } from "@/app/actions/publishAction";
import { SiteUnpublished } from "@/components/site/SiteUnpublished";
import { SiteReleaseView } from "@/components/site/SiteReleaseView";
import { SitePageProps } from "@/types/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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
    return <SiteUnpublished slug={slug} />;
  }

  return <SiteReleaseView release={release} version={version} slug={slug} />;
}
