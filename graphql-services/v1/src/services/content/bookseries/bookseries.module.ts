import { Module } from "@nestjs/common";

import { BookSeriesService } from "./bookseries.service";

@Module({
  imports: [],
  providers: [BookSeriesService],
  exports: [BookSeriesService],
})
export class BookSeriesModule {}
