import { Module } from "@nestjs/common";

import { BooksService } from "~/contents/services/books.service";
import { PrismaModule } from "~/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
