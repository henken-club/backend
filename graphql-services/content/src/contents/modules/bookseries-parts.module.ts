import { Module } from "@nestjs/common";

import { BookSeriesPartsService } from "~/contents/services/bookseries-parts.service";
import { PrismaModule } from "~/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [BookSeriesPartsService],
  exports: [BookSeriesPartsService],
})
export class BookSeriesPartsModule {}
