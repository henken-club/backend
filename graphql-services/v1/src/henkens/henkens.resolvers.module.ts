import { Module } from "@nestjs/common";

import { HenkenEdgesResolver } from "./resolvers/henken-edges.resolver";
import { HenkensResolver } from "./resolvers/henkens.resolver";

import { AccountsModule } from "~/account/accounts.module";
import { AnswersModule } from "~/answers/answers.module";
import { HenkensModule } from "~/henkens/henkens.module";
import { UsersModule } from "~/users/users.module";

@Module({
  imports: [HenkensModule, UsersModule, AnswersModule, AccountsModule],
  providers: [HenkensResolver, HenkenEdgesResolver],
})
export class HenkensResolversModule {}
