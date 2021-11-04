import * as path from "path";

import { registerAs } from "@nestjs/config";

export const HenkensConfig = registerAs("henkens", () => ({
  client: {
    options: {
      url: process.env.CORE_SERVICE_URL!,
      package: "henkenclub.core",
      protoPath: [
        path.resolve(__dirname, "../../protobufs/content/type.proto"),
        path.resolve(__dirname, "../../protobufs/core/henken.proto"),
      ],
    },
  },
}));
