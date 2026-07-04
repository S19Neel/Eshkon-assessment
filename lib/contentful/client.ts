import { createClient, ContentfulClientApi } from "contentful";

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const deliveryToken = process.env.CONTENTFUL_DELIEVERY_TOKEN;
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;

const globalForContentful = globalThis as unknown as {
  deliveryClient: ContentfulClientApi<undefined> | undefined;
  previewClient: ContentfulClientApi<undefined> | undefined;
};

export function getContentfulClient(
  preview = false,
): ContentfulClientApi<undefined> | null {
  if (!spaceId || (!deliveryToken && !previewToken)) {
    console.warn(
      "Contentful environment variables missing. Returning null client.",
    );
    return null;
  }

  try {
    if (preview) {
      if (!previewToken) return null;
      if (!globalForContentful.previewClient) {
        globalForContentful.previewClient = createClient({
          space: spaceId,
          accessToken: previewToken,
          host: "preview.contentful.com",
        });
      }
      return globalForContentful.previewClient;
    } else {
      if (!deliveryToken) return null;
      if (!globalForContentful.deliveryClient) {
        globalForContentful.deliveryClient = createClient({
          space: spaceId,
          accessToken: deliveryToken,
        });
      }
      return globalForContentful.deliveryClient;
    }
  } catch (err) {
    console.error("Failed to instantiate Contentful client:", err);
    return null;
  }
}
