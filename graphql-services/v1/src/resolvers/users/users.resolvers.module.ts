import { Module } from "@nestjs/common";

import { UserEdgesResolver } from "./user-edges.resolver";
import { UsersResolver } from "./users.resolver";

import { AccountsModule } from "~/services/account/accounts.module";
import { ActivitiesModule } from "~/services/activities/activities.module";
import { FollowingsModule } from "~/services/followings/followings.module";
import { HenkensModule } from "~/services/henkens/henkens.module";
import { NotificationsModule } from "~/services/notifications/notifications.module";
import { UsersModule } from "~/services/users/users.module";

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
