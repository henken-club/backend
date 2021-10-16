import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { AuthorEntity } from "~/contents/entities/author.entities";
import { BookEntity } from "~/contents/entities/books.entities";
import { WritingEntity } from "~/contents/entities/writings.entities";
import { AuthorsService } from "~/contents/services/authors.service";
import { BooksService } from "~/contents/services/books.service";

@Resolver(() => WritingEntity)
export class WritingResolver {
  constructor(
    private readonly authors: AuthorsService,
    private readonly books: BooksService,
  ) {}

  @ResolveField(() => AuthorEntity, { name: "author" })
  async resolveAuthor(
    @Parent() { author }: WritingEntity,
  ): Promise<AuthorEntity> {
    return this.authors.getById(author.id);
  }

  @ResolveField(() => BookEntity, { name: "book" })
  async resolveBook(@Parent() { book }: WritingEntity): Promise<BookEntity> {
    return this.books.getById(book.id);
  }
}
