import fs from "fs";
import path from "path";
import { Page } from "@/lib/schema/page";

export function writeReleaseSnapshot(
  slug: string,
  version: string,
  snapshot: Page | Record<string, unknown>
): { success: boolean; filePath?: string; error?: string } {
  try {
    const releasesDir = path.join(process.cwd(), "releases", slug);

    if (!fs.existsSync(releasesDir)) {
      fs.mkdirSync(releasesDir, { recursive: true });
    }

    const fileName = `${version}.json`;
    const filePath = path.join(releasesDir, fileName);

    fs.writeFileSync(filePath, JSON.stringify(snapshot, null, 2), "utf-8");
    console.log(
      `[Snapshot Writer] Successfully wrote release snapshot to ${filePath}`
    );

    return { success: true, filePath };
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    console.warn(
      `[Snapshot Writer] Could not write snapshot to filesystem (${error.code || error.message}). DB release remains source of truth.`
    );
    return {
      success: false,
      error: error.message || "Failed to write snapshot to filesystem",
    };
  }
}
