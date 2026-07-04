"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddSectionDialogProps } from "@/types/editor";
import { SECTION_TYPES } from "@/lib/constants/sections";

export const AddSectionDialog: React.FC<AddSectionDialogProps> = ({
  open,
  onOpenChange,
  onAddSection,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md p-6 shadow-2xl">
        <DialogHeader className="border-b border-slate-800 pb-3">
          <DialogTitle
            id="add-modal-title"
            className="text-lg font-bold text-white"
          >
            Choose Section Type
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 pt-2">
          {SECTION_TYPES.map((item) => (
            <Button
              key={item.type}
              type="button"
              variant="outline"
              onClick={() => onAddSection(item.type)}
              className="p-4 h-auto bg-slate-950/80 border-slate-800 hover:border-blue-500 hover:bg-slate-900 rounded-xl text-left flex flex-col items-start gap-1 transition-colors cursor-pointer"
            >
              <span className="font-bold text-white capitalize text-sm">
                {item.label}
              </span>
              <span className="text-xs text-slate-400 font-normal leading-normal">
                {item.desc}
              </span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
