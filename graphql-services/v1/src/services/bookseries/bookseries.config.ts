import * as path from "path";

import { registerAs } from "@nestjs/config";

export const BookSeriesConfig = registerAs("bookseries", () => ({
  client: {
    options: {
      url: process.env.CONTENT_SERVICE_URL!,
      package: "henkenclub.content.v1",
      protoPath: [
        path.resolve(__dirname, "../../protobuf/content/bookseries.proto"),
      ],
    },
  },
}));
