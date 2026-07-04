import { Session } from "next-auth";
import { Section } from "@/lib/schema/page";

export interface HomePageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface HomeHeaderProps {
  session: Session | null;
}

export interface HomeHeroProps {
  session: Session | null;
}

export interface PageSlugCardProps {
  slug: string;
}

export interface StudioPageProps {
  params: Promise<{ slug: string }>;
}

export interface PreviewPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface SitePageProps {
  params: Promise<{ slug: string }>;
}

export interface PageSlugListProps {
  slugs: string[];
}

export interface TestCredentialItemProps {
  role: string;
  badgeClassName: string;
  email: string;
  description: string;
}

export interface SiteUnpublishedProps {
  slug: string;
}

export interface SiteHeaderProps {
  title: string;
  version: string;
  slug: string;
}

export interface SiteReleaseViewProps {
  release: {
    title: string;
    sections: Section[];
  };
  version: string;
  slug: string;
}
