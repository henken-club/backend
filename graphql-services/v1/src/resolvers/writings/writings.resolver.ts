import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

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
  resolveAuthor(@Parent() { author }: Writing): Observable<Author> {
    return this.authors.getById(author.id);
  }

  @ResolveField(() => Book, { name: "book" })
  resolveBook(@Parent() { book }: Writing): Observable<Book> {
    return this.books.getById(book.id);
  }
}
