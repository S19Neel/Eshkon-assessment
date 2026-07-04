"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSectionProps } from "@/hooks/useSectionProps";
import { HeroPropForm } from "./forms/HeroPropForm";
import { CtaPropForm } from "./forms/CtaPropForm";
import { FeatureGridPropForm } from "./forms/FeatureGridPropForm";
import { TestimonialPropForm } from "./forms/TestimonialPropForm";
import { FeatureItem, TestimonialItem } from "@/types/editor";

export const PropEditor: React.FC = () => {
  const { section, handlePropChange, handleClose } = useSectionProps();

  if (!section) {
    return (
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 text-center text-slate-500 text-xs font-semibold shadow-inner min-h-[300px] flex flex-col items-center justify-center gap-2">
        <span className="text-2xl">👈</span>
        <span>
          Select a section from the list on the left to edit its schema
          properties.
        </span>
      </div>
    );
  }

  const renderForm = () => {
    switch (section.type) {
      case "hero":
        return (
          <HeroPropForm
            sectionId={section.id}
            title={(section.props.title as string) || ""}
            subtitle={(section.props.subtitle as string) || ""}
            align={(section.props.align as string) || "center"}
            onChange={handlePropChange}
          />
        );
      case "cta":
        return (
          <CtaPropForm
            sectionId={section.id}
            label={(section.props.label as string) || ""}
            url={(section.props.url as string) || ""}
            style={(section.props.style as string) || "primary"}
            onChange={handlePropChange}
          />
        );
      case "featureGrid":
        return (
          <FeatureGridPropForm
            sectionId={section.id}
            features={
              (section.props.features as unknown as FeatureItem[]) || []
            }
            columns={(section.props.columns as string) || "3"}
            onChange={handlePropChange}
          />
        );
      case "testimonial":
        return (
          <TestimonialPropForm
            sectionId={section.id}
            testimonials={
              (section.props.testimonials as unknown as TestimonialItem[]) || []
            }
            columns={(section.props.columns as string) || "3"}
            onChange={handlePropChange}
          />
        );

      default:
        return (
          <div className="p-4 bg-yellow-950/40 border border-yellow-700 text-yellow-300 rounded-xl text-xs">
            Unsupported section type:{" "}
            <strong className="font-mono">{section.type}</strong>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <h3
            id="prop-editor-heading"
            className="text-sm font-bold text-white uppercase tracking-wider"
          >
            Edit Section
          </h3>
          <Badge className="text-xs bg-blue-950 text-blue-400 border border-blue-800 uppercase font-mono">
            {section.type}
          </Badge>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={handleClose}
          aria-label="Close property editor"
          className="text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
        >
          ✕
        </Button>
      </div>

      <div aria-labelledby="prop-editor-heading" className="space-y-4">
        {renderForm()}
      </div>
    </div>
  );
};
