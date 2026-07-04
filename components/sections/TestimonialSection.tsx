import React from "react";
import { TestimonialSectionPropsSchema } from "@/lib/schema/page";

interface TestimonialSectionProps {
  props: Record<string, unknown>;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ props }) => {
  const parsed = TestimonialSectionPropsSchema.safeParse(props);

  if (!parsed.success) {
    return (
      <section aria-label="Invalid Testimonial Section" className="p-8 bg-red-950/40 border border-red-500 rounded-xl my-4">
        <h2 className="text-lg font-bold text-red-400">Invalid Testimonial Configuration</h2>
        <p className="text-sm text-red-200 mt-1">Please check the section properties in the Studio.</p>
      </section>
    );
  }

  const { testimonials } = parsed.data;

  return (
    <section aria-labelledby="testimonials-heading" className="py-16 px-6 max-w-7xl mx-auto my-6 bg-slate-900/50 rounded-2xl border border-slate-800">
      <h2 id="testimonials-heading" className="text-2xl sm:text-3xl font-bold text-center text-white mb-12">
        What People Are Saying
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <blockquote
            key={idx}
            className="p-6 bg-slate-800 border border-slate-700 rounded-xl flex flex-col justify-between gap-6 shadow-md"
          >
            <p className="text-slate-200 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            <footer className="flex items-center gap-3 mt-4 border-t border-slate-700/60 pt-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white uppercase">
                {t.author.charAt(0)}
              </div>
              <div>
                <cite className="not-italic font-bold text-white block text-sm">{t.author}</cite>
                {(t.role || t.company) && (
                  <span className="text-xs text-slate-400">
                    {t.role} {t.company ? `at ${t.company}` : ""}
                  </span>
                )}
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
};
