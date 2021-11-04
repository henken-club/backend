import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { BookSeries } from "~/entities/bookseries.entities";
import { BookSeriesService } from "~/services/bookseries/bookseries.service";

@Resolver(() => BookSeries)
export class BookSeriesResolver {
  constructor(private readonly bookSeries: BookSeriesService) {}

  @Query(() => BookSeries, { name: "bookseries" })
  getBookSeries(
    @Args("id", { type: () => ID }) id: string,
  ): Observable<BookSeries> {
    return this.bookSeries.getById(id);
  }
}
