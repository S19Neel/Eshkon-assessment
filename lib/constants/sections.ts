import { SectionType } from "@/types/editor";

export const SECTION_TYPES: {
  type: SectionType;
  label: string;
  desc: string;
}[] = [
  { type: "hero", label: "Hero", desc: "Add a responsive hero section." },
  {
    type: "featureGrid",
    label: "Feature Grid",
    desc: "Add a grid of key features.",
  },
  {
    type: "testimonial",
    label: "Testimonial",
    desc: "Add customer testimonials.",
  },
  {
    type: "cta",
    label: "Call to Action",
    desc: "Add a conversion button banner.",
  },
];
