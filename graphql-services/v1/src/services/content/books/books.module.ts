import { Module } from "@nestjs/common";

import { BooksService } from "./books.service";

@Module({
  imports: [],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
