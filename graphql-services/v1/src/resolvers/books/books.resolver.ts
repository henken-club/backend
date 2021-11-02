import { Args, ID, Query, Resolver } from "@nestjs/graphql";

import { FindBookArgs, FindBookPayload } from "./dto/find-book.dto";

import { Book } from "~/entities/content/books.entities";
import { BooksService } from "~/services/content/books/books.service";

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly books: BooksService) {}

  @Query(() => Book, { name: "book" })
  async getBook(
    @Args("id", { type: () => ID }) id: string,
  ): Promise<Book> {
    return this.books.getById(id);
  }

  @Query(() => FindBookPayload, { name: "findBook" })
  async findBook(
    @Args({ type: () => FindBookArgs }) { id }: FindBookArgs,
  ): Promise<FindBookPayload> {
    const result = await this.books.findById(id);
    return { book: result };
  }
}
