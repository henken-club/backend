import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { Book } from "~/entities/books.entities";
import { BooksService } from "~/services/books/books.service";

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly books: BooksService) {}

  @Query(() => Book, { name: "book" })
  getBook(@Args("id", { type: () => ID }) id: string): Observable<Book> {
    return this.books.getById(id);
  }
}
