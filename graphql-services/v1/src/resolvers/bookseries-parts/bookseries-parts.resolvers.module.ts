import { Module } from "@nestjs/common";

import { BookSeriesPartEdgesResolver } from "./bookseries-part-edges.resolver";
import { BookSeriesPartsResolver } from "./bookseries-parts.resolver";

import { BooksModule } from "~/services/content/books/books.module";
import { BookSeriesPartsModule } from "~/services/content/bookseries-parts/bookseries-parts.module";
import { BookSeriesModule } from "~/services/content/bookseries/bookseries.module";

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
