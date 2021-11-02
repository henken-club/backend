import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import {
  BookSeriesPart,
  BookSeriesPartEdge,
} from "~/entities/content/bookseries-parts.entities";
import { BookSeriesPartsService } from "~/services/content/bookseries-parts/bookseries-parts.service";

@Resolver(() => BookSeriesPartEdge)
export class BookSeriesPartEdgesResolver {
  constructor(private readonly service: BookSeriesPartsService) {}

  @ResolveField((type) => BookSeriesPart, { name: "node" })
  async resolveNode(
    @Parent() { node }: BookSeriesPartEdge,
  ): Promise<BookSeriesPart> {
    return this.service.getById(node.id);
  }
}
