"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setSaving, setSaved } from "@/lib/redux/slices/draftPageSlice";
import { saveDraftAction } from "@/app/actions/draftActions";

export function useStudioAutoSave(slug: string, role: string) {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.draftPage.page);
  const { isDirty, isSaving, lastSaved } = useSelector(
    (state: RootState) => state.draftPage
  );

  useEffect(() => {
    if (!isDirty || role === "VIEWER" || !page) return;

    const timer = setTimeout(async () => {
      dispatch(setSaving(true));
      const res = await saveDraftAction(slug, page);
      if (res.success) {
        const now = new Date().toLocaleTimeString();
        dispatch(setSaved(now));
      } else {
        dispatch(setSaving(false));
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [isDirty, page, role, slug, dispatch]);

  return {
    page,
    isDirty,
    isSaving,
    lastSaved,
  };
}
