import { Module } from "@nestjs/common";

import { AuthorsModule } from "./modules/authors.module";
import { BooksModule } from "./modules/books.module";
import { BookSeriesPartsModule } from "./modules/bookseries-parts.module";
import { BookSeriesModule } from "./modules/bookseries.module";
import { WritingsModule } from "./modules/writings.module";
import { AuthorEdgesResolver } from "./resolvers/author-edges.resolver";
import { AuthorsResolver } from "./resolvers/authors.resolver";
import { BookEdgesResolver } from "./resolvers/book-edges.resolver";
import { BooksResolver } from "./resolvers/books.resolver";
import { BookSeriesEdgesResolver } from "./resolvers/bookseries-edges.resolver";
import { BookSeriesPartEdgesResolver } from "./resolvers/bookseries-part-edges.resolver";
import { BookSeriesPartsResolver } from "./resolvers/bookseries-parts.resolver";
import { BookSeriesResolver } from "./resolvers/bookseries.resolver";
import { WritingEdgesResolver } from "./resolvers/writing-edges.resolver";
import { WritingResolver } from "./resolvers/writings.resolver";

@Module({
  imports: [
    AuthorsModule,
    BooksModule,
    BookSeriesModule,
    BookSeriesPartsModule,
    WritingsModule,
  ],
  providers: [
    AuthorsResolver,
    AuthorEdgesResolver,
    BooksResolver,
    BookEdgesResolver,
    BookSeriesResolver,
    BookSeriesEdgesResolver,
    BookSeriesPartsResolver,
    BookSeriesPartEdgesResolver,
    WritingResolver,
    WritingEdgesResolver,
  ],
})
export class ContentResolversModule {}
