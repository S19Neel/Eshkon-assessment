import React from "react";

interface UnsupportedSectionProps {
  type: string;
  props: Record<string, unknown>;
}

export const UnsupportedSection: React.FC<UnsupportedSectionProps> = ({ type }) => {
  return (
    <section
      aria-label={`Unsupported Section Type: ${type}`}
      className="p-6 bg-amber-950/30 border border-amber-600/50 rounded-xl my-4 text-center max-w-4xl mx-auto"
    >
      <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-base">
        <span>⚠️</span>
        <span>Unsupported Section Type: &ldquo;{type}&rdquo;</span>
      </div>
      <p className="text-xs text-amber-200/80 mt-1">
        This section exists in the data but does not have a registered rendering component yet.
      </p>
    </section>
  );
};
