import * as path from "path";

import { registerAs } from "@nestjs/config";

export const AnswersConfig = registerAs("answers", () => ({
  client: {
    options: {
      url: process.env.CORE_SERVICE_URL!,
      package: "henkenclub.core",
      protoPath: [
        path.resolve(__dirname, "../../protobufs/core/answer.proto"),
      ],
    },
  },
}));
