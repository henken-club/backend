import * as path from "path";

import { registerAs } from "@nestjs/config";

export const UsersConfig = registerAs("users", () => ({
  client: {
    options: {
      url: process.env.CORE_SERVICE_URL!,
      package: "henkenclub.core.v1",
      protoPath: [
        path.resolve(__dirname, "../../protobuf/core/user.proto"),
      ],
    },
  },
}));
