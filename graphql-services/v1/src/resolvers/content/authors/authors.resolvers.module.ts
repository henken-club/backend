import { Module } from "@nestjs/common";

import { AuthorEdgesResolver } from "./author-edges.resolver";
import { AuthorsResolver } from "./authors.resolver";

import { AuthorsModule } from "~/services/content/authors/authors.module";

@Module({
  imports: [
    AuthorsModule,
  ],
  providers: [
    AuthorsResolver,
    AuthorEdgesResolver,
  ],
})
export class AuthorsResolversModule {}
