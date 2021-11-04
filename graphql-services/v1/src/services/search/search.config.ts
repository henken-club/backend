import * as path from "path";

import { registerAs } from "@nestjs/config";

export const SearchConfig = registerAs("search", () => ({
  client: {
    options: {
      url: process.env.SEARCH_SERVICE_URL!,
      package: "henkenclub.search",
      protoPath: path.resolve(
        __dirname,
        "../../protobufs/search/searcher.proto",
      ),
    },
  },
}));
