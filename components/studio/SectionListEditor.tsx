"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSectionDragAndDrop } from "@/hooks/useSectionDragAndDrop";
import { SectionListItem } from "./SectionListItem";
import { AddSectionDialog } from "./AddSectionDialog";
import { DeleteSectionDialog } from "./DeleteSectionDialog";
import { SectionType } from "@/types/editor";
import { Plus } from "lucide-react";

export const SectionListEditor: React.FC = () => {
  const {
    page,
    selectedSectionId,
    draggedIdx,
    dragOverIdx,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    handleAddSection,
    handleRemoveSection,
    handleSelectSection,
  } = useSectionDragAndDrop();

  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    type: string;
  } | null>(null);

  if (!page) return null;

  const onConfirmDelete = () => {
    if (deleteTarget) {
      handleRemoveSection(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
        <div className="flex items-center gap-2">
          <h2
            id="section-list-heading"
            className="text-xs font-bold uppercase tracking-wider text-slate-300"
          >
            Page Sections
          </h2>
          <span className="bg-slate-800 text-blue-400 font-bold text-[11px] px-2 py-0.5 rounded-full border border-slate-700 shadow-sm">
            {page.sections.length}
          </span>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => setShowAddModal(true)}
          aria-label="Add new section"
          className="text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer h-8 px-3"
        >
          <Plus className="w-3.5 h-3.5" /> Add Section
        </Button>
      </div>

      <ul aria-labelledby="section-list-heading" className="space-y-2">
        {page.sections.map((section, idx) => (
          <SectionListItem
            key={section.id}
            section={section}
            index={idx}
            isSelected={selectedSectionId === section.id}
            isDragging={draggedIdx === idx}
            isDragOver={dragOverIdx === idx && draggedIdx !== idx}
            onSelect={handleSelectSection}
            onDelete={(id, type) => setDeleteTarget({ id, type })}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
          />
        ))}
      </ul>

      <AddSectionDialog
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAddSection={(type: SectionType) => {
          handleAddSection(type);
          setShowAddModal(false);
        }}
      />

      <DeleteSectionDialog
        open={!!deleteTarget}
        sectionId={deleteTarget?.id || null}
        sectionType={deleteTarget?.type || null}
        onClose={() => setDeleteTarget(null)}
        onConfirmDelete={onConfirmDelete}
      />
    </div>
  );
};
