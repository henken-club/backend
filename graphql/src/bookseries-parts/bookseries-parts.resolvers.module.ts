import { Module } from "@nestjs/common";

import { BookSeriesPartsModule } from "./bookseries-parts.module";
import { BookSeriesPartEdgesResolver } from "./resolvers/bookseries-part-edges.resolver";
import { BookSeriesPartsResolver } from "./resolvers/bookseries-parts.resolver";

import { BooksModule } from "~/books/books.module";
import { BookSeriesModule } from "~/bookseries/bookseries.module";

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
