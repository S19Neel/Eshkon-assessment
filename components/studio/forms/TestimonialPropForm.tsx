"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TestimonialPropFormProps, TestimonialItem } from "@/types/editor";
import { Plus, Trash2 } from "lucide-react";

export const TestimonialPropForm: React.FC<TestimonialPropFormProps> = ({
  sectionId,
  testimonials,
  columns,
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

  const handleAddTestimonial = () => {
    const updated = [
      ...testimonials,
      {
        quote: "This is a great product!",
        author: `Author #${testimonials.length + 1}`,
        role: "Client",
      },
    ];
    onChange("testimonials", updated);
  };

  const handleRemoveTestimonial = (index: number) => {
    if (testimonials.length <= 1) return;
    const updated = testimonials.filter((_, idx) => idx !== index);
    onChange("testimonials", updated);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label
          htmlFor={`test-cols-${sectionId}`}
          className="text-xs font-bold text-slate-300"
        >
          Grid Columns
        </Label>
        <Select
          value={columns}
          onValueChange={(val) => onChange("columns", val)}
        >
          <SelectTrigger
            id={`test-cols-${sectionId}`}
            className="bg-slate-950 border-slate-700 text-white focus:border-blue-500 rounded-lg text-sm"
          >
            <SelectValue placeholder="Select column layout" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700 text-white">
            <SelectItem value="1">1 Column</SelectItem>
            <SelectItem value="2">2 Columns</SelectItem>
            <SelectItem value="3">3 Columns</SelectItem>
            <SelectItem value="4">4 Columns</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-bold text-slate-300">
            Testimonials List ({testimonials.length})
          </Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAddTestimonial}
            className="h-7 text-xs px-2.5 bg-slate-900 border-slate-700 hover:bg-slate-800 text-purple-400 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Testimonial
          </Button>
        </div>
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                Testimonial #{idx + 1}
              </span>
              {testimonials.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => handleRemoveTestimonial(idx)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-950/50 cursor-pointer"
                  title="Remove testimonial"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              )}
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
