import { Module } from "@nestjs/common";

import { UserEdgesResolver } from "./user-edges.resolver";
import { UsersResolver } from "./users.resolver";

import { AccountsModule } from "~/account/accounts.module";
import { ActivitiesModule } from "~/activities/activities.module";
import { FollowingsModule } from "~/followings/followings.module";
import { HenkensModule } from "~/henkens/henkens.module";
import { NotificationsModule } from "~/notifications/notifications.module";
import { UsersModule } from "~/users/users.module";

@Module({
  imports: [
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
