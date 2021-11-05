import * as path from "path";

import { registerAs } from "@nestjs/config";

export const WritingsConfig = registerAs("writings", () => ({
  client: {
    options: {
      url: process.env.CONTENT_SERVICE_URL!,
      package: "henkenclub.content",
      protoPath: [
        path.resolve(__dirname, "../../protobufs/common/pagination.proto"),
        path.resolve(__dirname, "../../protobufs/content/writing.proto"),
      ],
    },
  },
}));
