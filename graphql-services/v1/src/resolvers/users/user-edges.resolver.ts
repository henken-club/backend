import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { User, UserEdge } from "~/entities/user.entities";
import { UsersService } from "~/services/users/users.service";

@Resolver(() => UserEdge)
export class UserEdgesResolver {
  constructor(private readonly users: UsersService) {}

  @ResolveField((type) => User, { name: "node" })
  async resolveNode(@Parent() { node }: UserEdge): Promise<User> {
    return this.users.getById(node.id);
  }
}
