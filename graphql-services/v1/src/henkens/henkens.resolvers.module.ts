import { Module } from "@nestjs/common";

import { HenkensModule } from "./henkens.module";
import { HenkenEdgesResolver } from "./resolvers/henken-edges.resolver";
import { HenkensResolver } from "./resolvers/henkens.resolver";

import { AccountsModule } from "~/account/accounts.module";
import { AnswersModule } from "~/answers/answers.module";
import { AuthModule } from "~/auth/auth.module";
import { UsersModule } from "~/users/users.module";

@Module({
  imports: [
    HenkensModule,
    UsersModule,
    AnswersModule,
    AuthModule,
    AccountsModule,
  ],
  providers: [HenkensResolver, HenkenEdgesResolver],
})
export class HenkensResolversModule {}
