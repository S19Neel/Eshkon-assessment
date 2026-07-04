import { describe, it, expect } from "vitest";
import { calculateSemverDiff } from "../lib/publish/semver";
import { Page } from "../lib/schema/page";

describe("SemVer Diff Calculation Engine", () => {
  const basePage: Page = {
    pageId: "page-1",
    slug: "home",
    title: "Home Landing",
    sections: [
      {
        id: "sec-1",
        type: "hero",
        props: { title: "Title v1" },
      },
      {
        id: "sec-2",
        type: "cta",
        props: { label: "Click", url: "/" },
      },
    ],
  };

  it("should return MINOR (0.1.0) on initial release when snapshot is null", () => {
    const diff = calculateSemverDiff(basePage, null, "0.0.0");
    expect(diff.type).toBe("minor");
    expect(diff.nextVersion).toBe("0.1.0");
  });

  it("should return NONE when draft matches last release exactly", () => {
    const diff = calculateSemverDiff(basePage, basePage, "0.1.0");
    expect(diff.type).toBe("none");
    expect(diff.nextVersion).toBe("0.1.0");
  });

  it("should return PATCH when section content/props are updated", () => {
    const updatedDraft: Page = {
      ...basePage,
      sections: [
        {
          id: "sec-1",
          type: "hero",
          props: { title: "Title v2 Updated" },
        },
        basePage.sections[1],
      ],
    };
    const diff = calculateSemverDiff(updatedDraft, basePage, "0.1.0");
    expect(diff.type).toBe("patch");
    expect(diff.nextVersion).toBe("0.1.1");
    expect(diff.changelog).toContain(
      "Updated content/properties in section 'sec-1'"
    );
  });

  it("should return MINOR when a new section is added", () => {
    const addedDraft: Page = {
      ...basePage,
      sections: [
        ...basePage.sections,
        {
          id: "sec-3",
          type: "testimonial",
          props: { testimonials: [] },
        },
      ],
    };
    const diff = calculateSemverDiff(addedDraft, basePage, "0.1.0");
    expect(diff.type).toBe("minor");
    expect(diff.nextVersion).toBe("0.2.0");
    expect(diff.changelog).toContain("Added new section 'sec-3'");
  });

  it("should return MAJOR when an existing section is removed", () => {
    const removedDraft: Page = {
      ...basePage,
      sections: [basePage.sections[0]],
    };
    const diff = calculateSemverDiff(removedDraft, basePage, "0.2.0");
    expect(diff.type).toBe("major");
    expect(diff.nextVersion).toBe("1.0.0");
    expect(diff.changelog).toContain("Removed section 'sec-2'");
  });

  it("should return MAJOR when a section type changes", () => {
    const typeChangedDraft: Page = {
      ...basePage,
      sections: [
        {
          id: "sec-1",
          type: "cta",
          props: { label: "Now a CTA" },
        },
        basePage.sections[1],
      ],
    };
    const diff = calculateSemverDiff(typeChangedDraft, basePage, "1.0.0");
    expect(diff.type).toBe("major");
    expect(diff.nextVersion).toBe("2.0.0");
    expect(diff.changelog).toContain(
      "Changed type of section 'sec-1' from 'hero' to 'cta'"
    );
  });
});
