"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDraftPage } from "@/lib/redux/slices/draftPageSlice";
import { setActiveTab } from "@/lib/redux/slices/uiSlice";
import { StudioLayout } from "./StudioLayout";
import { Page } from "@/lib/schema/page";

interface StudioClientProps {
  slug: string;
  initialPage: Page;
  role: string;
}

export const StudioClient: React.FC<StudioClientProps> = ({
  slug,
  initialPage,
  role,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialPage) {
      dispatch(setDraftPage(initialPage));
    }
    if (role === "VIEWER") {
      dispatch(setActiveTab("preview"));
    } else {
      dispatch(setActiveTab("edit"));
    }
  }, [dispatch, initialPage, role]);

  return <StudioLayout slug={slug} role={role} />;
};
