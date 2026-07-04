"use client";

import React from "react";
import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { usePublishRelease } from "@/hooks/usePublishRelease";
import { PublishRoleWarning } from "./publish/PublishRoleWarning";
import { PublishDiffViewer } from "./publish/PublishDiffViewer";
import { PublishResultSuccess } from "./publish/PublishResultSuccess";
import { PublishDialogProps } from "@/types/publish";

export const PublishDialog: React.FC<PublishDialogProps> = ({
  slug,
  role,
  onClose,
}) => {
  const {
    isPublishing,
    publishResult,
    error,
    diff,
    loadingDiff,
    handlePublish,
  } = usePublishRelease(slug, role);

  return (
    <Dialog
      open={true}
      onOpenChange={(val) => {
        if (!val) onClose();
      }}
    >
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg p-6 shadow-2xl space-y-4">
        <DialogHeader className="border-b border-slate-800 pb-3">
          <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
            🚀 Publish Release to Contentful
          </DialogTitle>
        </DialogHeader>

        {role !== "PUBLISHER" ? (
          <PublishRoleWarning
            role={role}
            onSwitchRole={() => signOut({ callbackUrl: "/login" })}
          />
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Publishing will push your current draft page state to Contentful
              as a live release and update the immutable Postgres snapshot.
            </p>

            {loadingDiff ? (
              <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center gap-3 text-xs text-slate-400 font-semibold animate-pulse">
                <span className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                <span>Calculating semantic version diff...</span>
              </div>
            ) : diff ? (
              <PublishDiffViewer diff={diff} />
            ) : null}

            {error && (
              <Alert
                variant="destructive"
                className="bg-red-950/60 border-red-500 text-red-200"
              >
                <AlertTitle className="font-bold text-xs">
                  Publishing Error
                </AlertTitle>
                <AlertDescription className="text-xs mt-1">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {publishResult && <PublishResultSuccess result={publishResult} />}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700"
          >
            {publishResult ? "Close" : "Cancel"}
          </Button>
          {!publishResult && role === "PUBLISHER" && (
            <Button
              type="button"
              size="sm"
              disabled={isPublishing || loadingDiff}
              onClick={handlePublish}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed border-0"
            >
              {isPublishing ? "Publishing..." : "Confirm Publish"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
