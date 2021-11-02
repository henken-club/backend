import { Module } from "@nestjs/common";

import { BookEdgesResolver } from "./book-edges.resolver";
import { BooksResolver } from "./books.resolver";

import { BooksModule } from "~/services/content/books/books.module";

@Module({
  imports: [
    BooksModule,
  ],
  providers: [
    BooksResolver,
    BookEdgesResolver,
  ],
})
export class BooksResolversModule {}
