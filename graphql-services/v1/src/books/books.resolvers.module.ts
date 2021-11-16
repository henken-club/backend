import { Module } from "@nestjs/common";

import { BookEdgesResolver } from "./book-edges.resolver";
import { BooksResolver } from "./books.resolver";

import { WritingsModule } from "~/writings/writings.module";
import { BooksModule } from "./books.module";

@Module({
  imports: [
    BooksModule,
    WritingsModule,
  ],
  providers: [
    BooksResolver,
    BookEdgesResolver,
  ],
})
export class BooksResolversModule {}
