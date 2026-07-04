"use server";

import { prisma } from "@/lib/db/prisma";
import { Page, PageSchema } from "@/lib/schema/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { Role } from "@/lib/generated/prisma/client";
import { calculateSemverDiff, SemverDiffResult } from "@/lib/publish/semver";

export async function getLatestReleaseAction(
  slug: string
): Promise<{ release: Page | null; version: string }> {
  try {
    const latest = await prisma.release.findFirst({
      where: { slug },
      orderBy: { createdAt: "desc" },
    });

    if (!latest) return { release: null, version: "0.0.0" };

    const parsed = PageSchema.safeParse(latest.snapshot);
    return {
      release: parsed.success ? parsed.data : null,
      version: latest.version,
    };
  } catch (err) {
    console.error("Failed to fetch latest release from DB:", err);
    return { release: null, version: "0.0.0" };
  }
}

export async function calculateDiffAction(
  slug: string,
  draftPage: Page
): Promise<SemverDiffResult> {
  const { release, version } = await getLatestReleaseAction(slug);
  return calculateSemverDiff(draftPage, release, version);
}

export async function publishReleaseAction(
  slug: string,
  draftPage: Page
): Promise<{
  success: boolean;
  version?: string;
  changelog?: string;
  error?: string;
  isIdempotent?: boolean;
}> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    if (session.user.role !== Role.PUBLISHER) {
      return {
        success: false,
        error: "Forbidden. Only Publisher role can publish releases.",
      };
    }

    const parsed = PageSchema.safeParse(draftPage);
    if (!parsed.success) {
      return {
        success: false,
        error: "Invalid page structure cannot be published.",
      };
    }

    const { release: lastRelease, version: lastVersion } =
      await getLatestReleaseAction(slug);
    const diff = calculateSemverDiff(draftPage, lastRelease, lastVersion);

    if (diff.type === "none" && lastRelease) {
      return {
        success: true,
        version: lastVersion,
        changelog:
          "No changes detected. Idempotent publish returned existing release.",
        isIdempotent: true,
      };
    }

    const newRelease = await prisma.release.create({
      data: {
        pageId: draftPage.pageId || `page-${slug}`,
        slug,
        version: diff.nextVersion,
        snapshot: draftPage as any,
        changelog: diff.changelog,
        publishedById: session.user.id,
      },
    });

    return {
      success: true,
      version: newRelease.version,
      changelog: newRelease.changelog,
    };
  } catch (err) {
    console.error("Failed to publish release to PostgreSQL:", err);
    return {
      success: false,
      error: "Database error occurred during publication.",
    };
  }
}
