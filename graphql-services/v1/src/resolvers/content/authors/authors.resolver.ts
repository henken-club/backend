import { Args, ID, Query, Resolver } from "@nestjs/graphql";

import { FindAuthorArgs, FindAuthorPayload } from "./dto/find-author.dto";

import { Author } from "~/entities/content/author.entities";
import { AuthorsService } from "~/services/content/authors/authors.service";

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authors: AuthorsService) {}

  @Query(() => Author, { name: "author" })
  async getAuthor(
    @Args("id", { type: () => ID }) id: string,
  ): Promise<Author> {
    return this.authors.getById(id);
  }

  @Query(() => FindAuthorPayload, { name: "findAuthor" })
  async findAuthor(
    @Args({ type: () => FindAuthorArgs }) { id }: FindAuthorArgs,
  ): Promise<FindAuthorPayload> {
    const result = await this.authors.findById(id);
    return { author: result };
  }
}
