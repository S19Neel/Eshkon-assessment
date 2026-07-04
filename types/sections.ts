import React from "react";
import { Section } from "@/lib/schema/page";

export interface SectionComponentProps {
  props: Record<string, unknown>;
  id?: string;
  type?: string;
}

export type SectionComponent = React.FC<SectionComponentProps>;

export interface SectionRendererProps {
  sections: Section[];
  onSelectSection?: (id: string) => void;
  selectedId?: string | null;
  interactive?: boolean;
}

export interface HeroSectionProps {
  props: Record<string, unknown>;
}

export interface CtaSectionProps {
  props: Record<string, unknown>;
}

export interface FeatureGridSectionProps {
  props: Record<string, unknown>;
}

export interface TestimonialSectionProps {
  props: Record<string, unknown>;
}

export interface UnsupportedSectionProps {
  type: string;
  props?: Record<string, unknown>;
}
