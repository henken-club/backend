import { Module } from "@nestjs/common";

import { BookSeriesEdgesResolver } from "./resolvers/bookseries-edges.resolver";
import { BookSeriesResolver } from "./resolvers/bookseries.resolver";

import { BookSeriesModule } from "~/bookseries/bookseries.module";

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
