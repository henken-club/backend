import { Module } from "@nestjs/common";

import { AuthorEdgesResolver } from "./author-edges.resolver";
import { AuthorsResolver } from "./authors.resolver";

import { AuthorsModule } from "~/services/authors/authors.module";
import { WritingsModule } from "~/services/writings/writings.module";

@Module({
  imports: [
    AuthorsModule,
    WritingsModule,
  ],
  providers: [
    AuthorsResolver,
    AuthorEdgesResolver,
  ],
})
export class AuthorsResolversModule {}
