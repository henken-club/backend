import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { Book, BookEdge } from "./books.entities";
import { BooksService } from "./books.service";

@Resolver(() => BookEdge)
export class BookEdgesResolver {
  constructor(private readonly service: BooksService) {}

  @ResolveField((type) => Book, { name: "node" })
  resolveNode(@Parent() { node }: BookEdge): Observable<Book> {
    return this.service.getById(node.id);
  }
}
