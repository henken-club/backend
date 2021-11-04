import { BadRequestException, UseGuards } from "@nestjs/common";
import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { from, map, Observable, switchMap } from "rxjs";

import { FindUserArgs, FindUserPayload } from "./dto/find-users.dto";

import { Viewer, ViewerType } from "~/auth/viewer.decorator";
import { ViewerGuard } from "~/auth/viewer.guard";
import { User } from "~/entities/user.entities";
import { AccountsService } from "~/services/account/accounts.service";
import { UsersService } from "~/services/users/users.service";

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly users: UsersService,
    private readonly accounts: AccountsService,
  ) {}

  @Query(() => User, { name: "user" })
  getUser(@Args("id", { type: () => ID }) id: string): Observable<User> {
    return this.users.getById(id);
  }

  @Query(() => FindUserPayload, { name: "findUser" })
  findUser(
    @Args({ type: () => FindUserArgs }) args: FindUserArgs,
  ): Observable<FindUserPayload> {
    if (args.alias) {
      return this.users.findByAlias(args.alias).pipe(
        map((user) => ({ user })),
      );
    } else if (args.id) {
      return this.users.findByAlias(args.id).pipe(
        map((user) => ({ user })),
      );
    }
    throw new BadRequestException();
  }

  @Query(() => User, {
    name: "viewer",
    nullable: true,
    description: "Return current user. Return `null` if user not registered",
  })
  @UseGuards(ViewerGuard)
  getViewer(
    @Viewer() { accountId }: ViewerType,
  ): Observable<User | null> {
    return this.accounts.getUserId(accountId)
      .pipe(
        switchMap((userId) => {
          if (userId) {
            return this.users.getById(userId);
          } else {
            return from([null]);
          }
        }),
      );
  }
}
