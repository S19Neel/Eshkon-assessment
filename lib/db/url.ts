export function getDirectUrl(url: string | undefined): string {
  if (!url)
    return "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable";
  if (url.startsWith("prisma+postgres://")) {
    try {
      const urlObj = new URL(url);
      const apiKey = urlObj.searchParams.get("api_key");
      if (apiKey) {
        const decoded = JSON.parse(
          Buffer.from(apiKey, "base64").toString("utf-8")
        );
        if (decoded.databaseUrl) return decoded.databaseUrl;
      }
    } catch (e) {
      console.warn(
        "Failed to decode prisma+postgres url api_key, falling back to localhost:51214"
      );
    }
    return "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable";
  }
  return url;
}
