import * as path from "path";

import { registerAs } from "@nestjs/config";

export const HenkensConfig = registerAs("henkens", () => ({
  client: {
    options: {
      url: process.env.CORE_SERVICE_URL!,
      package: "henkenclub.core.v1",
      protoPath: [
        path.resolve(__dirname, "../../protobuf/core/henken.proto"),
      ],
    },
  },
}));
