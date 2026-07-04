import { Page, PageSchema } from "@/lib/schema/page";
import { getContentfulClient } from "./client";
import { prisma } from "@/lib/db/prisma";

export const fallbackSamplePage: Page = {
  pageId: "sample-page-id",
  slug: "home",
  title: "Home Landing Page",
  sections: [
    {
      id: "hero-1",
      type: "hero",
      props: {
        title: "Build Landing Pages with Confidence",
        subtitle:
          "A lightweight studio powered by Next.js, Redux, Contentful, and Postgres.",
      },
    },
    {
      id: "grid-1",
      type: "featureGrid",
      props: {
        features: [
          {
            title: "Schema Driven",
            description:
              "Zod validated sections ensuring zero runtime crashes.",
          },
          {
            title: "Role Based",
            description:
              "Enforced access control for viewers, editors, and publishers.",
          },
          {
            title: "Immutable SemVer",
            description:
              "Automated semantic versioning with JSON snapshot releases.",
          },
        ],
      },
    },
    {
      id: "testi-1",
      type: "testimonial",
      props: {
        testimonials: [
          {
            quote:
              "This studio transformed our workflow and made publishing lightning fast.",
            author: "Alex Rivera",
            role: "Head of Marketing",
          },
        ],
      },
    },
    {
      id: "cta-1",
      type: "cta",
      props: {
        label: "Launch Studio",
        url: "/studio/home",
        style: "primary",
      },
    },
  ],
};

export async function getPageData(
  slug: string,
  preview = false,
  forceContentful = false
): Promise<Page> {
  // When not forcing Contentful, check DB drafts first (editor workspace priority)
  if (!forceContentful) {
    try {
      const dbDraft = await prisma.draft.findUnique({ where: { slug } });
      if (dbDraft) {
        const parsed = PageSchema.safeParse({
          pageId: dbDraft.id,
          slug: dbDraft.slug,
          title: dbDraft.title,
          sections: dbDraft.sections,
        });
        if (parsed.success) {
          console.log(
            `[Contentful Adapter] Loaded page '${slug}' from PostgreSQL draft.`
          );
          return parsed.data;
        }
      }
    } catch (dbErr) {
      console.error("DB fallback check failed:", dbErr);
    }
  }

  // Attempt Contentful API fetch (delivery or preview based on flag)
  const client = getContentfulClient(preview);

  if (client) {
    try {
      const entries = await client.getEntries({
        content_type: "page",
        "fields.slug": slug,
        include: 2,
      });

      if (entries.items && entries.items.length > 0) {
        const item = entries.items[0];
        const fields = item.fields as Record<string, unknown>;

        const rawSections = Array.isArray(fields.sections)
          ? (fields.sections as Array<Record<string, unknown>>).map(
              (s, index: number) => {
                if (!s || !s.fields) {
                  return { id: `unknown-${index}`, type: "unknown", props: {} };
                }
                const sFields = s.fields as Record<string, unknown>;
                const sys = s.sys as Record<string, unknown> | undefined;
                const contentType = sys?.contentType as
                  Record<string, unknown> | undefined;
                const sysId = contentType?.sys as
                  Record<string, unknown> | undefined;

                // Resolve section type: explicit `type` field > content type ID > fallback
                const sectionType =
                  (sFields.type as string) ||
                  (sysId?.id as string) ||
                  "unknown";

                // Resolve props: explicit `props` object > strip metadata from flat fields
                let resolvedProps: Record<string, unknown>;
                if (sFields.props && typeof sFields.props === "object") {
                  resolvedProps = sFields.props as Record<string, unknown>;
                } else {
                  // Flat field mapping — extract relevant fields, exclude Contentful metadata
                  const { type: _type, ...restFields } = sFields;
                  void _type;
                  resolvedProps = restFields;
                }

                return {
                  id: (sys?.id as string) || `section-${index}`,
                  type: sectionType,
                  props: resolvedProps,
                };
              }
            )
          : [];

        const candidatePage = {
          pageId: item.sys.id,
          slug: (fields.slug as string) || slug,
          title: (fields.title as string) || "Untitled Page",
          sections: rawSections,
        };

        const parsed = PageSchema.safeParse(candidatePage);
        if (parsed.success) {
          console.log(
            `[Contentful Adapter] Loaded page '${slug}' from Contentful ${preview ? "Preview" : "Delivery"} API.`
          );
          return parsed.data;
        } else {
          console.warn(
            "Contentful data failed Zod validation. Using DB/fallback.",
            parsed.error
          );
        }
      }
    } catch (err) {
      console.warn(
        `Error fetching page '${slug}' from Contentful. Falling back to DB/default.`,
        err
      );
    }
  }

  // Final fallback: try DB draft one more time if we skipped it (forceContentful mode)
  if (forceContentful) {
    try {
      const dbDraft = await prisma.draft.findUnique({ where: { slug } });
      if (dbDraft) {
        const parsed = PageSchema.safeParse({
          pageId: dbDraft.id,
          slug: dbDraft.slug,
          title: dbDraft.title,
          sections: dbDraft.sections,
        });
        if (parsed.success) {
          console.log(
            `[Contentful Adapter] Contentful unavailable. Loaded page '${slug}' from PostgreSQL draft as fallback.`
          );
          return parsed.data;
        }
      }
    } catch (dbErr) {
      console.error("DB fallback check failed:", dbErr);
    }
  }

  console.log(
    `[Contentful Adapter] Using built-in sample fallback for page '${slug}'.`
  );
  return {
    ...fallbackSamplePage,
    slug,
  };
}

export async function getAllPageSlugs(): Promise<string[]> {
  const client = getContentfulClient(false);
  const slugs = new Set<string>(["home", "about"]);

  if (client) {
    try {
      const entries = await client.getEntries({
        content_type: "page",
        select: ["fields.slug"],
      });
      entries.items.forEach((item) => {
        const slug = (item.fields as Record<string, unknown>)?.slug as
          string | undefined;
        if (slug) slugs.add(slug);
      });
    } catch (err) {
      console.warn("Error fetching page slugs from Contentful:", err);
    }
  }

  try {
    const dbDrafts = await prisma.draft.findMany({ select: { slug: true } });
    dbDrafts.forEach((d) => slugs.add(d.slug));
  } catch (err) {
    console.warn("Error fetching drafts from DB:", err);
  }

  return Array.from(slugs);
}
