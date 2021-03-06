import { Module } from "@nestjs/common";

import { BookSeriesService } from "~/contents/services/bookseries.service";
import { PrismaModule } from "~/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [BookSeriesService],
  exports: [BookSeriesService],
})
export class BookSeriesModule {}
