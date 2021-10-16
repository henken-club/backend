import { Module } from "@nestjs/common";

import { UsersModule } from "./users.module";
import { UserEdgesResolver, UsersResolver } from "./users.resolver";

import { AccountsModule } from "~/account/accounts.module";
import { AnswersModule } from "~/answers/answers.module";
import { FollowingsModule } from "~/followings/followings.module";
import { HenkensModule } from "~/henkens/henkens.module";

@Module({
  imports: [
    UsersModule,
    HenkensModule,
    AnswersModule,
    FollowingsModule,
    AccountsModule,
  ],
  providers: [UsersResolver, UserEdgesResolver],
})
export class UsersResolverModule {}
