import { Module } from "@nestjs/common";

import { BookSeriesPartEdgesResolver } from "./bookseries-part-edges.resolver";
import { BookSeriesPartsResolver } from "./bookseries-parts.resolver";

import { BooksModule } from "~/books/books.module";
import { BookSeriesModule } from "~/bookseries/bookseries.module";
import { BookSeriesPartsModule } from "./bookseries-parts.module";

@Module({
  imports: [
    BookSeriesPartsModule,
    BooksModule,
    BookSeriesModule,
  ],
  providers: [
    BookSeriesPartsResolver,
    BookSeriesPartEdgesResolver,
  ],
})
export class BookSeriesPartsResolversModule {}
