import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import {
  BookSeries,
  BookSeriesEdge,
} from "~/entities/content/bookseries.entities";
import { BookSeriesService } from "~/services/content/bookseries/bookseries.service";

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
