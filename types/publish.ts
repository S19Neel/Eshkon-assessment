import { SemverDiffResult } from "@/lib/publish/semver";

export interface PublishDialogProps {
  slug: string;
  role: string;
  onClose: () => void;
}

export interface PublishRoleWarningProps {
  role: string;
  onSwitchRole: () => void;
}

export interface PublishDiffViewerProps {
  diff: SemverDiffResult;
}

export interface PublishResultData {
  version: string;
  changelog: string;
  timestamp: string;
}

export interface PublishResultSuccessProps {
  result: PublishResultData;
}
