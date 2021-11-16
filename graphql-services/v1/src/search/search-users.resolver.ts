import { BadRequestException } from "@nestjs/common";
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { SearchUserArgs, SearchUserPayload } from "./dto/search-user.dto";
import { SearchUserResult } from "./search.entities";

import { SearchService } from "~/search/search.service";
import { User } from "~/users/user.entities";
import { UsersService } from "~/users/users.service";

@Resolver(() => SearchUserResult)
export class SearchUserResolver {
  constructor(
    private readonly search: SearchService,
    private readonly users: UsersService,
  ) {}

  @ResolveField(() => User, { name: "user" })
  resolveUser(@Parent() { userId }: SearchUserResult): Observable<User> {
    return this.users.getById(userId);
  }

  @Query((type) => SearchUserPayload, { name: "searchUser" })
  searchUser(
    @Args() { skip, limit, query }: SearchUserArgs,
  ): Observable<SearchUserPayload> {
    throw new BadRequestException();
  }
}
