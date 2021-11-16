import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { BookSeriesPart } from "../bookseries-parts.entities";

import { Book } from "~/books/books.entities";
import { BooksService } from "~/books/books.service";
import { BookSeries } from "~/bookseries/bookseries.entities";
import { BookSeriesService } from "~/bookseries/bookseries.service";

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
