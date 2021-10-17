import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { BookEdgeEntity, BookEntity } from "~/contents/entities/books.entities";
import { BooksService } from "~/contents/services/books.service";

@Resolver(() => BookEdgeEntity)
export class BookEdgesResolver {
  constructor(private readonly service: BooksService) {}

  @ResolveField((type) => BookEntity, { name: "node" })
  async resolveNode(@Parent() { node }: BookEdgeEntity): Promise<BookEntity> {
    return this.service.getById(node.id);
  }
}
