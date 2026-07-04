"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeroPropFormProps } from "@/types/editor";

export const HeroPropForm: React.FC<HeroPropFormProps> = ({
  sectionId,
  title,
  subtitle,
  align,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label
          htmlFor={`hero-title-${sectionId}`}
          className="text-xs font-bold text-slate-300"
        >
          Hero Title *
        </Label>
        <Input
          id={`hero-title-${sectionId}`}
          type="text"
          value={title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Enter headline"
          required
          aria-required="true"
          className="bg-slate-950 border-slate-700 text-white focus:border-blue-500 rounded-lg text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor={`hero-subtitle-${sectionId}`}
          className="text-xs font-bold text-slate-300"
        >
          Subtitle
        </Label>
        <Textarea
          id={`hero-subtitle-${sectionId}`}
          value={subtitle}
          onChange={(e) => onChange("subtitle", e.target.value)}
          placeholder="Enter supporting subtitle text"
          rows={3}
          className="bg-slate-950 border-slate-700 text-white focus:border-blue-500 rounded-lg text-sm resize-none"
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor={`hero-align-${sectionId}`}
          className="text-xs font-bold text-slate-300"
        >
          Text Alignment
        </Label>
        <Select value={align} onValueChange={(val) => onChange("align", val)}>
          <SelectTrigger
            id={`hero-align-${sectionId}`}
            className="bg-slate-950 border-slate-700 text-white focus:border-blue-500 rounded-lg text-sm"
          >
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700 text-white">
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
