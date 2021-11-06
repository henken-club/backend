import { BadRequestException, UseGuards } from "@nestjs/common";
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { from, map, mergeMap, Observable, switchMap } from "rxjs";

import { FindUserArgs, FindUserPayload } from "./dto/find-users.dto";
import { ManyUsersArgs } from "./dto/many-users.args";
import { GetNotificationsArgs } from "./dto/notifications.args";
import { RegisterUserArgs } from "./dto/register-user.dto";
import { ResolveActivitiesArgs } from "./dto/resolve-activities.args";
import { FolloweesArgs } from "./dto/resolve-followees.dto";
import { FollowersArgs } from "./dto/resolve-followers.dto";
import { PostsHenkensArgs } from "./dto/resolve-posts-henkens.dto";
import { ReceivedHenkensArgs } from "./dto/resolve-received-henkens.dto";

import { AuthnGuard } from "~/auth/authn.guard";
import { Viewer, ViewerType } from "~/auth/viewer.decorator";
import { ViewerGuard } from "~/auth/viewer.guard";
import { ActivityConnection } from "~/entities/activity.entities";
import { FollowingConnection } from "~/entities/following.entities";
import { HenkenConnection } from "~/entities/henken.entities";
import { NotificationConnection } from "~/entities/notification.entities";
import { User, UserConnection } from "~/entities/user.entities";
import { AccountsService } from "~/services/account/accounts.service";
import { ActivitiesService } from "~/services/activities/activities.service";
import { FollowingsService } from "~/services/followings/followings.service";
import { HenkensService } from "~/services/henkens/henkens.service";
import { NotificationsService } from "~/services/notifications/notifications.service";
import { UsersService } from "~/services/users/users.service";

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly users: UsersService,
    private readonly accounts: AccountsService,
    private readonly henkens: HenkensService,
    private readonly followings: FollowingsService,
    private readonly activities: ActivitiesService,
    private readonly notifications: NotificationsService,
  ) {}

  @ResolveField((type) => FollowingConnection, { name: "followees" })
  resolveFollowees(
    @Parent() { id }: User,
    @Args({ type: () => FolloweesArgs }) {
      orderBy,
      ...pagination
    }: FolloweesArgs,
  ): Observable<FollowingConnection> {
    return this.followings.getMany(
      pagination,
      orderBy,
      { fromId: id, toId: null },
    );
  }

  @ResolveField((type) => FollowingConnection, { name: "followers" })
  resolveFollowers(
    @Parent() { id }: User,
    @Args({ type: () => FollowersArgs }) {
      orderBy,
      ...pagination
    }: FollowersArgs,
  ): Observable<FollowingConnection> {
    return this.followings.getMany(
      pagination,
      orderBy,
      { fromId: null, toId: id },
    );
  }

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

  @ResolveField((type) => ActivityConnection, { name: "activities" })
  resolveActivities(
    @Parent() { id: userId }: User,
    @Args({ type: () => ResolveActivitiesArgs }) {
      orderBy,
      ...pagination
    }: ResolveActivitiesArgs,
  ): Observable<ActivityConnection> {
    return this.activities.getMany(
      pagination,
      orderBy,
      { userId },
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

  @Query(() => UserConnection, { name: "manyUsers" })
  manyUsers(
    @Args({ type: () => ManyUsersArgs }) { orderBy, ...pagination }:
      ManyUsersArgs,
  ): Observable<UserConnection> {
    return this.users.getMany(
      pagination,
      orderBy,
    );
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

  @Query(() => NotificationConnection, {
    name: "notifications",
  })
  @UseGuards(ViewerGuard)
  getNotifications(
    @Viewer() { accountId }: ViewerType,
    @Args({ type: () => GetNotificationsArgs }) { orderBy, ...pagination }:
      GetNotificationsArgs,
  ): Observable<NotificationConnection> {
    return this.notifications.getMany(
      pagination,
      orderBy,
    );
  }

  @Mutation(() => User, {
    name: "registerUser",
  })
  @UseGuards(AuthnGuard)
  createUser(
    @Viewer() { accountId }: ViewerType,
    @Args({ type: () => RegisterUserArgs }) { ...data }: RegisterUserArgs,
  ): Observable<User> {
    return this.accounts.isUserExists(accountId).pipe(
      mergeMap(
        (value) => {
          if (value) {
            throw new BadRequestException("Already registered");
          } else {
            return this.users.createUser(data);
          }
        },
      ),
    );
  }
}
