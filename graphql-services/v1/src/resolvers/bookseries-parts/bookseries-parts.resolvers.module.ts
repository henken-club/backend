import { Module } from "@nestjs/common";

import { BookSeriesPartEdgesResolver } from "./bookseries-part-edges.resolver";
import { BookSeriesPartsResolver } from "./bookseries-parts.resolver";

import { BooksModule } from "~/services/books/books.module";
import { BookSeriesPartsModule } from "~/services/bookseries-parts/bookseries-parts.module";
import { BookSeriesModule } from "~/services/bookseries/bookseries.module";

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
