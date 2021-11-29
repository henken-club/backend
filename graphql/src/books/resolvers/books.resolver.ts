import { BadRequestException } from "@nestjs/common";
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { from, Observable } from "rxjs";

import { Book, BookConnection } from "../books.entities";
import { BooksService } from "../books.service";

import { ManyBooksArgs } from "./dto/many-books.dto";
import {
  BookWritingsArgs,
  BookWritingsOrderField,
} from "./dto/resolve-writings.dto";

import {
  WritingConnection,
  WritingOrderField,
} from "~/writings/writings.entities";
import { WritingsService } from "~/writings/writings.service";

@Resolver(() => Book)
export class BooksResolver {
  constructor(
    private readonly books: BooksService,
    private readonly writings: WritingsService,
  ) {}

  @ResolveField(() => String, { name: "cover", nullable: true })
  resolveBookcover(@Parent() { isbn }: Book): Observable<string | null> {
    if (isbn) {
      return this.books.findBookcoverFromISBN(isbn);
    }
    return from([null]);
  }

  @ResolveField(() => WritingConnection, { name: "writings" })
  resolveWritings(
    @Parent() { id }: Book,
    @Args() { orderBy, ...pagination }: BookWritingsArgs,
  ): Observable<WritingConnection> {
    const filter = { bookId: id, authorId: null };
    switch (orderBy.field) {
      case BookWritingsOrderField.AUTHOR_NAME:
        return this.writings.getMany(
          pagination,
          {
            direction: orderBy.direction,
            field: WritingOrderField.AUTHOR_NAME,
          },
          filter,
        );
    }
    throw new BadRequestException();
  }

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
