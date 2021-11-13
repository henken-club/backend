import * as path from "path";

import { registerAs } from "@nestjs/config";

export const GrpcClientClientConfig = registerAs("grpc-client", () => ({
  core: {
    client: {
      options: {
        url: process.env.GRPC_SERVICE_URL_CORE!,
        package: "henkenclub.core",
        protoPath: [
          path.resolve(__dirname, "../../protobufs/common/pagination.proto"),
          path.resolve(__dirname, "../../protobufs/common/pagination.proto"),
          path.resolve(__dirname, "../../protobufs/google/rpc/status.proto"),
          path.resolve(__dirname, "../../protobufs/content/type.proto"),
          path.resolve(__dirname, "../../protobufs/core/henken.proto"),
          path.resolve(__dirname, "../../protobufs/core/answer.proto"),
          path.resolve(__dirname, "../../protobufs/core/user.proto"),
          path.resolve(__dirname, "../../protobufs/core/following.proto"),
        ],
      },
    },
  },
  content: {
    client: {
      options: {
        url: process.env.GRPC_SERVICE_URL_CONTENT!,
        package: "henkenclub.content",
        protoPath: [
          path.resolve(__dirname, "../../protobufs/common/pagination.proto"),
          path.resolve(__dirname, "../../protobufs/google/rpc/status.proto"),
          path.resolve(__dirname, "../../protobufs/content/author.proto"),
          path.resolve(__dirname, "../../protobufs/content/book.proto"),
          path.resolve(__dirname, "../../protobufs/content/bookseries.proto"),
          path.resolve(__dirname, "../../protobufs/content/writing.proto"),
        ],
      },
    },
  },
  search: {
    client: {
      options: {
        url: process.env.GRPC_SERVICE_URL_SEARCH!,
        package: "henkenclub.search",
        protoPath: [
          path.resolve(__dirname, "../../protobufs/google/rpc/status.proto"),
          path.resolve(__dirname, "../../protobufs/search/searcher.proto"),
          path.resolve(__dirname, "../../protobufs/search/user.proto"),
        ],
      },
    },
  },
  bookcover: {
    client: {
      options: {
        url: process.env.GRPC_SERVICE_URL_BOOKCOVER!,
        package: "henkenclub.bookcover",
        protoPath: [
          path.resolve(__dirname, "../../protobufs/google/rpc/status.proto"),
          path.resolve(__dirname, "../../protobufs/bookcover/bookcover.proto"),
        ],
      },
    },
  },
}));
