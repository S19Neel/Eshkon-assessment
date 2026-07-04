"use client";

import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PublishResultSuccessProps } from "@/types/publish";

export const PublishResultSuccess: React.FC<PublishResultSuccessProps> = ({
  result,
}) => {
  return (
    <Alert className="bg-emerald-950/60 border-emerald-500 text-emerald-200">
      <AlertTitle className="font-bold text-base flex items-center gap-2">
        ✅ Release Published Successfully!
      </AlertTitle>
      <AlertDescription className="text-xs space-y-3 mt-2">
        <div className="flex items-center gap-2 font-mono">
          <span className="bg-emerald-900/80 px-2 py-0.5 rounded text-emerald-300 font-bold">
            v{result.version}
          </span>
          <span className="text-emerald-400/80">at {result.timestamp}</span>
        </div>
        <p className="bg-slate-950/80 p-3 rounded-lg border border-emerald-800/40 text-slate-300 font-mono text-[11px] leading-relaxed">
          {result.changelog}
        </p>
      </AlertDescription>
    </Alert>
  );
};
