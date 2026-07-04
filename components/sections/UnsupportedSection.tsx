import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { UnsupportedSectionProps } from "@/types/sections";

export const UnsupportedSection: React.FC<UnsupportedSectionProps> = ({
  type,
}) => {
  return (
    <div className="my-4 max-w-4xl mx-auto">
      <Alert className="bg-amber-950/30 border-amber-600/50 text-amber-300">
        <AlertTitle className="font-bold flex items-center gap-2">
          <span>⚠️</span>
          <span>Unsupported Section Type: &ldquo;{type}&rdquo;</span>
        </AlertTitle>
        <AlertDescription className="text-xs text-amber-200/80 mt-1">
          This section exists in the data but does not have a registered
          rendering component yet.
        </AlertDescription>
      </Alert>
    </div>
  );
};
