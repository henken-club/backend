import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { Author } from "~/entities/author.entities";
import { Book } from "~/entities/books.entities";
import { Writing } from "~/entities/writings.entities";
import { AuthorsService } from "~/services/authors/authors.service";
import { BooksService } from "~/services/books/books.service";

@Resolver(() => Writing)
export class WritingsResolver {
  constructor(
    private readonly authors: AuthorsService,
    private readonly books: BooksService,
  ) {}

  @ResolveField(() => Author, { name: "author" })
  async resolveAuthor(@Parent() { author }: Writing): Promise<Author> {
    return this.authors.getById(author.id);
  }

  @ResolveField(() => Book, { name: "book" })
  async resolveBook(@Parent() { book }: Writing): Promise<Book> {
    return this.books.getById(book.id);
  }
}
