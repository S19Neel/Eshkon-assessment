"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { StudioJsonSnapshotProps } from "@/types/studio";

export const StudioJsonSnapshot: React.FC<StudioJsonSnapshotProps> = ({
  page,
  onCopyJson,
}) => {
  return (
    <div className="max-w-4xl mx-auto w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white">
            Immutable JSON Page Snapshot
          </h3>
          <p className="text-xs text-slate-400">
            Zod validated schema structure ready for publishing.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={onCopyJson}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold shadow transition-all"
        >
          Copy JSON
        </Button>
      </div>
      <pre className="p-4 bg-slate-950 rounded-xl overflow-x-auto text-xs font-mono text-emerald-400 max-h-[600px] shadow-inner">
        {JSON.stringify(page, null, 2)}
      </pre>
    </div>
  );
};
