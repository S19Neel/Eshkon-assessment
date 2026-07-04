import { TestCredentialItemProps } from "@/types/pages";

export const TEST_CREDENTIALS: TestCredentialItemProps[] = [
  {
    role: "Viewer Role",
    badgeClassName:
      "text-red-400 border-red-800 bg-red-950/40 font-bold uppercase",
    email: "viewer@example.com",
    description:
      "Can preview drafts and view live releases, but cannot save edits or publish.",
  },
  {
    role: "Editor Role",
    badgeClassName:
      "text-amber-400 border-amber-800 bg-amber-950/40 font-bold uppercase",
    email: "editor@example.com",
    description:
      "Can modify section props, reorder layouts, and save drafts to PostgreSQL.",
  },
  {
    role: "Publisher Role",
    badgeClassName:
      "text-emerald-400 border-emerald-800 bg-emerald-950/40 font-bold uppercase",
    email: "publisher@example.com",
    description:
      "Has full editor access plus the authority to execute SemVer releases to production.",
  },
];
