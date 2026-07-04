import { Page } from "@/lib/schema/page";

export type StudioTab = "edit" | "preview" | "json";

export interface StudioClientProps {
  slug: string;
  initialPage: Page;
  role: string;
}

export interface StudioLayoutProps {
  slug: string;
  role: string;
}

export interface StudioHeaderProps {
  slug: string;
  role: string;
  pageTitle: string;
  activeTab: StudioTab;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: string | null;
  onTabChange: (tab: StudioTab) => void;
  onSaveDraft: () => Promise<void>;
  onOpenPublishDialog: () => void;
  onSignOut: () => void;
}

export interface StudioWorkspaceProps {
  role: string;
}

export interface StudioJsonSnapshotProps {
  page: Page;
  onCopyJson: () => void;
}

export interface ToastMessage {
  message: string;
  type: "success" | "error" | "info";
}

export interface StudioToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}
