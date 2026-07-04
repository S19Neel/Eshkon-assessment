"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionListItemProps } from "@/types/editor";

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
            ? "bg-slate-800 border-blue-500 shadow-lg ring-1 ring-blue-500 cursor-grab active:cursor-grabbing"
            : "bg-slate-800/50 border-slate-700 hover:border-slate-600 cursor-grab active:cursor-grabbing"
      } ${isDragOver ? "border-t-2 border-t-blue-400 bg-blue-950/40 shadow-md" : ""}`}
    >
      <div
        aria-hidden="true"
        className="p-1 text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing flex items-center justify-center transition-colors shrink-0"
        title="Grab and drag to reorder section"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="6" r="1.5" />
          <circle cx="15" cy="6" r="1.5" />
          <circle cx="9" cy="12" r="1.5" />
          <circle cx="15" cy="12" r="1.5" />
          <circle cx="9" cy="18" r="1.5" />
          <circle cx="15" cy="18" r="1.5" />
        </svg>
      </div>

      <button
        type="button"
        onClick={() => onSelect(section.id)}
        className="flex-1 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="text-[10px] font-mono px-1.5 py-0 bg-slate-700 text-blue-300 border-0 uppercase font-bold"
          >
            {section.type}
          </Badge>
          <span className="text-sm font-medium text-white truncate max-w-[150px]">
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
          className="text-red-400 hover:text-red-300 hover:bg-red-950/50 cursor-pointer"
        >
          ✕
        </Button>
      </div>
    </li>
  );
};
