import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from "@nestjs/graphql";

import { BookWritingsArgs } from "./dto/books-writings.dto";
import { FindBookArgs, FindBookPayload } from "./dto/find-book.dto";
import { ManyBooksArgs } from "./dto/many-books.dto";

import {
  BookConnectionEntity,
  BookEntity,
} from "~/contents/entities/books.entities";
import { WritingConnectionEntity } from "~/contents/entities/writings.entities";
import { BooksService } from "~/contents/services/books.service";

@Resolver(() => BookEntity)
export class BooksResolver {
  constructor(private readonly books: BooksService) {}

  @ResolveReference()
  resolveReference(reference: { id: string }) {
    return this.books.getById(reference.id);
  }

  @ResolveField(() => WritingConnectionEntity, { name: "writings" })
  resolveWritings(
    @Parent() { id }: { id: string },
    @Args() { orderBy, ...pagination }: BookWritingsArgs,
  ) {
    return this.books.getWritings(
      id,
      pagination,
      this.books.convertWritingsOrderBy(orderBy),
    );
  }

  @Query(() => BookEntity, { name: "book" })
  async getBook(
    @Args("id", { type: () => ID }) id: string,
  ): Promise<BookEntity> {
    return this.books.getById(id);
  }

  @Query(() => FindBookPayload, { name: "findBook" })
  async findBook(
    @Args({ type: () => FindBookArgs }) { id }: FindBookArgs,
  ): Promise<FindBookPayload> {
    const result = await this.books.findById({ id });
    return { book: result };
  }

  @Query(() => BookConnectionEntity, { name: "manyBooks" })
  async manyBooks(
    @Args({ type: () => ManyBooksArgs }) { orderBy, ...pagination }:
      ManyBooksArgs,
  ): Promise<BookConnectionEntity> {
    return this.books.getMany(pagination, this.books.convertOrderBy(orderBy));
  }
}
