"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import {
  setPublishing,
  setPublishResult,
  setPublishError,
} from "@/lib/redux/slices/publishSlice";
import {
  calculateDiffAction,
  publishReleaseAction,
} from "@/app/actions/publishAction";
import { SemverDiffResult } from "@/lib/publish/semver";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PublishDialogProps {
  slug: string;
  role: string;
  onClose: () => void;
}

export const PublishDialog: React.FC<PublishDialogProps> = ({
  slug,
  role,
  onClose,
}) => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.draftPage.page);
  const { isPublishing, publishResult, error } = useSelector(
    (state: RootState) => state.publish,
  );

  const [diff, setDiff] = useState<SemverDiffResult | null>(null);
  const [loadingDiff, setLoadingDiff] = useState(true);

  useEffect(() => {
    if (page) {
      setLoadingDiff(true);
      calculateDiffAction(slug, page)
        .then((res) => setDiff(res))
        .catch(() => setDiff(null))
        .finally(() => setLoadingDiff(false));
    }
  }, [slug, page]);

  if (!page) return null;

  const handlePublish = async () => {
    if (role !== "PUBLISHER") {
      dispatch(
        setPublishError(
          "Forbidden: Only users with the PUBLISHER role can publish releases.",
        ),
      );
      return;
    }
    dispatch(setPublishing(true));
    const res = await publishReleaseAction(slug, page);
    if (res.success && res.version) {
      dispatch(
        setPublishResult({
          version: res.version,
          changelog: res.changelog || "Published successfully.",
          timestamp: new Date().toLocaleTimeString(),
        }),
      );
    } else {
      dispatch(setPublishError(res.error || "Failed to publish release."));
    }
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg p-6 shadow-2xl space-y-6">
        <DialogHeader className="border-b border-slate-800 pb-4">
          <DialogTitle
            id="publish-dialog-title"
            className="text-lg font-bold text-white flex items-center gap-2"
          >
            🚀 Publish New Release
          </DialogTitle>
        </DialogHeader>

        {role !== "PUBLISHER" && (
          <div className="p-4 bg-amber-950/50 border border-amber-600/50 rounded-xl text-amber-200 text-sm flex items-center justify-between gap-4">
            <div>
              ⚠️ You are logged in as{" "}
              <strong className="uppercase">{role}</strong>. Only users with the{" "}
              <strong>PUBLISHER</strong> role can execute a live release.
            </div>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg whitespace-nowrap shadow transition-colors cursor-pointer shrink-0"
            >
              Switch Role
            </button>
          </div>
        )}

        {loadingDiff ? (
          <div className="py-8 text-center text-slate-400">
            Calculating semantic diff and changelog...
          </div>
        ) : diff ? (
          <div className="space-y-4">
            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block uppercase font-bold">
                  SemVer Change Type
                </span>
                <span
                  className={`text-base font-extrabold uppercase ${diff.type === "major" ? "text-red-400" : diff.type === "minor" ? "text-amber-400" : "text-blue-400"}`}
                >
                  {diff.type}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block uppercase font-bold">
                  Target Version
                </span>
                <span className="text-lg font-mono font-bold text-white">
                  v{diff.nextVersion}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase block">
                Detected Changes ({diff.changes.length})
              </span>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 max-h-40 overflow-y-auto space-y-1">
                {diff.changes.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">
                    No modifications detected since last release.
                  </p>
                ) : (
                  diff.changes.map((change, i) => (
                    <div
                      key={i}
                      className="text-xs text-slate-300 font-mono flex items-start gap-2"
                    >
                      <span className="text-blue-400">•</span>
                      <span>{change}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : null}

        {error && (
          <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-red-200 text-xs">
            {error}
          </div>
        )}

        {publishResult && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-emerald-300 font-bold text-sm">
              <span>🎉 Successfully Published v{publishResult.version}!</span>
              <span className="text-xs font-normal opacity-80">
                {publishResult.timestamp}
              </span>
            </div>
            <p className="text-xs text-emerald-200">
              {publishResult.changelog}
            </p>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
          >
            {publishResult ? "Close" : "Cancel"}
          </button>
          {!publishResult && (
            <button
              type="button"
              disabled={isPublishing || role !== "PUBLISHER" || loadingDiff}
              onClick={handlePublish}
              className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {isPublishing ? "Publishing..." : "Confirm Publish"}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
