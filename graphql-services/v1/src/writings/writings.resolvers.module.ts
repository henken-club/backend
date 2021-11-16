import { Module } from "@nestjs/common";

import { WritingEdgesResolver } from "./resolvers/writing-edges.resolver";
import { WritingsResolver } from "./resolvers/writings.resolver";
import { WritingsModule } from "./writings.module";

import { AuthorsModule } from "~/authors/authors.module";
import { BooksModule } from "~/books/books.module";

@Module({
  imports: [
    WritingsModule,
    AuthorsModule,
    BooksModule,
  ],
  providers: [
    WritingsResolver,
    WritingEdgesResolver,
  ],
})
export class WritingsResolversModule {}
