import React from "react";
import { CtaSectionPropsSchema } from "@/lib/schema/page";

interface CtaSectionProps {
  props: Record<string, unknown>;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ props }) => {
  const parsed = CtaSectionPropsSchema.safeParse(props);

  if (!parsed.success) {
    return (
      <section aria-label="Invalid CTA Section" className="p-8 bg-red-950/40 border border-red-500 rounded-xl my-4">
        <h2 className="text-lg font-bold text-red-400">Invalid CTA Configuration</h2>
        <p className="text-sm text-red-200 mt-1">Please check the section properties in the Studio.</p>
      </section>
    );
  }

  const { label, url, style } = parsed.data;

  const btnClass =
    style === "secondary"
      ? "bg-slate-700 hover:bg-slate-600 text-white"
      : style === "outline"
      ? "border-2 border-blue-500 hover:bg-blue-500/10 text-blue-400"
      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg hover:shadow-blue-500/25";

  return (
    <section aria-labelledby="cta-heading" className="py-20 px-6 max-w-5xl mx-auto text-center my-8 bg-slate-800/90 border border-slate-700 rounded-2xl shadow-xl">
      <h2 id="cta-heading" className="text-3xl font-extrabold text-white mb-6">
        Ready to take the next step?
      </h2>
      <a
        href={url}
        className={`inline-block px-8 py-4 font-bold text-lg rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${btnClass}`}
      >
        {label}
      </a>
    </section>
  );
};
