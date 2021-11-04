import { BadRequestException, UseGuards } from "@nestjs/common";
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { from, map, Observable, switchMap } from "rxjs";

import { FindUserArgs, FindUserPayload } from "./dto/find-users.dto";
import { ManyUsersArgs } from "./dto/many-users.args";
import { PostsHenkensArgs } from "./dto/resolve-posts-henkens.dto";
import { ReceivedHenkensArgs } from "./dto/resolve-received-henkens.dto";

import { Viewer, ViewerType } from "~/auth/viewer.decorator";
import { ViewerGuard } from "~/auth/viewer.guard";
import { HenkenConnection } from "~/entities/henken.entities";
import { User, UserConnection } from "~/entities/user.entities";
import { AccountsService } from "~/services/account/accounts.service";
import { HenkensService } from "~/services/henkens/henkens.service";
import { UsersService } from "~/services/users/users.service";

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly users: UsersService,
    private readonly accounts: AccountsService,
    private readonly henkens: HenkensService,
  ) {}

  @ResolveField((type) => HenkenConnection, { name: "postsHenkens" })
  resolvePostsHenkens(
    @Parent() { id }: User,
    @Args({ type: () => PostsHenkensArgs }) {
      orderBy,
      filter,
      ...pagination
    }: PostsHenkensArgs,
  ): Observable<HenkenConnection> {
    return this.henkens.getMany(
      pagination,
      orderBy,
      {
        fromId: id,
        toId: filter?.to || null,
      },
    );
  }

  @ResolveField((type) => HenkenConnection, { name: "receivedHenkens" })
  resolveReceivedHenkens(
    @Parent() { id }: User,
    @Args({ type: () => ReceivedHenkensArgs }) {
      orderBy,
      filter,
      ...pagination
    }: ReceivedHenkensArgs,
  ): Observable<HenkenConnection> {
    return this.henkens.getMany(
      pagination,
      orderBy,
      {
        fromId: filter?.from || null,
        toId: id,
      },
    );
  }

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

  @Query(() => UserConnection, { name: "manyUsers" })
  manyUsers(
    @Args({ type: () => ManyUsersArgs }) { orderBy, ...pagination }:
      ManyUsersArgs,
  ): Observable<HenkenConnection> {
    return this.users.getMany(
      pagination,
      orderBy,
    );
  }
}
