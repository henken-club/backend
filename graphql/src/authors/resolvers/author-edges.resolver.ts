import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { Author, AuthorEdge } from "../authors.entities";
import { AuthorsService } from "../authors.service";

@Resolver(() => AuthorEdge)
export class AuthorEdgesResolver {
  constructor(private readonly service: AuthorsService) {}

  @ResolveField((type) => Author, { name: "node" })
  resolveNode(@Parent() { node }: AuthorEdge): Observable<Author> {
    return this.service.getById(node.id);
  }
}
