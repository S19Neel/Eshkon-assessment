"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionListItemProps } from "@/types/editor";
import { GripVertical, Trash2 } from "lucide-react";

export const SectionListItem: React.FC<SectionListItemProps> = ({
  section,
  index,
  isSelected,
  isDragging,
  isDragOver,
  onSelect,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) => {
  const titleText =
    (section.props.title as string) ||
    (section.props.label as string) ||
    section.id;

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "hero":
        return "bg-blue-950/80 text-blue-300 border-blue-800/60 shadow-sm";
      case "featureGrid":
        return "bg-purple-950/80 text-purple-300 border-purple-800/60 shadow-sm";
      case "cta":
        return "bg-amber-950/80 text-amber-300 border-amber-800/60 shadow-sm";
      case "testimonial":
        return "bg-emerald-950/80 text-emerald-300 border-emerald-800/60 shadow-sm";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <li
      draggable={true}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
      className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 select-none ${
        isDragging
          ? "opacity-30 border-dashed border-blue-500 scale-[0.98] bg-slate-900 cursor-grabbing"
          : isSelected
            ? "bg-slate-800/90 border-blue-500 shadow-lg ring-1 ring-blue-500/50 cursor-grab active:cursor-grabbing"
            : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 cursor-grab active:cursor-grabbing"
      } ${isDragOver ? "border-t-2 border-t-blue-400 bg-blue-950/40 shadow-md" : ""}`}
    >
      <div
        aria-hidden="true"
        className="p-1 text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing flex items-center justify-center transition-colors shrink-0"
        title="Grab and drag to reorder section"
      >
        <GripVertical className="w-4 h-4 text-slate-400" />
      </div>

      <button
        type="button"
        onClick={() => onSelect(section.id)}
        className="flex-1 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`text-[10px] font-mono px-2 py-0.5 uppercase font-bold tracking-wider ${getBadgeStyle(
              section.type
            )}`}
          >
            {section.type}
          </Badge>
          <span className="text-sm font-semibold text-slate-200 truncate max-w-[140px] tracking-tight">
            {titleText}
          </span>
        </div>
      </button>

      <div
        className="flex items-center gap-1 shrink-0"
        role="group"
        aria-label={`Actions for section ${section.id}`}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(section.id, section.type);
          }}
          aria-label={`Delete section ${section.type}`}
          className="text-slate-400 hover:text-red-400 hover:bg-red-950/50 cursor-pointer h-7 w-7 transition-colors rounded-lg"
          title="Delete section"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </li>
  );
};
