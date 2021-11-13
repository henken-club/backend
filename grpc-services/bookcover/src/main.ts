import { Server, ServerCredentials } from "@grpc/grpc-js";

import { impl as bookcoverServer } from "./bookcover";
import { BookcoverService } from "./protogen/bookcover/bookcover";

function main() {
  const server = new Server();

  server.addService(BookcoverService, bookcoverServer);
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
