import { z } from "zod";

export const HeroSectionPropsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  align: z.enum(["left", "center", "right"]).optional().default("center"),
});

export const FeatureGridItemSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  icon: z.string().optional(),
});

export const FeatureGridSectionPropsSchema = z.object({
  features: z.array(FeatureGridItemSchema).min(1),
  columns: z.enum(["2", "3", "4"]).optional().default("3"),
});

export const TestimonialItemSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().optional(),
  company: z.string().optional(),
  avatar: z.string().optional(),
});

export const TestimonialSectionPropsSchema = z.object({
  testimonials: z.array(TestimonialItemSchema).min(1),
});

export const CtaSectionPropsSchema = z.object({
  label: z.string().min(1, "CTA label is required"),
  url: z.string().url("Must be a valid URL").or(z.string().startsWith("/", "Must be a relative URL")),
  style: z.enum(["primary", "secondary", "outline"]).optional().default("primary"),
});

export const SectionSchema = z
  .object({
    id: z.string().min(1),
    type: z.enum(["hero", "featureGrid", "testimonial", "cta"]).or(z.string()),
    props: z.record(z.string(), z.unknown()),
  })
  .superRefine((val, ctx) => {
    const res = validateSectionProps(val.type, val.props);
    if (!res.success && res.error instanceof z.ZodError) {
      res.error.issues.forEach((issue) => {
        ctx.addIssue({
          ...issue,
          path: ["props", ...issue.path],
        });
      });
    }
  });

export type Section = z.infer<typeof SectionSchema>;

export const PageSchema = z.object({
  pageId: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  sections: z.array(SectionSchema),
});

export type Page = z.infer<typeof PageSchema>;

export function validateSectionProps(type: string, props: Record<string, unknown>) {
  switch (type) {
    case "hero":
      return HeroSectionPropsSchema.safeParse(props);
    case "featureGrid":
      return FeatureGridSectionPropsSchema.safeParse(props);
    case "testimonial":
      return TestimonialSectionPropsSchema.safeParse(props);
    case "cta":
      return CtaSectionPropsSchema.safeParse(props);
    default:
      return { success: false, error: new Error(`Unsupported section type: ${type}`) };
  }
}
