import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { Author, AuthorEdge } from "~/entities/content/author.entities";
import { AuthorsService } from "~/services/content/authors/authors.service";

@Resolver(() => AuthorEdge)
export class AuthorEdgesResolver {
  constructor(private readonly service: AuthorsService) {}

  @ResolveField((type) => Author, { name: "node" })
  async resolveNode(@Parent() { node }: AuthorEdge): Promise<Author> {
    return this.service.getById(node.id);
  }
}
