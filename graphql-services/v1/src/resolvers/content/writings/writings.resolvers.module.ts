import { Module } from "@nestjs/common";

import { WritingEdgesResolver } from "./writing-edges.resolver";
import { WritingsResolver } from "./writings.resolver";

import { AuthorsModule } from "~/services/content/authors/authors.module";
import { BooksModule } from "~/services/content/books/books.module";
import { BookSeriesModule } from "~/services/content/bookseries/bookseries.module";

@Module({
  imports: [
    BookSeriesModule,
    AuthorsModule,
    BooksModule,
  ],
  providers: [
    WritingsResolver,
    WritingEdgesResolver,
  ],
})
export class WritingsResolversModule {}
