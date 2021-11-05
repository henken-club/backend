import { Module } from "@nestjs/common";

import { BookEdgesResolver } from "./book-edges.resolver";
import { BooksResolver } from "./books.resolver";

import { BooksModule } from "~/services/books/books.module";
import { WritingsModule } from "~/services/writings/writings.module";

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
