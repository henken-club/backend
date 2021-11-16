import { Module } from "@nestjs/common";

import { AuthorEdgesResolver } from "./author-edges.resolver";
import { AuthorsResolver } from "./authors.resolver";

import { WritingsModule } from "~/writings/writings.module";
import { AuthorsModule } from "./authors.module";

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
