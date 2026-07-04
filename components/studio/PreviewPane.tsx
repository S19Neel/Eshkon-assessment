"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setSelectedSectionId } from "@/lib/redux/slices/uiSlice";
import { SectionRenderer } from "@/components/registry/sectionRegistry";

export const PreviewPane: React.FC = () => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.draftPage.page);
  const selectedSectionId = useSelector(
    (state: RootState) => state.ui.selectedSectionId
  );

  if (!page) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        Loading page preview...
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-[700px] border border-slate-800 rounded-2xl p-4 sm:p-8 overflow-y-auto shadow-inner">
      <div className="max-w-5xl mx-auto">
        <SectionRenderer
          sections={page.sections}
          onSelectSection={(id) => dispatch(setSelectedSectionId(id))}
          selectedId={selectedSectionId}
          interactive={true}
        />
      </div>
    </div>
  );
};
