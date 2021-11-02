import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { Author } from "~/entities/content/author.entities";
import { Book } from "~/entities/content/books.entities";
import { Writing } from "~/entities/content/writings.entities";
import { AuthorsService } from "~/services/content/authors/authors.service";
import { BooksService } from "~/services/content/books/books.service";

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
