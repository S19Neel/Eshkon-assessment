"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { showToast, setActiveTab } from "@/lib/redux/slices/uiSlice";
import { setSaving, setSaved } from "@/lib/redux/slices/draftPageSlice";
import { saveDraftAction } from "@/app/actions/draftActions";
import { StudioTab } from "@/types/studio";

export function useStudioActions(slug: string, role: string) {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.draftPage.page);
  const { isDirty, isSaving, lastSaved } = useSelector(
    (state: RootState) => state.draftPage
  );
  const activeTab = useSelector(
    (state: RootState) => state.ui.activeTab
  ) as StudioTab;
  const toast = useSelector((state: RootState) => state.ui.toast);

  const handleTabChange = (tab: StudioTab) => {
    dispatch(setActiveTab(tab));
  };

  const handleSaveDraft = async () => {
    if (role !== "EDITOR" && role !== "PUBLISHER") {
      dispatch(
        showToast({
          message: "Viewer role cannot modify drafts.",
          type: "error",
        })
      );
      return;
    }

    if (!page) return;

    dispatch(setSaving(true));
    const res = await saveDraftAction(slug, page);
    if (res.success) {
      const now = new Date().toLocaleTimeString();
      dispatch(setSaved(now));
      dispatch(
        showToast({ message: `Draft saved at ${now}`, type: "success" })
      );
    } else {
      dispatch(setSaving(false));
      dispatch(
        showToast({
          message: res.error || "Failed to save draft.",
          type: "error",
        })
      );
    }
  };

  const copyJson = () => {
    if (!page) return;
    navigator.clipboard.writeText(JSON.stringify(page, null, 2));
    dispatch(
      showToast({
        message: "JSON snapshot copied to clipboard!",
        type: "info",
      })
    );
  };

  const closeToast = () => {
    dispatch(showToast(null as any));
  };

  return {
    page,
    activeTab,
    isDirty,
    isSaving,
    lastSaved,
    toast,
    handleTabChange,
    handleSaveDraft,
    copyJson,
    closeToast,
  };
}
