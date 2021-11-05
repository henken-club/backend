import { BadRequestException } from "@nestjs/common";
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { Observable } from "rxjs";

import {
  AuthorWritingsArgs,
  AuthorWritingsOrderField,
} from "./dto/resolve-writings.dto";

import { Author } from "~/entities/author.entities";
import {
  WritingConnection,
  WritingOrderField,
} from "~/entities/writings.entities";
import { AuthorsService } from "~/services/authors/authors.service";
import { WritingsService } from "~/services/writings/writings.service";

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authors: AuthorsService,
    private readonly writings: WritingsService,
  ) {}

  @ResolveField(() => WritingConnection, { name: "writings" })
  resolveWritings(
    @Parent() { id }: Author,
    @Args() { orderBy, ...pagination }: AuthorWritingsArgs,
  ): Observable<WritingConnection> {
    const filter = { bookId: null, authorId: id };
    switch (orderBy.field) {
      case AuthorWritingsOrderField.BOOK_TITLE:
        return this.writings.getMany(
          pagination,
          {
            direction: orderBy.direction,
            field: WritingOrderField.BOOK_NAME,
          },
          filter,
        );
    }
    throw new BadRequestException();
  }

  @Query(() => Author, { name: "author" })
  getAuthor(@Args("id", { type: () => ID }) id: string): Observable<Author> {
    return this.authors.getById(id);
  }
}
