"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { updateSectionProps } from "@/lib/redux/slices/draftPageSlice";
import { setSelectedSectionId } from "@/lib/redux/slices/uiSlice";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const PropEditor: React.FC = () => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.draftPage.page);
  const selectedSectionId = useSelector(
    (state: RootState) => state.ui.selectedSectionId,
  );

  if (!page) return null;

  const section = page.sections.find((s) => s.id === selectedSectionId);

  if (!section) {
    return (
      <Card className="p-6 bg-slate-800/40 border-slate-700/60 rounded-xl text-center text-slate-400 text-sm shadow-none">
        Select a section from the list on the left to edit its content and
        properties.
      </Card>
    );
  }

  const handlePropChange = (key: string, value: unknown) => {
    dispatch(updateSectionProps({ id: section.id, props: { [key]: value } }));
  };

  return (
    <Card className="bg-slate-800 border-slate-700 text-white shadow-xl">
      <CardHeader className="border-b border-slate-700 pb-4">
        <CardTitle
          id="prop-editor-heading"
          className="text-base font-bold text-white capitalize"
        >
          {section.type} Section Properties
        </CardTitle>
        <CardDescription className="text-xs text-slate-400">
          ID: {section.id}
        </CardDescription>
        <CardAction>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => dispatch(setSelectedSectionId(null))}
            className="text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer"
            aria-label="Close property editor"
          >
            ✕
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          aria-labelledby="prop-editor-heading"
          className="space-y-4"
        >
          {section.type === "hero" && (
            <>
              <div className="space-y-1">
                <label
                  htmlFor="hero-title"
                  className="block text-xs font-semibold text-slate-300 uppercase"
                >
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  id="hero-title"
                  type="text"
                  required
                  value={(section.props.title as string) || ""}
                  onChange={(e) => handlePropChange("title", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="hero-subtitle"
                  className="block text-xs font-semibold text-slate-300 uppercase"
                >
                  Subtitle
                </label>
                <textarea
                  id="hero-subtitle"
                  rows={3}
                  value={(section.props.subtitle as string) || ""}
                  onChange={(e) => handlePropChange("subtitle", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="hero-align"
                  className="block text-xs font-semibold text-slate-300 uppercase"
                >
                  Alignment
                </label>
                <select
                  id="hero-align"
                  value={(section.props.align as string) || "center"}
                  onChange={(e) => handlePropChange("align", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </>
          )}

          {section.type === "cta" && (
            <>
              <div className="space-y-1">
                <label
                  htmlFor="cta-label"
                  className="block text-xs font-semibold text-slate-300 uppercase"
                >
                  Button Label <span className="text-red-400">*</span>
                </label>
                <input
                  id="cta-label"
                  type="text"
                  required
                  value={(section.props.label as string) || ""}
                  onChange={(e) => handlePropChange("label", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="cta-url"
                  className="block text-xs font-semibold text-slate-300 uppercase"
                >
                  Destination URL <span className="text-red-400">*</span>
                </label>
                <input
                  id="cta-url"
                  type="text"
                  required
                  value={(section.props.url as string) || ""}
                  onChange={(e) => handlePropChange("url", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="cta-style"
                  className="block text-xs font-semibold text-slate-300 uppercase"
                >
                  Button Style
                </label>
                <select
                  id="cta-style"
                  value={(section.props.style as string) || "primary"}
                  onChange={(e) => handlePropChange("style", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="primary">Primary Gradient</option>
                  <option value="secondary">Secondary Dark</option>
                  <option value="outline">Outline Blue</option>
                </select>
              </div>
            </>
          )}

          {section.type === "featureGrid" && (
            <div className="space-y-4">
              <span className="block text-xs font-semibold text-slate-300 uppercase">
                Features List
              </span>
              {(
                (section.props.features as Array<{
                  title: string;
                  description: string;
                }>) || []
              ).map((feat, fIdx) => (
                <div
                  key={fIdx}
                  className="p-3 bg-slate-900 border border-slate-700 rounded-lg space-y-2"
                >
                  <input
                    type="text"
                    value={feat.title}
                    onChange={(e) => {
                      const updated = [
                        ...((section.props.features as any[]) || []),
                      ];
                      updated[fIdx] = {
                        ...updated[fIdx],
                        title: e.target.value,
                      };
                      handlePropChange("features", updated);
                    }}
                    placeholder="Feature Title"
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-600 rounded text-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <textarea
                    rows={2}
                    value={feat.description}
                    onChange={(e) => {
                      const updated = [
                        ...((section.props.features as any[]) || []),
                      ];
                      updated[fIdx] = {
                        ...updated[fIdx],
                        description: e.target.value,
                      };
                      handlePropChange("features", updated);
                    }}
                    placeholder="Feature Description"
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-600 rounded text-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          )}

          {section.type === "testimonial" && (
            <div className="space-y-4">
              <span className="block text-xs font-semibold text-slate-300 uppercase">
                Testimonials List
              </span>
              {(
                (section.props.testimonials as Array<{
                  quote: string;
                  author: string;
                }>) || []
              ).map((t, tIdx) => (
                <div
                  key={tIdx}
                  className="p-3 bg-slate-900 border border-slate-700 rounded-lg space-y-2"
                >
                  <input
                    type="text"
                    value={t.author}
                    onChange={(e) => {
                      const updated = [
                        ...((section.props.testimonials as any[]) || []),
                      ];
                      updated[tIdx] = {
                        ...updated[tIdx],
                        author: e.target.value,
                      };
                      handlePropChange("testimonials", updated);
                    }}
                    placeholder="Author Name"
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-600 rounded text-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <textarea
                    rows={2}
                    value={t.quote}
                    onChange={(e) => {
                      const updated = [
                        ...((section.props.testimonials as any[]) || []),
                      ];
                      updated[tIdx] = {
                        ...updated[tIdx],
                        quote: e.target.value,
                      };
                      handlePropChange("testimonials", updated);
                    }}
                    placeholder="Quote Text"
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-600 rounded text-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
