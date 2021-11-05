import { Module } from "@nestjs/common";

import { UserEdgesResolver } from "./user-edges.resolver";
import { UsersResolver } from "./users.resolver";

import { AccountsModule } from "~/services/account/accounts.module";
import { FollowingsModule } from "~/services/followings/followings.module";
import { HenkensModule } from "~/services/henkens/henkens.module";
import { UsersModule } from "~/services/users/users.module";

@Module({
  imports: [
    UsersModule,
    AccountsModule,
    HenkensModule,
    FollowingsModule,
  ],
  providers: [
    UsersResolver,
    UserEdgesResolver,
  ],
})
export class UsersResolversModule {}
