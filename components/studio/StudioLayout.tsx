"use client";

import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { toast as sonnerToast } from "sonner";
import { useStudioAutoSave } from "@/hooks/useStudioAutoSave";
import { useStudioActions } from "@/hooks/useStudioActions";
import { StudioHeader } from "./StudioHeader";
import { StudioWorkspace } from "./StudioWorkspace";
import { StudioJsonSnapshot } from "./StudioJsonSnapshot";
import { PreviewPane } from "./PreviewPane";
import { PublishDialog } from "./PublishDialog";
import { StudioLayoutProps } from "@/types/studio";

export const StudioLayout: React.FC<StudioLayoutProps> = ({ slug, role }) => {
  const [showPublishDialog, setShowPublishDialog] = useState(false);

  // Initialize auto-save background effect
  useStudioAutoSave(slug, role);

  // Studio user actions & state
  const {
    page,
    activeTab,
    isDirty,
    isSaving,
    lastSaved,
    toast,
    handleTabChange,
    handleSaveDraft,
    copyJson,
    closeToast,
  } = useStudioActions(slug, role);

  // Sync Redux toast with official Sonner toast UI
  useEffect(() => {
    if (toast) {
      if (toast.type === "success") sonnerToast.success(toast.message);
      else if (toast.type === "error") sonnerToast.error(toast.message);
      else sonnerToast.info(toast.message);
      closeToast();
    }
  }, [toast, closeToast]);

  if (!page) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-semibold text-sm">
        Loading Studio workspace...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <StudioHeader
        slug={slug}
        role={role}
        pageTitle={page.title}
        activeTab={activeTab}
        isDirty={isDirty}
        isSaving={isSaving}
        lastSaved={lastSaved}
        onTabChange={handleTabChange}
        onSaveDraft={handleSaveDraft}
        onOpenPublishDialog={() => setShowPublishDialog(true)}
        onSignOut={() => signOut({ callbackUrl: "/login" })}
      />

      <main className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
        {activeTab === "edit" && role !== "VIEWER" && (
          <StudioWorkspace role={role} />
        )}

        {activeTab === "preview" && (
          <div className="max-w-6xl mx-auto w-full flex-1">
            <PreviewPane />
          </div>
        )}

        {activeTab === "json" && (
          <StudioJsonSnapshot page={page} onCopyJson={copyJson} />
        )}
      </main>

      {showPublishDialog && (
        <PublishDialog
          slug={slug}
          role={role}
          onClose={() => setShowPublishDialog(false)}
        />
      )}
    </div>
  );
};
