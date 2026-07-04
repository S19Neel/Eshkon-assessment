import React from "react";
import { FeatureGridSectionPropsSchema } from "@/lib/schema/page";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FeatureGridSectionProps } from "@/types/sections";

export const FeatureGridSection: React.FC<FeatureGridSectionProps> = ({
  props,
}) => {
  const parsed = FeatureGridSectionPropsSchema.safeParse(props);

  if (!parsed.success) {
    return (
      <div className="my-4">
        <Alert
          variant="destructive"
          className="bg-red-950/40 border-red-500 text-red-200"
        >
          <AlertTitle className="font-bold">
            Invalid Feature Grid Configuration
          </AlertTitle>
          <AlertDescription className="text-xs mt-1">
            Please check the section properties in the Studio editor.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { features, columns } = parsed.data;

  const gridCols =
    columns === "1"
      ? "grid-cols-1 max-w-xl mx-auto"
      : columns === "2"
        ? "grid-cols-1 md:grid-cols-2"
        : columns === "4"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          : "grid-cols-1 md:grid-cols-3";

  return (
    <section
      aria-labelledby="features-heading"
      className="py-16 px-6 max-w-7xl mx-auto my-6"
    >
      <h2 id="features-heading" className="sr-only">
        Key Features
      </h2>
      <div className={`grid ${gridCols} gap-6`}>
        {features.map((feature, idx) => (
          <Card
            key={idx}
            className="bg-slate-800/80 border-slate-700/80 hover:border-blue-500/50 shadow-lg transition-colors flex flex-col justify-between"
          >
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-base mb-3 shadow">
                {feature.icon || idx + 1}
              </div>
              <CardTitle className="text-xl font-bold text-white tracking-wide">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 text-sm leading-relaxed pt-1">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
