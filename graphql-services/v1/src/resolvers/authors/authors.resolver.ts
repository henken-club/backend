import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { Author } from "~/entities/author.entities";
import { AuthorsService } from "~/services/authors/authors.service";

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authors: AuthorsService) {}

  @Query(() => Author, { name: "author" })
  getAuthor(@Args("id", { type: () => ID }) id: string): Observable<Author> {
    return this.authors.getById(id);
  }
}
