import * as path from "path";

import { registerAs } from "@nestjs/config";

export const BooksConfig = registerAs("books", () => ({
  client: {
    options: {
      url: process.env.CONTENT_SERVICE_URL!,
      package: "henkenclub.content",
      protoPath: [
        path.resolve(__dirname, "../../protobufs/content/book.proto"),
      ],
    },
  },
}));
