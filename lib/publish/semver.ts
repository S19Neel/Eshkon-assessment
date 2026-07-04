import { Page, Section } from "@/lib/schema/page";

export type SemverType = "major" | "minor" | "patch" | "none";

export interface SemverDiffResult {
  type: SemverType;
  nextVersion: string;
  changelog: string;
  changes: string[];
}

function parseSemver(version: string): [number, number, number] {
  const parts = version.split(".").map((n) => parseInt(n, 10));
  if (parts.length !== 3 || parts.some((p) => isNaN(p))) {
    return [0, 1, 0];
  }
  return [parts[0], parts[1], parts[2]];
}

function bumpVersion(version: string, type: SemverType): string {
  const [major, minor, patch] = parseSemver(version || "0.0.0");
  if (type === "major") return `${major + 1}.0.0`;
  if (type === "minor") return `${major}.${minor + 1}.0`;
  if (type === "patch") return `${major}.${minor}.${patch + 1}`;
  return version || "0.1.0";
}

export function calculateSemverDiff(
  currentDraft: Page,
  lastReleaseSnapshot: Page | null,
  lastVersion = "0.0.0"
): SemverDiffResult {
  if (!lastReleaseSnapshot) {
    return {
      type: "minor",
      nextVersion: "0.1.0",
      changelog: "Initial release of page.",
      changes: ["Created initial page structure."],
    };
  }

  const changes: string[] = [];
  let highestDiff: SemverType = "none";

  const draftSectionsMap = new Map<string, Section>();
  currentDraft.sections.forEach((s) => draftSectionsMap.set(s.id, s));

  const releaseSectionsMap = new Map<string, Section>();
  lastReleaseSnapshot.sections.forEach((s) => releaseSectionsMap.set(s.id, s));

  lastReleaseSnapshot.sections.forEach((releaseSec) => {
    const draftSec = draftSectionsMap.get(releaseSec.id);
    if (!draftSec) {
      changes.push(`Removed section '${releaseSec.id}' (${releaseSec.type}).`);
      highestDiff = "major";
    } else if (draftSec.type !== releaseSec.type) {
      changes.push(
        `Changed type of section '${releaseSec.id}' from '${releaseSec.type}' to '${draftSec.type}'.`
      );
      highestDiff = "major";
    }
  });

  currentDraft.sections.forEach((draftSec) => {
    if (!releaseSectionsMap.has(draftSec.id)) {
      changes.push(`Added new section '${draftSec.id}' (${draftSec.type}).`);
      if (highestDiff !== "major") {
        highestDiff = "minor";
      }
    }
  });

  currentDraft.sections.forEach((draftSec) => {
    const releaseSec = releaseSectionsMap.get(draftSec.id);
    if (releaseSec && draftSec.type === releaseSec.type) {
      const draftPropsStr = JSON.stringify(draftSec.props || {});
      const releasePropsStr = JSON.stringify(releaseSec.props || {});
      if (draftPropsStr !== releasePropsStr) {
        changes.push(
          `Updated content/properties in section '${draftSec.id}' (${draftSec.type}).`
        );
        if (highestDiff === "none") {
          highestDiff = "patch";
        }
      }
    }
  });

  if (highestDiff === "none") {
    const draftIds = currentDraft.sections.map((s) => s.id).join(",");
    const releaseIds = lastReleaseSnapshot.sections.map((s) => s.id).join(",");
    if (draftIds !== releaseIds) {
      changes.push("Reordered sections on page.");
      highestDiff = "patch";
    }
  }

  const nextVersion =
    highestDiff === "none"
      ? lastVersion
      : bumpVersion(lastVersion, highestDiff);
  const changelog =
    changes.length > 0 ? changes.join(" ") : "No changes detected.";

  return {
    type: highestDiff,
    nextVersion,
    changelog,
    changes,
  };
}
