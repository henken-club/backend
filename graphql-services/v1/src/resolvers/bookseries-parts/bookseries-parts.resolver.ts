import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { Book } from "~/entities/books.entities";
import { BookSeriesPart } from "~/entities/bookseries-parts.entities";
import { BookSeries } from "~/entities/bookseries.entities";
import { BooksService } from "~/services/books/books.service";
import { BookSeriesService } from "~/services/bookseries/bookseries.service";

@Resolver(() => BookSeriesPart)
export class BookSeriesPartsResolver {
  constructor(
    private readonly books: BooksService,
    private readonly series: BookSeriesService,
  ) {}

  @ResolveField(() => Book, { name: "book" })
  resolveAuthor(@Parent() { book }: BookSeriesPart): Observable<Book> {
    return this.books.getById(book.id);
  }

  @ResolveField(() => BookSeries, { name: "series" })
  resolveBook(@Parent() { series }: BookSeriesPart): Observable<BookSeries> {
    return this.series.getById(series.id);
  }
}
