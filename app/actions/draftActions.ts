"use server";

import { prisma } from "@/lib/db/prisma";
import { Page, PageSchema } from "@/lib/schema/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { Role } from "@/lib/generated/prisma/client";

export async function saveDraftAction(
  slug: string,
  page: Page,
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    if (
      session.user.role !== Role.EDITOR &&
      session.user.role !== Role.PUBLISHER
    ) {
      return {
        success: false,
        error: "Forbidden. Viewer role cannot modify drafts.",
      };
    }

    const parsed = PageSchema.safeParse(page);
    if (!parsed.success) {
      return { success: false, error: "Invalid page structure." };
    }

    await prisma.draft.upsert({
      where: { slug },
      update: {
        title: page.title,
        sections: page.sections as any,
        updatedById: session.user.id,
      },
      create: {
        slug,
        title: page.title,
        sections: page.sections as any,
        updatedById: session.user.id,
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Failed to save draft to PostgreSQL:", err);
    return { success: false, error: "Failed to save draft to database." };
  }
}

export async function getDraftAction(slug: string): Promise<Page | null> {
  try {
    const draft = await prisma.draft.findUnique({ where: { slug } });
    if (!draft) return null;

    const parsed = PageSchema.safeParse({
      pageId: draft.id,
      slug: draft.slug,
      title: draft.title,
      sections: draft.sections,
    });

    return parsed.success ? parsed.data : null;
  } catch (err) {
    console.error("Failed to get draft from PostgreSQL:", err);
    return null;
  }
}
