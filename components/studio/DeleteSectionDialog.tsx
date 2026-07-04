"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DeleteSectionDialogProps } from "@/types/editor";

export const DeleteSectionDialog: React.FC<DeleteSectionDialogProps> = ({
  open,
  sectionId,
  sectionType,
  onClose,
  onConfirmDelete,
}) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(val) => {
        if (!val) onClose();
      }}
    >
      <AlertDialogContent className="bg-slate-900 border-slate-700 text-white max-w-md shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-white">
            Remove Section?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-slate-300">
            Are you sure you want to remove the{" "}
            <strong className="text-blue-400 capitalize">{sectionType}</strong>{" "}
            section (
            <code className="text-xs bg-slate-800 px-1 py-0.5 rounded text-slate-400">
              {sectionId}
            </code>
            )? This action cannot be undone unless you reload without saving.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmDelete}
            className="bg-red-600 hover:bg-red-500 text-white font-bold"
          >
            Yes, Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
