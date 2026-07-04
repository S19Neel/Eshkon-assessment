import React from "react";
import { Section } from "@/lib/schema/page";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { UnsupportedSection } from "@/components/sections/UnsupportedSection";

export type SectionComponent = React.FC<{ props: Record<string, unknown>; id?: string; type?: string }>;

export const sectionRegistry: Record<string, SectionComponent> = {
  hero: HeroSection,
  featureGrid: FeatureGridSection,
  testimonial: TestimonialSection,
  cta: CtaSection,
};

interface SectionRendererProps {
  sections: Section[];
  onSelectSection?: (id: string) => void;
  selectedId?: string | null;
  interactive?: boolean;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  sections,
  onSelectSection,
  selectedId,
  interactive = false,
}) => {
  return (
    <div className="space-y-6">
      {sections.map((section) => {
        const Component = sectionRegistry[section.type] || UnsupportedSection;
        const isSelected = selectedId === section.id;

        return (
          <div
            key={section.id}
            onClick={() => interactive && onSelectSection?.(section.id)}
            className={`relative transition-all duration-150 ${
              interactive ? "cursor-pointer hover:ring-2 hover:ring-blue-500/50 rounded-2xl" : ""
            } ${isSelected ? "ring-2 ring-blue-500 ring-offset-4 ring-offset-slate-900 rounded-2xl" : ""}`}
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
            onKeyDown={(e) => {
              if (interactive && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onSelectSection?.(section.id);
              }
            }}
          >
            {interactive && (
              <div className="absolute top-2 right-2 z-10 bg-slate-900/80 border border-slate-700 text-xs px-2 py-1 rounded text-slate-300 font-mono">
                {section.type}
              </div>
            )}
            <Component props={section.props} id={section.id} type={section.type} />
          </div>
        );
      })}
    </div>
  );
};
