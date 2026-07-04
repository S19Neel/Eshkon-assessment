import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { UnsupportedSection } from "@/components/sections/UnsupportedSection";
import { Badge } from "@/components/ui/badge";
import { SectionComponent, SectionRendererProps } from "@/types/sections";

export const sectionRegistry: Record<string, SectionComponent> = {
  hero: HeroSection,
  featureGrid: FeatureGridSection,
  testimonial: TestimonialSection,
  cta: CtaSection,
};

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
              interactive
                ? "cursor-pointer hover:ring-2 hover:ring-blue-500/50 rounded-2xl"
                : ""
            } ${
              isSelected
                ? "ring-2 ring-blue-500 ring-offset-4 ring-offset-slate-900 rounded-2xl"
                : ""
            }`}
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
              <div className="absolute top-3 right-3 z-10">
                <Badge
                  variant="outline"
                  className="bg-slate-900/90 border-slate-700 text-[10px] px-2 py-0.5 rounded text-slate-300 font-mono uppercase shadow backdrop-blur"
                >
                  {section.type}
                </Badge>
              </div>
            )}
            <Component
              props={section.props}
              id={section.id}
              type={section.type}
            />
          </div>
        );
      })}
    </div>
  );
};
