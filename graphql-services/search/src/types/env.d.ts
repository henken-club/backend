/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";

    readonly SEARCH_SERVICE_URL: string;
  }
}
