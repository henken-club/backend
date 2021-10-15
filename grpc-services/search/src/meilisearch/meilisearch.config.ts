import { registerAs } from "@nestjs/config";

export const MeiliSearchConfig = registerAs("meilisearch", () => ({
  host: process.env.MEILISEARCH_HOST!,
}));
