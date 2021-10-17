import { Server, ServerCredentials } from "@grpc/grpc-js";

import { impl as fetcherServer } from "./fetcher";
import { FetcherService } from "./protogen/bookcover";

function main() {
  const server = new Server();

  server.addService(FetcherService, fetcherServer);
  server.bindAsync(
    // eslint-disable-next-line no-process-env
    `0.0.0.0:${process.env.PORT || 5000}`,
    ServerCredentials.createInsecure(),
    () => {
      server.start();
    },
  );
}
main();
