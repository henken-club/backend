import { Module } from "@nestjs/common";

import { HenkensModule } from "./henkens.module";
import { HenkenEdgesResolver } from "./resolvers/henken-edges.resolver";
import { HenkensResolver } from "./resolvers/henkens.resolver";

import { AuthModule } from "~/auth/auth.module";
import { UsersModule } from "~/users/users.module";
import { AnswersModule } from "~/answers/answers.module";
import { AccountsModule } from "~/account/accounts.module";

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
