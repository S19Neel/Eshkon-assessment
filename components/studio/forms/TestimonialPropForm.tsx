"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TestimonialPropFormProps, TestimonialItem } from "@/types/editor";

export const TestimonialPropForm: React.FC<TestimonialPropFormProps> = ({
  sectionId,
  testimonials,
  onChange,
}) => {
  const handleTestimonialChange = (
    index: number,
    field: keyof TestimonialItem,
    value: string
  ) => {
    const updated = testimonials.map((t, idx) =>
      idx === index ? { ...t, [field]: value } : t
    );
    onChange("testimonials", updated);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Label className="text-xs font-bold text-slate-300">
          Testimonials List ({testimonials.length})
        </Label>
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                Testimonial #{idx + 1}
              </span>
            </div>
            <div className="space-y-1">
              <Label
                htmlFor={`test-quote-${sectionId}-${idx}`}
                className="text-[11px] font-semibold text-slate-400"
              >
                Quote *
              </Label>
              <Textarea
                id={`test-quote-${sectionId}-${idx}`}
                value={item.quote}
                onChange={(e) =>
                  handleTestimonialChange(idx, "quote", e.target.value)
                }
                placeholder="Client quote"
                rows={2}
                className="bg-slate-900 border-slate-700 text-white focus:border-blue-500 rounded text-xs resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label
                  htmlFor={`test-author-${sectionId}-${idx}`}
                  className="text-[11px] font-semibold text-slate-400"
                >
                  Author *
                </Label>
                <Input
                  id={`test-author-${sectionId}-${idx}`}
                  type="text"
                  value={item.author}
                  onChange={(e) =>
                    handleTestimonialChange(idx, "author", e.target.value)
                  }
                  placeholder="Author name"
                  required
                  aria-required="true"
                  className="bg-slate-900 border-slate-700 text-white focus:border-blue-500 rounded text-xs h-8"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor={`test-role-${sectionId}-${idx}`}
                  className="text-[11px] font-semibold text-slate-400"
                >
                  Role/Company
                </Label>
                <Input
                  id={`test-role-${sectionId}-${idx}`}
                  type="text"
                  value={item.role || ""}
                  onChange={(e) =>
                    handleTestimonialChange(idx, "role", e.target.value)
                  }
                  placeholder="e.g. CTO, Acme"
                  className="bg-slate-900 border-slate-700 text-white focus:border-blue-500 rounded text-xs h-8"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
