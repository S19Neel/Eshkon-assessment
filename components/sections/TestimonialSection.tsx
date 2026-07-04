import React from "react";
import { TestimonialSectionPropsSchema } from "@/lib/schema/page";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TestimonialSectionProps } from "@/types/sections";

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  props,
}) => {
  const parsed = TestimonialSectionPropsSchema.safeParse(props);

  if (!parsed.success) {
    return (
      <div className="my-4">
        <Alert
          variant="destructive"
          className="bg-red-950/40 border-red-500 text-red-200"
        >
          <AlertTitle className="font-bold">
            Invalid Testimonial Configuration
          </AlertTitle>
          <AlertDescription className="text-xs mt-1">
            Please check the section properties in the Studio editor.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { testimonials } = parsed.data;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-16 px-6 max-w-7xl mx-auto my-6 bg-slate-900/50 rounded-2xl border border-slate-800 shadow-xl"
    >
      <h2
        id="testimonials-heading"
        className="text-2xl sm:text-3xl font-bold text-center text-white mb-12"
      >
        What People Are Saying
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <Card
            key={idx}
            className="bg-slate-800 border-slate-700 shadow-md flex flex-col justify-between"
          >
            <CardContent className="pt-6 text-slate-200 italic leading-relaxed text-sm">
              &ldquo;{t.quote}&rdquo;
            </CardContent>
            <CardFooter className="flex items-center gap-3 border-t border-slate-700/60 pt-4 mt-2">
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white uppercase text-xs shadow">
                {t.author.charAt(0)}
              </div>
              <div>
                <cite className="not-italic font-bold text-white block text-sm">
                  {t.author}
                </cite>
                {(t.role || t.company) && (
                  <span className="text-xs text-slate-400 block">
                    {t.role} {t.company ? `at ${t.company}` : ""}
                  </span>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
