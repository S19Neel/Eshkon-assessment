import { describe, it, expect } from "vitest";
import { PageSchema, SectionSchema } from "../lib/schema/page";

describe("Zod Page & Section Schema Validation", () => {
  it("should validate a correct hero section", () => {
    const validHero = {
      id: "hero-1",
      type: "hero",
      props: {
        title: "Test Hero",
        subtitle: "Subtitle",
        align: "center",
      },
    };
    const result = SectionSchema.safeParse(validHero);
    expect(result.success).toBe(true);
  });

  it("should fail validation if required prop 'title' is missing in hero section", () => {
    const invalidHero = {
      id: "hero-2",
      type: "hero",
      props: {
        subtitle: "Only subtitle",
      },
    };
    const result = SectionSchema.safeParse(invalidHero);
    expect(result.success).toBe(false);
  });

  it("should validate a complete page structure", () => {
    const validPage = {
      pageId: "page-1",
      slug: "home",
      title: "Home Landing",
      sections: [
        {
          id: "sec-1",
          type: "cta",
          props: { label: "Click", url: "/test" },
        },
      ],
    };
    const result = PageSchema.safeParse(validPage);
    expect(result.success).toBe(true);
  });

  it("should fail page validation if slug is missing", () => {
    const invalidPage = {
      title: "No Slug Page",
      sections: [],
    };
    const result = PageSchema.safeParse(invalidPage);
    expect(result.success).toBe(false);
  });
});
