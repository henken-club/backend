import { Module } from "@nestjs/common";

import { BookSeriesEdgesResolver } from "./bookseries-edges.resolver";
import { BookSeriesResolver } from "./bookseries.resolver";

import { BookSeriesModule } from "~/services/content/bookseries/bookseries.module";

@Module({
  imports: [
    BookSeriesModule,
  ],
  providers: [
    BookSeriesResolver,
    BookSeriesEdgesResolver,
  ],
})
export class BookSeriesResolversModule {}
