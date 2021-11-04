import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { ManyBooksArgs } from "./dto/many-books.dto";

import { Book, BookConnection } from "~/entities/books.entities";
import { BooksService } from "~/services/books/books.service";

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly books: BooksService) {}

  @Query(() => Book, { name: "book" })
  getBook(@Args("id", { type: () => ID }) id: string): Observable<Book> {
    return this.books.getById(id);
  }

  @Query(() => BookConnection, { name: "manyBooks" })
  manyBooks(
    @Args({ type: () => ManyBooksArgs }) { orderBy, ...pagination }:
      ManyBooksArgs,
  ): Observable<BookConnection> {
    return this.books.getMany(pagination, orderBy);
  }
}
