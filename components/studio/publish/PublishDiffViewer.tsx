"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { PublishDiffViewerProps } from "@/types/publish";

export const PublishDiffViewer: React.FC<PublishDiffViewerProps> = ({
  diff,
}) => {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "major":
        return "bg-red-600 text-white border-red-500 shadow-red-500/20 shadow";
      case "minor":
        return "bg-amber-600 text-white border-amber-500 shadow-amber-500/20 shadow";
      case "patch":
        return "bg-blue-600 text-white border-blue-500 shadow-blue-500/20 shadow";
      default:
        return "bg-slate-700 text-slate-300 border-slate-600";
    }
  };

  const getChangeIcon = (changeStr: string) => {
    if (changeStr.startsWith("Added")) return "➕";
    if (changeStr.startsWith("Removed")) return "➖";
    if (changeStr.startsWith("Reordered")) return "🔄";
    if (changeStr.startsWith("Updated") || changeStr.startsWith("Changed"))
      return "✏️";
    return "•";
  };

  return (
    <div className="space-y-4 bg-slate-950/60 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Semantic Version Bump:
          </span>
          <Badge
            className={`font-mono text-xs uppercase px-2.5 py-0.5 ${getBadgeColor(diff.type)}`}
          >
            {diff.type}
          </Badge>
        </div>
        <div className="font-mono text-xs font-bold bg-slate-800 px-3 py-1 rounded-lg text-slate-200 border border-slate-700">
          ➔ <span className="text-emerald-400">v{diff.nextVersion}</span>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Changelog ({diff.changes.length})
        </span>
        {diff.changes.length === 0 ? (
          <div className="text-xs text-slate-500 italic p-2 bg-slate-900/50 rounded-lg">
            No semantic changes detected from the published release.
          </div>
        ) : (
          <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {diff.changes.map((change, idx) => (
              <li
                key={idx}
                className="text-xs bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-lg flex items-center gap-2.5 shadow-sm"
              >
                <span className="text-sm shrink-0">
                  {getChangeIcon(change)}
                </span>
                <span className="text-slate-300 font-mono text-[11px] leading-relaxed">
                  {change}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
