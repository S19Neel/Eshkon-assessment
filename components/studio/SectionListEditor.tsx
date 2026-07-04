"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import {
  addSection,
  removeSection,
  reorderSections,
} from "@/lib/redux/slices/draftPageSlice";
import { setSelectedSectionId } from "@/lib/redux/slices/uiSlice";
import { Section } from "@/lib/schema/page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const SectionListEditor: React.FC = () => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.draftPage.page);
  const selectedSectionId = useSelector(
    (state: RootState) => state.ui.selectedSectionId,
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  if (!page) return null;

  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    index: number,
  ) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    if (draggedIdx !== null && draggedIdx !== index) {
      dispatch(reorderSections({ startIndex: draggedIdx, endIndex: index }));
    }
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleAddSection = (
    type: "hero" | "featureGrid" | "testimonial" | "cta",
  ) => {
    const newId = `section-${type}-${Date.now()}`;
    let defaultProps: Record<string, unknown> = {};

    if (type === "hero") {
      defaultProps = {
        title: "New Hero Title",
        subtitle: "Hero subtitle goes here",
        align: "center",
      };
    } else if (type === "featureGrid") {
      defaultProps = {
        features: [
          { title: "Feature 1", description: "Description for feature 1." },
          { title: "Feature 2", description: "Description for feature 2." },
          { title: "Feature 3", description: "Description for feature 3." },
        ],
        columns: "3",
      };
    } else if (type === "testimonial") {
      defaultProps = {
        testimonials: [
          {
            quote: "Great experience working with this page studio!",
            author: "John Doe",
            role: "CEO",
          },
        ],
      };
    } else if (type === "cta") {
      defaultProps = { label: "Click Here", url: "/", style: "primary" };
    }

    const newSection: Section = { id: newId, type, props: defaultProps };
    dispatch(addSection(newSection));
    dispatch(setSelectedSectionId(newId));
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-700 pb-3">
        <h2
          id="section-list-heading"
          className="text-sm font-bold uppercase tracking-wider text-slate-300"
        >
          Page Sections ({page.sections.length})
        </h2>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          aria-label="Add new section"
          className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + Add Section
        </button>
      </div>

      <ul aria-labelledby="section-list-heading" className="space-y-2">
        {page.sections.map((section, idx) => {
          const isSelected = selectedSectionId === section.id;
          const isDragging = draggedIdx === idx;
          const isDragOver = dragOverIdx === idx && draggedIdx !== idx;

          return (
            <li
              key={section.id}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
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
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
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
                onClick={() => dispatch(setSelectedSectionId(section.id))}
                className="flex-1 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-1.5 py-0.5 bg-slate-700 text-blue-300 rounded uppercase font-bold">
                    {section.type}
                  </span>
                  <span className="text-sm font-medium text-white truncate max-w-[150px]">
                    {(section.props.title as string) ||
                      (section.props.label as string) ||
                      section.id}
                  </span>
                </div>
              </button>

              <div
                className="flex items-center gap-1 shrink-0"
                role="group"
                aria-label={`Actions for section ${section.id}`}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      confirm("Are you sure you want to remove this section?")
                    ) {
                      dispatch(removeSection(section.id));
                      if (isSelected) dispatch(setSelectedSectionId(null));
                    }
                  }}
                  aria-label={`Delete section ${section.type}`}
                  className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-950/50 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md p-6 shadow-2xl">
          <DialogHeader>
            <DialogTitle
              id="add-modal-title"
              className="text-lg font-bold text-white"
            >
              Choose Section Type
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {(["hero", "featureGrid", "testimonial", "cta"] as const).map(
              (type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleAddSection(type)}
                  className="p-4 bg-slate-900 border border-slate-700 hover:border-blue-500 rounded-xl text-left flex flex-col gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <span className="font-bold text-white capitalize">
                    {type}
                  </span>
                  <span className="text-xs text-slate-400">
                    Add a responsive {type} section.
                  </span>
                </button>
              ),
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
