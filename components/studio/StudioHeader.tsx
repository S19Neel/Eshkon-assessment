"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudioHeaderProps, StudioTab } from "@/types/studio";

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  slug,
  role,
  pageTitle,
  activeTab,
  isDirty,
  isSaving,
  lastSaved,
  onTabChange,
  onSaveDraft,
  onOpenPublishDialog,
  onSignOut,
}) => {
  const tabs: { value: StudioTab; label: string }[] =
    role === "VIEWER"
      ? [
          { value: "preview", label: "Live Preview" },
          { value: "json", label: "JSON Snapshot" },
        ]
      : [
          { value: "edit", label: "WYSIWYG Edit" },
          { value: "preview", label: "Live Preview" },
          { value: "json", label: "JSON Snapshot" },
        ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white shadow-md">
          S
        </div>
        <div>
          <h1 className="text-base font-bold text-white leading-tight flex items-center gap-2">
            <span>{pageTitle}</span>
            <Badge
              variant="outline"
              className="text-xs font-mono bg-slate-800 text-slate-400 border-slate-700"
            >
              /{slug}
            </Badge>
          </h1>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Role:</span>
            <Badge className="font-bold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800">
              {role}
            </Badge>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={onSignOut}
              className="ml-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700 font-semibold transition-colors"
              title="Log out and switch role"
            >
              Switch Role / Logout
            </Button>
            {lastSaved && (
              <span className="text-slate-500 font-mono">
                | Last saved: {lastSaved}
              </span>
            )}
          </div>
        </div>
      </div>

      <nav aria-label="Studio mode navigation">
        <Tabs
          value={activeTab}
          onValueChange={(val) => onTabChange(val as StudioTab)}
          className="w-auto"
        >
          <TabsList className="bg-slate-950 border border-slate-800 p-1 rounded-xl h-auto">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md text-slate-400 hover:text-yellow-700 transition-all"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </nav>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!isDirty || isSaving || role === "VIEWER"}
          onClick={onSaveDraft}
          aria-label="Save draft to PostgreSQL"
          className="text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-xl border-slate-700 shadow transition-all flex items-center gap-2"
        >
          {isSaving ? "Saving..." : isDirty ? "Save Draft *" : "Saved"}
        </Button>

        <Button
          type="button"
          size="sm"
          onClick={onOpenPublishDialog}
          aria-label="Publish release"
          className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl shadow-lg transition-all flex items-center gap-2 border-0"
        >
          🚀 Publish Release
        </Button>
      </div>
    </header>
  );
};
