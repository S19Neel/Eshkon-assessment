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
): Promise<Page> {
  try {
    const dbDraft = await prisma.draft.findUnique({ where: { slug } });
    if (dbDraft) {
      const parsed = PageSchema.safeParse({
        pageId: dbDraft.id,
        slug: dbDraft.slug,
        title: dbDraft.title,
        sections: dbDraft.sections,
      });
      if (parsed.success) return parsed.data;
    }
  } catch (dbErr) {
    console.error("DB fallback check failed:", dbErr);
  }

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
        const fields = item.fields as any;

        const rawSections = Array.isArray(fields.sections)
          ? fields.sections.map((s: any, index: number) => {
              if (!s || !s.fields) {
                return { id: `unknown-${index}`, type: "unknown", props: {} };
              }
              const sFields = s.fields;
              const sectionType =
                sFields.type || s.sys?.contentType?.sys?.id || "unknown";
              return {
                id: s.sys?.id || `section-${index}`,
                type: sectionType,
                props: sFields.props || sFields,
              };
            })
          : [];

        const candidatePage = {
          pageId: item.sys.id,
          slug: fields.slug || slug,
          title: fields.title || "Untitled Page",
          sections: rawSections,
        };

        const parsed = PageSchema.safeParse(candidatePage);
        if (parsed.success) {
          return parsed.data;
        } else {
          console.warn(
            "Contentful data failed Zod validation. Using DB/fallback.",
            parsed.error,
          );
        }
      }
    } catch (err) {
      console.warn(
        `Error fetching page '${slug}' from Contentful. Falling back to DB/default.`,
        err,
      );
    }
  }

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
        const slug = (item.fields as any)?.slug;
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
