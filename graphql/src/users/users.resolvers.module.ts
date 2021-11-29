import { Module } from "@nestjs/common";

import { UserEdgesResolver } from "./resolvers/user-edges.resolver";
import { UsersResolver } from "./resolvers/users.resolver";
import { UsersModule } from "./users.module";

import { AccountsModule } from "~/account/accounts.module";
import { ActivitiesModule } from "~/activities/activities.module";
import { AuthModule } from "~/auth/auth.module";
import { FollowingsModule } from "~/followings/followings.module";
import { HenkensModule } from "~/henkens/henkens.module";
import { NotificationsModule } from "~/notifications/notifications.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AccountsModule,
    HenkensModule,
    FollowingsModule,
    NotificationsModule,
    ActivitiesModule,
  ],
  providers: [
    UsersResolver,
    UserEdgesResolver,
  ],
})
export class UsersResolversModule {}
