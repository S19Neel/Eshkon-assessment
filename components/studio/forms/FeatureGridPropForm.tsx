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
import { FeatureGridPropFormProps, FeatureItem } from "@/types/editor";
import { Plus, Trash2 } from "lucide-react";

export const FeatureGridPropForm: React.FC<FeatureGridPropFormProps> = ({
  sectionId,
  features,
  columns,
  onChange,
}) => {
  const handleFeatureChange = (
    index: number,
    field: keyof FeatureItem,
    value: string
  ) => {
    const updated = features.map((feat, idx) =>
      idx === index ? { ...feat, [field]: value } : feat
    );
    onChange("features", updated);
  };

  const handleAddFeature = () => {
    const updated = [
      ...features,
      {
        title: `Feature #${features.length + 1}`,
        description: "New feature description",
      },
    ];
    onChange("features", updated);
  };

  const handleRemoveFeature = (index: number) => {
    if (features.length <= 1) return;
    const updated = features.filter((_, idx) => idx !== index);
    onChange("features", updated);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label
          htmlFor={`fg-cols-${sectionId}`}
          className="text-xs font-bold text-slate-300"
        >
          Grid Columns
        </Label>
        <Select
          value={columns}
          onValueChange={(val) => onChange("columns", val)}
        >
          <SelectTrigger
            id={`fg-cols-${sectionId}`}
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
            Features List ({features.length})
          </Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAddFeature}
            className="h-7 text-xs px-2.5 bg-slate-900 border-slate-700 hover:bg-slate-800 text-blue-400 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Feature
          </Button>
        </div>
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                Feature #{idx + 1}
              </span>
              {features.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => handleRemoveFeature(idx)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-950/50 cursor-pointer"
                  title="Remove feature"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
            <div className="space-y-1">
              <Label
                htmlFor={`feat-title-${sectionId}-${idx}`}
                className="text-[11px] font-semibold text-slate-400"
              >
                Title *
              </Label>
              <Input
                id={`feat-title-${sectionId}-${idx}`}
                type="text"
                value={feat.title}
                onChange={(e) =>
                  handleFeatureChange(idx, "title", e.target.value)
                }
                placeholder="Feature title"
                required
                aria-required="true"
                className="bg-slate-900 border-slate-700 text-white focus:border-blue-500 rounded text-xs h-8"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor={`feat-desc-${sectionId}-${idx}`}
                className="text-[11px] font-semibold text-slate-400"
              >
                Description *
              </Label>
              <Textarea
                id={`feat-desc-${sectionId}-${idx}`}
                value={feat.description}
                onChange={(e) =>
                  handleFeatureChange(idx, "description", e.target.value)
                }
                placeholder="Feature description"
                rows={2}
                className="bg-slate-900 border-slate-700 text-white focus:border-blue-500 rounded text-xs resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
