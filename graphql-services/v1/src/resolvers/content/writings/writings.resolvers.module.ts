import { Module } from "@nestjs/common";

import { WritingEdgesResolver } from "./writing-edges.resolver";
import { WritingsResolver } from "./writings.resolver";

import { AuthorsModule } from "~/services/content/authors/authors.module";
import { BooksModule } from "~/services/content/books/books.module";
import { WritingsModule } from "~/services/content/writings/writings.module";

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
