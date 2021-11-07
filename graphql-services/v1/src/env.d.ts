/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    readonly PORT: string;

    readonly NODE_ENV: "development" | "production" | "test";

    readonly GRPC_SERVICE_URL_CORE: string;
    readonly GRPC_SERVICE_URL_CONTENT: string;
    readonly GRPC_SERVICE_URL_BOOKCOVER: string;
    readonly GRPC_SERVICE_URL_SEARCH: string;
  }
}
