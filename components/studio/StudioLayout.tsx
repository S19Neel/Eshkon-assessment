"use client";

import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setActiveTab, showToast } from "@/lib/redux/slices/uiSlice";
import { setSaving, setSaved } from "@/lib/redux/slices/draftPageSlice";
import { saveDraftAction } from "@/app/actions/draftActions";
import { SectionListEditor } from "./SectionListEditor";
import { PropEditor } from "./PropEditor";
import { PreviewPane } from "./PreviewPane";
import { PublishDialog } from "./PublishDialog";

interface StudioLayoutProps {
  slug: string;
  role: string;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({ slug, role }) => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.draftPage.page);
  const { isDirty, isSaving, lastSaved } = useSelector(
    (state: RootState) => state.draftPage,
  );
  const { activeTab, toast } = useSelector((state: RootState) => state.ui);

  const [showPublishDialog, setShowPublishDialog] = useState(false);

  useEffect(() => {
    if (!isDirty || role === "VIEWER" || !page) return;

    const timer = setTimeout(async () => {
      dispatch(setSaving(true));
      const res = await saveDraftAction(slug, page);
      if (res.success) {
        const now = new Date().toLocaleTimeString();
        dispatch(setSaved(now));
      } else {
        dispatch(setSaving(false));
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [isDirty, page, role, slug, dispatch]);

  useEffect(() => {
    if (role === "VIEWER" && activeTab === "edit") {
      dispatch(setActiveTab("preview"));
    }
  }, [role, activeTab, dispatch]);

  if (!page) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Loading Studio workspace...
      </div>
    );
  }

  const handleSaveDraft = async () => {
    if (role !== "EDITOR" && role !== "PUBLISHER") {
      dispatch(
        showToast({
          message: "Viewer role cannot modify drafts.",
          type: "error",
        }),
      );
      return;
    }

    dispatch(setSaving(true));
    const res = await saveDraftAction(slug, page);
    if (res.success) {
      const now = new Date().toLocaleTimeString();
      dispatch(setSaved(now));
      dispatch(
        showToast({ message: `Draft saved at ${now}`, type: "success" }),
      );
    } else {
      dispatch(setSaving(false));
      dispatch(
        showToast({
          message: res.error || "Failed to save draft.",
          type: "error",
        }),
      );
    }
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(page, null, 2));
    dispatch(
      showToast({
        message: "JSON snapshot copied to clipboard!",
        type: "info",
      }),
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-3 text-sm font-semibold transition-all ${
            toast.type === "success"
              ? "bg-emerald-950 border-emerald-500 text-emerald-200"
              : toast.type === "error"
                ? "bg-red-950 border-red-500 text-red-200"
                : "bg-blue-950 border-blue-500 text-blue-200"
          }`}
        >
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => dispatch(showToast(null as any))}
            className="opacity-70 hover:opacity-100 p-0.5"
          >
            ✕
          </button>
        </div>
      )}

      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white shadow-md">
            S
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-tight flex items-center gap-2">
              <span>{page.title}</span>
              <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md">
                /{slug}
              </span>
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Role:</span>
              <span className="font-bold uppercase tracking-wider text-blue-400">
                {role}
              </span>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="ml-1 px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-[10px] font-semibold border border-slate-700 transition-colors cursor-pointer"
                title="Log out and switch role"
              >
                Switch Role / Logout
              </button>
              {lastSaved && (
                <span className="text-slate-500">
                  | Last saved: {lastSaved}
                </span>
              )}
            </div>
          </div>
        </div>

        <nav
          aria-label="Studio mode navigation"
          className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800"
        >
          {(role === "VIEWER"
            ? (["preview", "json"] as const)
            : (["edit", "preview", "json"] as const)
          ).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => dispatch(setActiveTab(tab))}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              {tab === "edit"
                ? "WYSIWYG Edit"
                : tab === "preview"
                  ? "Live Preview"
                  : "JSON Snapshot"}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={!isDirty || isSaving || role === "VIEWER"}
            onClick={handleSaveDraft}
            aria-label="Save draft to PostgreSQL"
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-xl border border-slate-700 shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
          >
            {isSaving ? "Saving..." : isDirty ? "Save Draft *" : "Saved"}
          </button>

          <button
            type="button"
            onClick={() => setShowPublishDialog(true)}
            aria-label="Publish release"
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center gap-2"
          >
            🚀 Publish Release
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
        {activeTab === "edit" && role !== "VIEWER" && (
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
              <PreviewPane />
            </div>
          </div>
        )}

        {activeTab === "preview" && (
          <div className="max-w-6xl mx-auto w-full flex-1">
            <PreviewPane />
          </div>
        )}

        {activeTab === "json" && (
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
              <button
                type="button"
                onClick={copyJson}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Copy JSON
              </button>
            </div>
            <pre className="p-4 bg-slate-950 rounded-xl overflow-x-auto text-xs font-mono text-emerald-400 max-h-[600px] shadow-inner">
              {JSON.stringify(page, null, 2)}
            </pre>
          </div>
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
