"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CtaPropFormProps } from "@/types/editor";

export const CtaPropForm: React.FC<CtaPropFormProps> = ({
  sectionId,
  label,
  url,
  style,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label
          htmlFor={`cta-label-${sectionId}`}
          className="text-xs font-bold text-slate-300"
        >
          Button Label *
        </Label>
        <Input
          id={`cta-label-${sectionId}`}
          type="text"
          value={label}
          onChange={(e) => onChange("label", e.target.value)}
          placeholder="e.g. Get Started Now"
          required
          aria-required="true"
          className="bg-slate-950 border-slate-700 text-white focus:border-blue-500 rounded-lg text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor={`cta-url-${sectionId}`}
          className="text-xs font-bold text-slate-300"
        >
          Target URL *
        </Label>
        <Input
          id={`cta-url-${sectionId}`}
          type="text"
          value={url}
          onChange={(e) => onChange("url", e.target.value)}
          placeholder="e.g. /pricing or https://..."
          required
          aria-required="true"
          className="bg-slate-950 border-slate-700 text-white focus:border-blue-500 rounded-lg text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor={`cta-style-${sectionId}`}
          className="text-xs font-bold text-slate-300"
        >
          Visual Style
        </Label>
        <Select value={style} onValueChange={(val) => onChange("style", val)}>
          <SelectTrigger
            id={`cta-style-${sectionId}`}
            className="bg-slate-950 border-slate-700 text-white focus:border-blue-500 rounded-lg text-sm"
          >
            <SelectValue placeholder="Select CTA button style" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700 text-white">
            <SelectItem value="primary">Primary (Blue)</SelectItem>
            <SelectItem value="secondary">Secondary (Slate)</SelectItem>
            <SelectItem value="outline">Outline</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
