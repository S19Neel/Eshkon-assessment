import React from "react";
import { CtaSectionPropsSchema } from "@/lib/schema/page";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CtaSectionProps } from "@/types/sections";

export const CtaSection: React.FC<CtaSectionProps> = ({ props }) => {
  const parsed = CtaSectionPropsSchema.safeParse(props);

  if (!parsed.success) {
    return (
      <div className="my-4">
        <Alert
          variant="destructive"
          className="bg-red-950/40 border-red-500 text-red-200"
        >
          <AlertTitle className="font-bold">
            Invalid CTA Configuration
          </AlertTitle>
          <AlertDescription className="text-xs mt-1">
            Please check the section properties in the Studio editor.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { label, url, style } = parsed.data;

  const variantMap: Record<string, "default" | "secondary" | "outline"> = {
    primary: "default",
    secondary: "secondary",
    outline: "outline",
  };

  const btnVariant = variantMap[style] || "default";

  return (
    <section
      aria-labelledby="cta-heading"
      className="py-16 px-6 max-w-5xl mx-auto text-center my-8 bg-slate-800/90 border border-slate-700 rounded-2xl shadow-xl"
    >
      <h2 id="cta-heading" className="text-3xl font-extrabold text-white mb-6">
        Ready to take the next step?
      </h2>
      <a
        href={url}
        className={cn(
          buttonVariants({ variant: btnVariant, size: "lg" }),
          style === "primary"
            ? "px-8 py-6 text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl border-0 rounded-xl inline-flex items-center justify-center"
            : "px-8 py-6 text-base font-bold rounded-xl inline-flex items-center justify-center"
        )}
      >
        {label}
      </a>
    </section>
  );
};
