import {Server, ServerCredentials} from '@grpc/grpc-js';

import {FetcherService} from './protogen/bookcover';
import {impl as fetcherServer} from './fetcher';

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
