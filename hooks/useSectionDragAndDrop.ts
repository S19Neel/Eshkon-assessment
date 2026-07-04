"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import {
  addSection,
  removeSection,
  reorderSections,
} from "@/lib/redux/slices/draftPageSlice";
import { setSelectedSectionId } from "@/lib/redux/slices/uiSlice";
import { Section } from "@/lib/schema/page";
import { SectionType } from "@/types/editor";

export function useSectionDragAndDrop() {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.draftPage.page);
  const selectedSectionId = useSelector(
    (state: RootState) => state.ui.selectedSectionId
  );

  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    index: number
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

  const handleAddSection = (type: SectionType) => {
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
  };

  const handleRemoveSection = (sectionId: string) => {
    dispatch(removeSection(sectionId));
    if (selectedSectionId === sectionId) {
      dispatch(setSelectedSectionId(null));
    }
  };

  const handleSelectSection = (id: string | null) => {
    dispatch(setSelectedSectionId(id));
  };

  return {
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
  };
}
