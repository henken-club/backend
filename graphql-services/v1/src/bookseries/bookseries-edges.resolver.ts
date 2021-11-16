import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { BookSeries, BookSeriesEdge } from "./bookseries.entities";

import { BookSeriesService } from "~/bookseries/bookseries.service";

@Resolver(() => BookSeriesEdge)
export class BookSeriesEdgesResolver {
  constructor(private readonly bookSeries: BookSeriesService) {}

  @ResolveField((type) => BookSeries, { name: "node" })
  resolveNode(
    @Parent() { node }: BookSeriesEdge,
  ): Observable<BookSeries> {
    return this.bookSeries.getById(node.id);
  }
}
