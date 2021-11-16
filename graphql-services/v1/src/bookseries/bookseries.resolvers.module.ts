import { Module } from "@nestjs/common";

import { BookSeriesModule } from "./bookseries.module";
import { BookSeriesEdgesResolver } from "./resolvers/bookseries-edges.resolver";
import { BookSeriesResolver } from "./resolvers/bookseries.resolver";

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
