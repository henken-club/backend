import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { BookEntity } from "~/contents/entities/books.entities";
import { BookSeriesPartEntity } from "~/contents/entities/bookseries-parts.entities";
import { BookSeriesEntity } from "~/contents/entities/bookseries.entities";
import { BooksService } from "~/contents/services/books.service";
import { BookSeriesService } from "~/contents/services/bookseries.service";

@Resolver(() => BookSeriesPartEntity)
export class BookSeriesPartsResolver {
  constructor(
    private readonly books: BooksService,
    private readonly series: BookSeriesService,
  ) {}

  @ResolveField(() => BookEntity, { name: "book" })
  async resolveAuthor(
    @Parent() { book }: BookSeriesPartEntity,
  ): Promise<BookEntity> {
    return this.books.getById(book.id);
  }

  @ResolveField(() => BookSeriesEntity, { name: "bookSeries" })
  async resolveBook(
    @Parent() { series }: BookSeriesPartEntity,
  ): Promise<BookSeriesEntity> {
    return this.series.getById(series.id);
  }
}
