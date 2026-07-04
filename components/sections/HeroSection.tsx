import React from "react";
import { HeroSectionPropsSchema } from "@/lib/schema/page";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { HeroSectionProps } from "@/types/sections";

export const HeroSection: React.FC<HeroSectionProps> = ({ props }) => {
  const parsed = HeroSectionPropsSchema.safeParse(props);

  if (!parsed.success) {
    return (
      <div className="my-4">
        <Alert
          variant="destructive"
          className="bg-red-950/40 border-red-500 text-red-200"
        >
          <AlertTitle className="font-bold">
            Invalid Hero Section Configuration
          </AlertTitle>
          <AlertDescription className="text-xs mt-1">
            Please check the section properties in the Studio editor.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { title, subtitle, align } = parsed.data;

  const alignClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
        ? "text-right items-end"
        : "text-center items-center";

  return (
    <section
      aria-label="Hero Section"
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-24 px-6 sm:py-32 rounded-2xl shadow-xl my-6 border border-slate-700/50"
    >
      <div className={`max-w-4xl mx-auto flex flex-col gap-6 ${alignClass}`}>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};
