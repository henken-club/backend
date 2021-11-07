import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { Following } from "~/entities/following.entities";
import { User } from "~/entities/user.entities";
import { UsersService } from "~/services/users/users.service";

@Resolver(() => Following)
export class FollowingsResolver {
  constructor(private readonly users: UsersService) {}

  @ResolveField(() => User, { name: "from" })
  resolveFrom(@Parent() { fromId }: Following): Observable<User> {
    return this.users.getById(fromId);
  }

  @ResolveField(() => User, { name: "to" })
  resolveTo(@Parent() { toId }: Following): Observable<User> {
    return this.users.getById(toId);
  }
}
