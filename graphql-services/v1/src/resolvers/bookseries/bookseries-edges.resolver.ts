import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { BookSeries, BookSeriesEdge } from "~/entities/bookseries.entities";
import { BookSeriesService } from "~/services/bookseries/bookseries.service";

@Resolver(() => BookSeriesEdge)
export class BookSeriesEdgesResolver {
  constructor(private readonly service: BookSeriesService) {}

  @ResolveField((type) => BookSeries, { name: "node" })
  async resolveNode(
    @Parent() { node }: BookSeriesEdge,
  ): Promise<BookSeries> {
    return this.service.getById(node.id);
  }
}
