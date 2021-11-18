import { Module } from "@nestjs/common";

import { AuthorsModule } from "./authors.module";
import { AuthorEdgesResolver } from "./resolvers/author-edges.resolver";
import { AuthorsResolver } from "./resolvers/authors.resolver";

import { WritingsModule } from "~/writings/writings.module";

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
