import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { Book, BookEdge } from "~/entities/content/books.entities";
import { BooksService } from "~/services/content/books/books.service";

@Resolver(() => BookEdge)
export class BookEdgesResolver {
  constructor(private readonly service: BooksService) {}

  @ResolveField((type) => Book, { name: "node" })
  async resolveNode(@Parent() { node }: BookEdge): Promise<Book> {
    return this.service.getById(node.id);
  }
}
