import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { Writing } from "./writings.entities";

import { Author } from "~/authors/author.entities";
import { AuthorsService } from "~/authors/authors.service";
import { Book } from "~/books/books.entities";
import { BooksService } from "~/books/books.service";

@Resolver(() => Writing)
export class WritingsResolver {
  constructor(
    private readonly authors: AuthorsService,
    private readonly books: BooksService,
  ) {}

  @ResolveField(() => Author, { name: "author" })
  resolveAuthor(@Parent() { author }: Writing): Observable<Author> {
    return this.authors.getById(author.id);
  }

  @ResolveField(() => Book, { name: "book" })
  resolveBook(@Parent() { book }: Writing): Observable<Book> {
    return this.books.getById(book.id);
  }
}
