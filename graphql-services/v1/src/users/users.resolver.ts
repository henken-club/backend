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
import { RegisterUserArgs, RegisterUserPayload } from "./dto/register-user.dto";
import { ResolveActivitiesArgs } from "./dto/resolve-activities.args";
import { FolloweesArgs } from "./dto/resolve-followees.dto";
import { FollowersArgs } from "./dto/resolve-followers.dto";
import { PostsHenkensArgs } from "./dto/resolve-posts-henkens.dto";
import { ReceivedHenkensArgs } from "./dto/resolve-received-henkens.dto";

import { AccountsService } from "~/account/accounts.service";
import { ActivitiesService } from "~/activities/activities.service";
import { ActivityConnection } from "~/activities/activity.entities";
import { AuthnGuard } from "~/auth/authn.guard";
import { Viewer, ViewerType } from "~/auth/viewer.decorator";
import { ViewerGuard } from "~/auth/viewer.guard";
import {
  Following,
  FollowingConnection,
} from "~/followings/following.entities";
import { FollowingsService } from "~/followings/followings.service";
import { HenkenConnection } from "~/henkens/henken.entities";
import { HenkensService } from "~/henkens/henkens.service";
import { NotificationConnection } from "~/notifications/notification.entities";
import { NotificationsService } from "~/notifications/notifications.service";
import { User, UserConnection } from "~/users/user.entities";
import { UsersService } from "~/users/users.service";

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

  @ResolveField((type) => Following, {
    name: "followee",
    nullable: true,
  })
  resolveFollowee(
    @Parent() { id: fromId }: User,
    @Args("to", { type: () => ID }) toId: string,
  ): Observable<Following | null> {
    return this.followings.getFromPair(fromId, toId);
  }

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

  @ResolveField((type) => Following, {
    name: "follower",
    nullable: true,
  })
  resolveFollower(
    @Parent() { id: toId }: User,
    @Args("from", { type: () => ID }) fromId: string,
  ): Observable<Following | null> {
    return this.followings.getFromPair(fromId, toId);
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

  @Mutation(() => RegisterUserPayload, {
    name: "registerUser",
  })
  @UseGuards(AuthnGuard)
  createUser(
    @Viewer() { accountId }: ViewerType,
    @Args({ type: () => RegisterUserArgs }) { ...data }: RegisterUserArgs,
  ): Observable<RegisterUserPayload> {
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
      map((user) => ({ user })),
    );
  }
}
