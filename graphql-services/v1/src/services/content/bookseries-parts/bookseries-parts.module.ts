import { Module } from "@nestjs/common";

import { BookSeriesPartsService } from "./bookseries-parts.service";

@Module({
  imports: [],
  providers: [BookSeriesPartsService],
  exports: [BookSeriesPartsService],
})
export class BookSeriesPartsModule {}
