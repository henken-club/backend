import { Module } from "@nestjs/common";

import { BooksModule } from "./books.module";
import { BookEdgesResolver } from "./resolvers/book-edges.resolver";
import { BooksResolver } from "./resolvers/books.resolver";

import { WritingsModule } from "~/writings/writings.module";

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
