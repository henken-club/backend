import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { User, UserEdge } from "~/users/user.entities";
import { UsersService } from "~/users/users.service";

@Resolver(() => UserEdge)
export class UserEdgesResolver {
  constructor(private readonly users: UsersService) {}

  @ResolveField((type) => User, { name: "node" })
  resolveNode(@Parent() { node }: UserEdge): Observable<User> {
    return this.users.getById(node.id);
  }
}
