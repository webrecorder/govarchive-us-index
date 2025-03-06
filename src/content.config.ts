import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const archiveCollections = defineCollection({
  loader: file("collections/collections.yaml"),
  schema: z.object({
    endpoint: z.string().endsWith("/").default("https://app.browsertrix.com/"),
    org: z.string(),
    collection: z.string(),
    url: z.string().url().optional(),
  }),
});

export const collections = { collections: archiveCollections };
