/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";

    readonly CONNECTION_URL: string;

    readonly MEILISEARCH_HOST: string;
  }
}
