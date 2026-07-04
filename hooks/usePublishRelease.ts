"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import {
  setPublishing,
  setPublishResult,
  setPublishError,
} from "@/lib/redux/slices/publishSlice";
import {
  calculateDiffAction,
  publishReleaseAction,
} from "@/app/actions/publishAction";
import { SemverDiffResult } from "@/lib/publish/semver";

export function usePublishRelease(slug: string, role: string) {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.draftPage.page);
  const { isPublishing, publishResult, error } = useSelector(
    (state: RootState) => state.publish
  );

  const [diff, setDiff] = useState<SemverDiffResult | null>(null);
  const [loadingDiff, setLoadingDiff] = useState(true);

  useEffect(() => {
    let active = true;
    if (page) {
      queueMicrotask(() => {
        if (active) setLoadingDiff(true);
      });
      calculateDiffAction(slug, page)
        .then((res) => {
          if (active) setDiff(res);
        })
        .catch(() => {
          if (active) setDiff(null);
        })
        .finally(() => {
          if (active) setLoadingDiff(false);
        });
    }
    return () => {
      active = false;
    };
  }, [slug, page]);

  const handlePublish = async () => {
    if (role !== "PUBLISHER") {
      dispatch(
        setPublishError(
          "Forbidden: Only users with the PUBLISHER role can publish releases."
        )
      );
      return;
    }
    if (!page) return;

    dispatch(setPublishing(true));
    const res = await publishReleaseAction(slug, page);
    if (res.success && res.version) {
      dispatch(
        setPublishResult({
          version: res.version,
          changelog: res.changelog || "Published successfully.",
          timestamp: new Date().toLocaleTimeString(),
        })
      );
    } else {
      dispatch(setPublishError(res.error || "Failed to publish release."));
    }
  };

  return {
    page,
    isPublishing,
    publishResult,
    error,
    diff,
    loadingDiff,
    handlePublish,
  };
}
