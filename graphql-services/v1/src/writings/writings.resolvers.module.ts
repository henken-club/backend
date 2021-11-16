import { Module } from "@nestjs/common";

import { WritingEdgesResolver } from "./writing-edges.resolver";
import { WritingsResolver } from "./writings.resolver";

import { AuthorsModule } from "~/authors/authors.module";
import { BooksModule } from "~/books/books.module";
import { WritingsModule } from "./writings.module";

@Module({
  imports: [
    WritingsModule,
    AuthorsModule,
    BooksModule,
  ],
  providers: [
    WritingsResolver,
    WritingEdgesResolver,
  ],
})
export class WritingsResolversModule {}
