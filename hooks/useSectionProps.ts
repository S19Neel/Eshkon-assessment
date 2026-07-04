"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { updateSectionProps } from "@/lib/redux/slices/draftPageSlice";
import { setSelectedSectionId } from "@/lib/redux/slices/uiSlice";
import { FeatureItem, TestimonialItem } from "@/types/editor";

export function useSectionProps() {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.draftPage.page);
  const selectedSectionId = useSelector(
    (state: RootState) => state.ui.selectedSectionId
  );

  const section =
    page?.sections.find((s) => s.id === selectedSectionId) || null;

  const handlePropChange = (key: string, value: unknown) => {
    if (!section) return;
    dispatch(updateSectionProps({ id: section.id, props: { [key]: value } }));
  };

  const handleFeatureChange = (
    index: number,
    field: keyof FeatureItem,
    value: string
  ) => {
    if (!section) return;
    const currentFeatures =
      (section.props.features as unknown as FeatureItem[]) || [];
    const updated = currentFeatures.map((feat, idx) =>
      idx === index ? { ...feat, [field]: value } : feat
    );
    handlePropChange("features", updated);
  };

  const handleTestimonialChange = (
    index: number,
    field: keyof TestimonialItem,
    value: string
  ) => {
    if (!section) return;
    const currentTestimonials =
      (section.props.testimonials as unknown as TestimonialItem[]) || [];
    const updated = currentTestimonials.map((t, idx) =>
      idx === index ? { ...t, [field]: value } : t
    );
    handlePropChange("testimonials", updated);
  };

  const handleClose = () => {
    dispatch(setSelectedSectionId(null));
  };

  return {
    page,
    section,
    selectedSectionId,
    handlePropChange,
    handleFeatureChange,
    handleTestimonialChange,
    handleClose,
  };
}
