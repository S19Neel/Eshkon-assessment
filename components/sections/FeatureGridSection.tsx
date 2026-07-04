import React from "react";
import { FeatureGridSectionPropsSchema } from "@/lib/schema/page";

interface FeatureGridSectionProps {
  props: Record<string, unknown>;
}

export const FeatureGridSection: React.FC<FeatureGridSectionProps> = ({ props }) => {
  const parsed = FeatureGridSectionPropsSchema.safeParse(props);

  if (!parsed.success) {
    return (
      <section aria-label="Invalid Feature Grid Section" className="p-8 bg-red-950/40 border border-red-500 rounded-xl my-4">
        <h2 className="text-lg font-bold text-red-400">Invalid Feature Grid Configuration</h2>
        <p className="text-sm text-red-200 mt-1">Please check the section properties in the Studio.</p>
      </section>
    );
  }

  const { features, columns } = parsed.data;

  const gridCols =
    columns === "2" ? "grid-cols-1 md:grid-cols-2" : columns === "4" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-3";

  return (
    <section aria-labelledby="features-heading" className="py-16 px-6 max-w-7xl mx-auto my-6">
      <h2 id="features-heading" className="sr-only">
        Key Features
      </h2>
      <div className={`grid ${gridCols} gap-8`}>
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-6 bg-slate-800/80 border border-slate-700/80 rounded-xl shadow-lg hover:border-blue-500/50 transition-colors flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg">
              {feature.icon || idx + 1}
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">{feature.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
