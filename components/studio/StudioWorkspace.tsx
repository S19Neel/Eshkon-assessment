"use client";

import React from "react";
import { SectionListEditor } from "./SectionListEditor";
import { PropEditor } from "./PropEditor";
import { PreviewPane } from "./PreviewPane";
import { PreviewErrorBoundary } from "./PreviewErrorBoundary";
import { StudioWorkspaceProps } from "@/types/studio";

export const StudioWorkspace: React.FC<StudioWorkspaceProps> = ({ role }) => {
  if (role === "VIEWER") {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
      <div className="lg:col-span-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <SectionListEditor />
      </div>

      <div className="lg:col-span-4">
        <PropEditor />
      </div>

      <div className="lg:col-span-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Live Preview Pane
          </span>
        </div>
        <PreviewErrorBoundary>
          <PreviewPane />
        </PreviewErrorBoundary>
      </div>
    </div>
  );
};
